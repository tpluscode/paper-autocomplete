import { html, css, LitElement } from 'lit-element'

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
        cursor: pointer;
      }

      #search {
        flex: 1 65%;
      }
    `
  }

  static get properties() {
    return {
      showResults: { type: Boolean },
      value: { type: String, notify: true },
      label: { type: String },
      description: { type: String },
      searchTemplate: { type: String },
    }
  }

  constructor() {
    super()
    this.showResults = false
    this.disableSearch = false
    this.mapItemValue = item => item.value
    this.mapItemLabel = item => item.label
  }

  render() {
    const getItemElement = item =>
      html`
        <paper-item @click="${this.select}">${item.label}</paper-item>
      `

    return html`
      <paper-input
        id="search"
        .label="${this.label}"
        placeholder="${this.description}"
        @value-changed="${this.fetchResults}"
      ></paper-input>

      <paper-listbox ?hidden="${!this.showResults}">
        ${this.results.map(getItemElement)}
      </paper-listbox>
    `
  }

  select(e) {
    this.value = this.mapItemValue(e.model.item)
    this.disableSearch = true
    this.$.search.value = this.mapItemLabel(e.model.item)
    this.closeResults()
    this.disableSearch = false
  }

  closeResults() {
    this.showResults = false
  }
}
