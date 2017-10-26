import {Slim} from 'slim-js'
import {tag, template} from 'slim-js/Decorators'
import './vendor/material'
import './index.scss'
import './components/header'
import './components/side-menu'
import './components/simple-router'
// IE11?
// require('babel-polyfill');

@tag('slim-docs')
@template(`
<div vbox id="main_container">
    <slim-docs-header class="mdl-layout__header mdl-layout--fixed-header"></slim-docs-header>
    <div id="docs_container" hbox>
      <side-menu vbox class="mdl-components__nav docs-text-styling mdl-shadow--4dp" on-item-select="handleItemSelected" items="[[menuItems]]"></side-menu>
      <doc-router vbox default-route="[[menuItems.0.target]]"></doc-router>
    </div>
</div>
<a href="https://github.com/eavichay/slim.js" target="_blank" id="view-source"
    class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--accent mdl-color-text--accent-contrast">
    <i class="material-icons md-24">link</i> <span>View on github</span>
    <span class="mdl-button__ripple-container">
        <span class="mdl-ripple is-animating" style="width: 255.952px; height: 255.952px; transform: translate(-50%, -50%) translate(72px, 27px);">
        </span>
    </span>
</a>
<style>
    slim-docs #docs_container {
        height: 100%
    }
    
    #view-source {
      position: fixed;
      display: block;
      right: 0;
      bottom: 0;
      margin-right: 40px;
      margin-bottom: 40px;
      z-index: 900;
    }
</style>
`)
class _ extends Slim {

  menuItems = [
    { label: 'Getting started', target: 'getting-started' },
    { label: 'Creating an element', target: 'creating-an-element', children: [
      { label: 'Lifecycle', target: 'component-lifecycle' },
      { label: 'Accessing children', target: 'accessing-children'},
      { label: 'Conditional rendering', target: 'conditional-rendering'},
      { label: 'Shadow-DOM', target: 'shadow-dom'}
    ] },
    { label: 'Data binding', target: 'data-binding' },
    { label: 'Repeating elements', target: 'repeaters'},
  ]

  constructor() {
    super()
    this.style.visibility = 'hidden';
    this.classList.add('mdl-layout__container')
    this.classList.add('has-scrolling-header')
  }

  handleItemSelected(item) {
    window.location.hash = `/${item.target}`
  }

  onAfterUpdate() {
    // this.find('side-menu').selectItem(this.menuItems[0])
    Slim.__invokeAsap(() => {
      if (window.location.hash === '') {
        window.location.hash = '#/getting-started'
      }
      this.style.visibility = null
    })
  }
}

const Root = new _()
document.body.appendChild(Root)
