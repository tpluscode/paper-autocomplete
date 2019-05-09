import { html, render } from 'lit-html'
import '../paper-autocomplete.js'

const title = 'test'
render(
  html`
    <paper-autocomplete .header=${title}>
      <span slot="suffix">Hello</span>
    </paper-autocomplete>
  `,
  document.querySelector('#demo'),
)
