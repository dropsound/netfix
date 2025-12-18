import './style.scss'
import { setupCounter } from './assets/js/counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    
    <div class="card">
      <button id="counter" type="button"></button>
    </div>

    <a href="https://www.popwebdesign.net/" target="_blank">popart</a>
    </br>
    <a href="https://www.pinterest.com/netfixstudio/" target="_blank">netfixstudio - Pinterest</a>

  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
