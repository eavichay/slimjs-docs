import {Slim} from 'slim-js'
import {template, tag} from 'slim-js/Decorators'

// noinspection JSUnusedGlobalSymbols
@tag('side-menu')
@template(`
<ul class="mdl-list">
  <li class="mdl-list__item" slim-repeat="items" slim-repeat-as="item" click="handleSelect" bind>[[item.label]]</li>
</ul>
<style>
    side-menu li[selected] {
        font-weight: bold;
    }
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

  selectItem(item) {
    this.findAll('li').forEach(e => {
      if (e.item === item) {
        const fakeEvent = new Event('click')
        e.dispatchEvent(fakeEvent)
      }
    })
  }

  handleSelect (e) {
    this.findAll('li').forEach(li => {
      if (e.target === li) {
        li.setAttribute('selected', '')
      } else {
        li.removeAttribute('selected')
      }
    })
    this.callAttribute('on-item-select', e.target.item)
  }
}
