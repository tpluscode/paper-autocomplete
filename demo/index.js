import { html, render } from 'lit-html';
import '../paper-autocomplete.js';

const title = 'test';
render(
  html`
    <paper-autocomplete .header=${title}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book.
    </paper-autocomplete>
  `,
  document.querySelector('#demo'),
);
