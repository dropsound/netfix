import './style.scss'
import { setupCounter } from './assets/js/counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    
    <div class="card">
      <button id="counter" type="button"></button>
    </div>

 
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
