// import {Slim} from 'slim-js'
import {tag, template} from 'slim-js/Decorators'

import './index.scss'
import './components/header'
import './components/side-menu'
import './components/simple-router'

if (window.navigator.userAgent.toLowerCase().includes('firefox')) {
  HTMLElement.prototype.createShadowRoot = function() {
    return this;
  }
  Slim.prototype.onRender = function() {
    // shadyCSS.styleElement(this);
  }
}
// IE11?
// require('babel-polyfill');

@tag('slim-docs')
@template(`
<div vbox id="main_container">
    <slim-docs-header></slim-docs-header>
    <div class="hbox">
      <side-menu vbox docs-text-styling
        on-item-select="handleItemSelected"
        bind:items="menuItems"></side-menu>
      <doc-router vbox bind:default-route="getDefaultRoute(menuItems)"></doc-router>
    </div>
</div>
<a id="githubButton" href="javascript:track('github', 'https://github.com/slimjs/slim.js')">
    <span>View on github</span>
    <span>
        <span style="width: 255.952px; height: 255.952px; transform: translate(-50%, -50%) translate(72px, 27px);">
        </span>
    </span>
</a>
<style>
    slim-docs {
      display: flex;
      flex-direction: column;
      width: 100%;
      overflow-y: auto;
    }
    .hbox {
      display: flex;
      flex-direction: row;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }

    slim-docs #main_container {
      height: 100%;
    }

    slim-docs #githubButton {
      transition: all 0.2s ease-in-out;
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      transform: scale(1,1);
      z-index: 900;
      display: block;
      background-color: rgba(255,110,64,0.9);
      box-shadow: 0 3px 4px 0 rgba(0,0,0,.14), 0 3px 3px -2px rgba(0,0,0,.2), 0 1px 8px 0 rgba(0,0,0,.12);
      text-decoration: none;
      color: white;
      padding: 0.5rem;
      font-size: 120%;
    }

    slim-docs #githubButton:hover {
      background-color: rgba(255,110,64,1);
      transform: scale(1.2, 1.2);
      bottom: 1.5rem;
      right: 1.5rem;
</style>
`)
class SlimjsDocs extends Slim {

  onBeforeCreated() {
      this.menuItems = [
        { label: 'Getting started', target: 'getting-started' },
        { label: 'Creating an element', target: 'creating-an-element', children: [
          { label: 'Lifecycle', target: 'component-lifecycle' },
          { label: 'Accessing children', target: 'accessing-children'},
          { label: 'Conditional rendering', target: 'conditional-rendering'},
          { label: 'Shadow-DOM', target: 'shadow-dom'}
        ] },
        { label: 'Data binding', target: 'data-binding' },
        { label: 'Repeating elements', target: 'repeaters'},
        { label: 'Plugins', target: 'plugins'},
        { label: 'Extending Slim & Directives', target: 'extending-slim'}
      ]
  }

  getDefaultRoute() {
    return this.menuItems[0].target
  }

  handleItemSelected(item) {
    window.location.hash = `/${item.target}`
  }

  onCreated() {
    Slim.asap(() => {
      if (window.location.hash === '') {
        window.location.hash = '#/getting-started'
      }
    })
  }
}
