import {Slim} from "slim-js"
import {tag, template} from "slim-js/Decorators"
import showdown from "showdown"

@tag('doc-router')
@template(`
<div slim-if="isRouteValid" bind>[[currentRoute]]</div>
<div slim-if="!isRouteValid">
    <div>:( This page does not exists. Try another topic from the menu</div>
</div>
`)
export default class _ extends Slim {

  routes = []
  currentRoute = ''
  _handleRouteChanged = null
  markup = ''

  isRouteValid = true

  currentRouteChanged() {
    this.isRouteValid = this.routes.some( route => route.target === '#!' + this.currentRoute )
    if (this.isRouteValid) {
      fetch(`/docs/${this.currentRoute}.md`)
        .then(r => r.text())
        .then(markup => this.markup = markup)
        .catch(() => { console.log('Could not load markup') })
    }
  }

  constructor() {
    super()
    this._handleRouteChanged = this.handleRouteChanged.bind(this)
    window.addEventListener('hashchange', this._handleRouteChanged)
    this.currentRoute = window.location.hash.split('#!')[1]
  }

  onRemoved() {
    window.removeEventListener('hashchange', this._handleRouteChanged)
  }

  handleRouteChanged(e) {
    this.currentRoute = window.location.hash.split('#!')[1]
  }
}