import {Slim} from 'slim-js'
import {tag, template} from 'slim-js/Decorators'
import Logo from '../assets/slim3.png'
import GithubIcon from '../assets/github-icon.png'

@tag('slim-docs-header')
@template(`
<nav class="mdl-layout__header-row">
    <span class="mdl-layout-title">
        <a href="/" class=""><img src="${Logo}" width="41" height="51"/></a>
        <span>Slim.js Documentation</span>
    </span>
    <span class="mdl-layout-spacer"></span>
      
    <nav class="mdl-navigation">
        <span class="mdl-navigation__link"><a href="https://github.com/eavichay/slim.js/issues">Submit an issue</a></span>
        <span class="mdl-navigation__link"><a href="https://github.com/eavichay/slimjs-docs/issues">Submit a documentation issue</a></span>
    </nav>
</nav>
<style>
    slim-docs-header {
        display: block !important;
    }
</style>
`)
export default class _ extends Slim {}
