import {Slim} from 'slim-js'
import {template, tag} from 'slim-js/Decorators'

import './side-menu-item';

// noinspection JSUnusedGlobalSymbols
@tag('side-menu')
@template(`
<ul class="mdl-list">
  <side-menu-item on-selected="selectItem" slim-repeat="items" slim-repeat-as="item"></side-menu-item>
</ul>
<style>
    side-menu {
        display: inline-flex;
        max-width: 20em;
        min-width: 12em;
        width: 30%;
    }
</style>
`)
export default class _ extends Slim {

  items = []

  selectedItem = null

  onBeforeCreated() {
    this.addEventListener('menu-item-selected', e => this.selectItem(e.detail))
  }

  selectItem(selection) {
    this.callAttribute('on-item-select', selection)
  }
}
