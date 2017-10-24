import {Slim} from "slim-js"
import {tag, template} from "slim-js/Decorators"

@tag('side-menu-item')
@template(`
<li #rootitem has-children="[[hasChildren(item)]]" click="handleItemClick" class="mdl-list__item" click="handleSelect" bind>[[item.label]]</li>
<div padded slim-if="item.children">
    <side-menu-item on-selected="handleSelected" slim-repeat="item.children" slim-repeat-as="item"></side-menu-item>
</div>
<style>
    side-menu-item[selected] > li {
        font-weight: bold;
    }
    
    side-menu-item > li[has-children="true"] {
        padding-bottom: 0;
    }
    
    side-menu-item > div[padded] {
        padding-left: 1em;
    }
    
    side-menu-item > div[padded] li {
        font-size: 100%;
        padding-top: 0;
        padding-bottom: 0;
    }
    
    side-menu-item > div[padded] li::before {
        content: '';
    }
</style>
`)
class _ extends Slim {

  item = null

  subMenu = null

  _checkRoute = null

  onBeforeCreated() {
    this._checkRoute = this.checkRoute.bind(this)
    window.addEventListener('hashchange', this._checkRoute)
  }

  onAdded() {
    this.checkRoute()
  }

  hasChildren(item) {
    return item && item.children ? 'true' : 'false'
  }

  onUpdate() {
    this.subMenu = this.item.children
  }

  checkRoute() {
    try {
      const hash = window.location.hash.split('#/')[1]
      if (hash === this.item.target) {
        this.triggerSelected()
        this.setAttribute('selected','')
      } else {
        this.removeAttribute('selected')
      }
    } catch (err) { /* ignore error */ }
  }

  onItemChanged() {
    this.subMenu = this.item.children || [];
  }

  propagateSelected(item) {
    this.callAttribute('on-selected', item)
  }

  handleSelected(item) {
    this.propagateSelected(item)
  }

  triggerSelected() {
    this.propagateSelected(this.item)
    // this.dispatchEvent(new CustomEvent('menu-item-selected', {detail: this.item, bubbles: true}))
  }

  handleItemClick() {
      this.triggerSelected()
  }

  onRemoved() {
    window.removeEventListener('hashchange', this._checkRoute)
  }
}