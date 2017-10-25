import {Slim} from "slim-js"
import {tag, template} from "slim-js/Decorators"

@tag('side-menu-item')
@template(`
<li #rootitem has-children="[[hasChildren(item)]]" click="handleItemClick" class="mdl-list__item" click="handleSelect" bind>[[item.label]]</li>
<div slim-if="item.children">
    <side-menu-item padded on-selected="handleSelected" slim-repeat="item.children" slim-repeat-as="item"></side-menu-item>
</div>
<style>
    side-menu-item {
        display: block;
    }
    side-menu-item[selected] > li {
        background-color: rgb(255,110,64);
        box-shadow: 0 3px 4px 0 rgba(0,0,0,.14), 0 3px 3px -2px rgba(0,0,0,.2), 0 1px 8px 0 rgba(0,0,0,.12);
    }
    
    side-menu-item[padded] > li{
        padding-left: 1em;
        text-indent: 1em;
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