import '@polymer/paper-input/paper-input'
import '@polymer/paper-item/paper-item'
import '@polymer/paper-listbox/paper-listbox'
import '@polymer/iron-a11y-keys/iron-a11y-keys'
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
      value: { type: String },
      label: { type: String },
      description: { type: String },
      searchTemplate: { type: String },
    }
  }

  constructor() {
    super()
    this.label = 'Search'
    this.description = 'Start typing'
    this.showResults = false
    this.disableSearch = false
    this.mapItemValue = item => item.value
    this.mapItemLabel = item => item.label
    this.fetchResults = text => [{ value: text, label: text }]
    this.__fetchDebouncer = null
  }

  render() {
    const getItemElement = item =>
      html`
        <paper-item @click="${this.__select(item)}">${item.suggestion || item.label}</paper-item>
      `
    return html`
      <iron-a11y-keys
        id="a11y"
        keys="enter"
        @keys-pressed="${this.__selectCurrent}"
      ></iron-a11y-keys>
      <paper-input
        id="search"
        .label="${this.label}"
        placeholder="${this.description}"
        @value-changed="${this.__startSearch}"
      >
        <slot name="prefix" slot="prefix"></slot>
        <slot name="suffix" slot="suffix"></slot>
      </paper-input>

      <paper-listbox ?hidden="${!this.showResults}">
        ${this.showResults ? this.results.map(getItemElement) : ''}
      </paper-listbox>
    `
  }

  firstUpdated() {
    this.searchInput = this.renderRoot.querySelector('#search')
    const a11yKeys = this.renderRoot.querySelector('#a11y')

    a11yKeys.target = this.searchInput

    this.addEventListener('blur', () => {
      this.showResults = false
    })
    this.searchInput.addEventListener('focus', () => {
      if (this.results) {
        this.showResults = true
      }
    })
  }

  async __startSearch(e) {
    if (e.detail.value.length < 3 || this.disableSearch) return
    if (e.detail.value.match(/ $/)) {
      this.results = await this.fetchResults(e.detail.value)

      this.showResults = true
      await this.performUpdate()
    }
  }

  __select(item) {
    return () => {
      this.value = this.mapItemValue(item)
      this.setValue(this.mapItemLabel(item))
      this.closeResults()

      this.dispatchEvent(
        new CustomEvent('value-changed', {
          detail: {
            value: this.value,
          },
        }),
      )
    }
  }

  __selectCurrent(e) {
    this.closeResults()
    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: {
          value: this.searchInput.value.trim(),
        },
      }),
    )
  }

  setValue(value) {
    this.disableSearch = true
    this.searchInput.value = value
    this.disableSearch = false
  }

  closeResults() {
    this.showResults = false
  }
}
