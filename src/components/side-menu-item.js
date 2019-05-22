// import {Slim} from "slim-js"
import {tag, template} from "slim-js/Decorators"

@tag('side-menu-item')
@template(`
<li bind:with-children="hasChildren(item)" click="handleItemClick" click="handleSelect">{{item.label}}</li>
<div s:if="item.children">
    <side-menu-item padded on-selected="handleSelected" s:repeat="item.children as item"></side-menu-item>
</div>
<style>
    side-menu-item {
        transition: all;
        display: inline-flex;
        width: 100%;
        flex-direction: column;
    }

    side-menu-item:hover {
      cursor: pointer;
    }

    side-menu-item li {
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      padding: 0.5rem;
      padding-left: 1.5rem;
    }

    side-menu-item[selected] > li {
      background-color: rgb(255,110,64);
      padding-left: 1.8rem;
      box-shadow: 0 3px 4px 0 rgba(0,0,0,.14), 0 3px 3px -2px rgba(0,0,0,.2), 0 1px 8px 0 rgba(0,0,0,.12);
    }
    
    side-menu-item[padded] > li {
        padding-left: 3rem;
    }

    side-menu-item[padded][selected] > li {
      padding-left: 3.2rem;
    }
    
</style>
`)
class SideMenuItem extends Slim {

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

  onCreated() {
    this.subMenu = this.item && this.item.children
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
    this.subMenu = this.item && this.item.children || [];
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
