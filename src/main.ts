import './style.scss';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------
   * Reduced motion
   * ----------------------------- */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set("section *", { opacity: 1, clearProps: "all" });
    return;
  }

  /* -------------------------------
   * Lenis smooth scroll
   * ----------------------------- */
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      return arguments.length ? lenis.scrollTo(value!) : window.scrollY;
    }
  });
  lenis.on("scroll", ScrollTrigger.update);

  /* -------------------------------
   * HERO LETTER SPLIT
   * ----------------------------- */
  document.querySelectorAll(".hero-word").forEach(el => {
    const text = el.textContent || "";
    el.innerHTML = "";
    [...text].forEach(char => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      el.appendChild(span);
    });
  });

  /* -------------------------------
   * HERO ANIMATION
   * ----------------------------- */
  const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTimeline.from(".pre-line", { y: 40, opacity: 0, duration: 0.6, stagger: 0.12 });
  heroTimeline.from(".hero-word span", { y: 100, opacity: 0, duration: 0.8, stagger: 0.02 }, "-=0.3");
  heroTimeline.from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4");
  heroTimeline.from(".hero-text", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3");
  heroTimeline.from(".hero-cta", { y: 20, opacity: 0, scale: 0.95, duration: 0.5 }, "-=0.2");

  /* -------------------------------
   * CTA hover effect
   * ----------------------------- */
  const cta = document.querySelector<HTMLAnchorElement>(".hero-cta");
  if (cta) {
    cta.addEventListener("mouseenter", () => gsap.to(cta, { scale: 1.06, duration: 0.25 }));
    cta.addEventListener("mouseleave", () => gsap.to(cta, { scale: 1, duration: 0.25 }));
  }

  /* -------------------------------
   * OTHER SECTIONS ANIMATION
   * ----------------------------- */
  document.querySelectorAll("section").forEach(section => {
    if (section.id === "hero") return;

    // Intro section animation (headings + image)
    if (section.id === "intro") {
      const headings = section.querySelectorAll<HTMLElement>(".pre-header h2");
      const image = section.querySelector<HTMLElement>(".isometric img");

      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      });

      headings.forEach((h2, i) => {
        const direction = i % 2 === 0 ? -100 : 100;
        introTimeline.fromTo(
          h2,
          { x: direction, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          i * 0.1
        );
      });

      if (image) {
        introTimeline.fromTo(
          image,
          { x: -30, y: 40, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          headings.length * 0.1 + 0.2
        );
      }
    } else {
      // All other sections
      const targets = section.querySelectorAll(
        "h2, p, .service-card, .project-card, .testimonial, .btn, input"
      );
      if (targets.length === 0) return;

      gsap.from(targets, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }
  });

});
