import {Slim} from "slim-js"
import {tag, template} from "slim-js/Decorators"

@tag('side-menu-item')
@template(`
<li #rootitem has-children="[[hasChildren(item)]]" click="handleItemClick" class="mdl-list__item" click="handleSelect" bind>[[item.label]]</li>
<div padded slim-if="item.children">
    <side-menu-item slim-repeat="item.children" slim-repeat-as="item"></side-menu-item>
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

  get isInteractive() { return true }

  hasChildren(item) {
    return item && item.children ? 'true' : 'false'
  }

  onUpdate() {
    this.subMenu = this.item.children;
  }

  onItemChanged() {
    this.subMenu = this.item.children || [];
  }

  handleItemClick(e) {
    if (e.target === this.rootitem) {
      this.dispatchEvent(new CustomEvent('menu-item-selected', {detail: e.target.item, bubbles: true}))
    }
  }
}