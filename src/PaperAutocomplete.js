import { html, css, LitElement } from 'lit-element';

export default class PaperAutocomplete extends LitElement {
  static get styles() {
    return css`
    :host {
      display: flex;
      flex-flow: wrap;
      position: relative;
    }

    [hidden] {
      display: none;
    }

    paper-listbox {
      max-height: 250px;
      overflow: scroll;
      width: 90%;
      position: absolute;
      background-color: white;
      opacity: 1;
      z-index: 1;
      top: 55px;
      left: 0;
      box-shadow: 3px 3px 3px grey;
    }
    
    paper-listbox paper-item {
      cursor: pointer
    }

    #search {
      flex: 1 65%
    }
    `;
  }

  static get properties() {
    return {
      showResults: {type: Boolean},
      value: { type: String, notify: true },
      label: {type:String},
      description: {type:String},
      searchTemplate: {type:String},
    }
  }

  constructor() {
    super();
    this.heading = 'Hello world!';
  }

  render() {
    return html`
      <h2>${this.heading}</h2>
      <div>
        <slot></slot>
      </div>
    `;
  }
}
