// import {Slim} from 'slim-js'
import {tag, template} from 'slim-js/Decorators'
import Logo from '../assets/slim3.png'
// import GithubIcon from '../assets/github-icon.png'

@tag('slim-docs-header')
@template(/*html*/`

<span id="logo">
    <a href="/" class=""><img src="${Logo}" width="41" height="51"/></a>
    <span>Slim.js Documentation</span>
</span>

<nav>
    <span><a href="javascript:track('issue', 'https://github.com/eavichay/slim.js/issues')">Submit an issue</a></span>
    <span><a href="javascript:track('doc-issue', 'https://github.com/eavichay/slimjs-docs/issues')">Submit a documentation issue</a></span>
</nav>
<style>
slim-docs-header {
  display: flex;
  justify-content: center;
  height: 4.5rem;
  background-color: #333333;
  justify-content: space-between;
  align-items: center;
}

slim-docs-header #logo {
    display: inline-flex;
    justify-content: flex-start;
    flex-grow: 3;
    align-items: center;
    color: white;
    padding-left: 2rem;
}

slim-docs-header nav {
    display: inline-flex;
    flex-grow: 2;
    color: white;
    justify-content: space-around;
}

slim-docs-header a, slim-docs-header a:visited {
    color: white;
    text-decoration: none;
}

slim-docs-header a:hover {
    text-decoration: underline;
}

slim-docs-header #logo img {
    margin-right: 1rem;
}

slim-docs-header > :not(style) {
    display: inline-flex;
}
</style>
`)
class SlimDocsHeader extends Slim {}
