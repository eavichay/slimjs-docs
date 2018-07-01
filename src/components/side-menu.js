// import {Slim} from 'slim-js'
import {template, tag} from 'slim-js/Decorators'

import './side-menu-item';

// noinspection JSUnusedGlobalSymbols
@tag('side-menu')
@template(`
<ul>
  <side-menu-item on-selected="selectItem" s:repeat="items as item"></side-menu-item>
</ul>
<style>
    side-menu {
      display: inline-flex;
      width: 20rem;
      border-right: 1px solid #888888;
    }

    @media (min-width: 850px) {
      side-menu {
        width: 24rem;
      }
    }

    side-menu ul {
      list-style: none;
      padding: 0;
    }
</style>
`)
export default class SideMenu extends Slim {

  constructor () {
    super()
    this.selectedItem = null
    this.addEventListener('menu-item-selected', e => this.selectItem(e.detail))
  }

  selectItem(selection) {
    this.callAttribute('on-item-select', selection)
  }
}
