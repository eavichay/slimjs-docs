// import {Slim} from "slim-js"
import {tag, template} from "slim-js/Decorators"
import hljs from 'highlight.js/lib/highlight.js'
import atomCSS from '../assets/atom-css'

const {marked} = window;

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('html', require('highlight.js/lib/languages/htmlbars'))

const markdownBank = {}

@tag('doc-router')
@template(`
<div s:if="isRouteInvalid">
  <h1>Oops, this page does not exists</h1>
  <p>Try looking for something from the menu</p>
</div>
<div s:id="doc" s:if="isRouteValid"></div>
<style> 
  doc-router {
    padding-left: 2em;
    padding-right: 2em;
    padding-bottom: 10em;
    width: 100%;
    overflow-x: auto;    
  }

  doc-router pre {
    padding-left: 1em;
    background-color: #333333;
    color: lightblue;
    padding-bottom: 2rem;
    padding-top: 1rem;
    border-radius: 0.3rem;
  }

  doc-router h6 {
    font-size: 1rem;
    font-style: italic;
  }

  doc-router a, doc-router a:visited {
    text-decoration: none;
    color: #444444;
    background-color: #dddddd;
    border-radius: 0.2rem;
    padding: 0 0.5rem 0 0.5rem;
    font-style: italic;
  }

  doc-router a:hover {
    text-decoration: underline;
  }
  
  doc-router div blockquote:before {
    content: "info";
    font-family: "Material Icons";
    text-rendering: optimizeLegibility;
    font-feature-settings: 'liga' 1;
    font-style: normal;
    line-height: 1;
    font-size: 1em;
    display: inline-block;
    overflow: hidden;
    position: absolute;
    left: -1em;
    color: orange;
  }
  
  doc-router div blockquote:after {
    content: "";
  }

  ${atomCSS}
</style>
`)
export default class DocsRouter extends Slim {

  constructor () {
    super()
    this.isRouteValid = true
    this.isRouteInvalid = false
    this._handleRouteChanged = this.handleRouteChanged.bind(this)
    this.currentRoute = window.location.hash.split('#/')[1]
  }

  onRender() {
    window.addEventListener('hashchange', this._handleRouteChanged)
    this.handleRouteChanged()
  }

  currentRouteChanged() {
    if (this.currentRoute === undefined) {
      return this.currentRoute = this.defaultRoute
    }
    window.track && window.track(this.currentRoute)
    const markdownURL = `/docs/${this.currentRoute}.md`
    if (markdownBank[markdownURL]) {
      this.generateMarkdown(markdownBank[markdownURL])
    } else {
      this.isLoading = true
      fetch(markdownURL)
        .then( r => {
          if (r.ok) {
            return r.text()
          } else throw new Error("Error loading markdown file")
        })
        .then(markdown => {
          markdownBank[markdownURL] = markdown
          this.generateMarkdown(markdown)
          this.isLoading = false
        })
        .catch(() => {
          this.doc.innerHTML = ''
          this.isRouteValid = false
          this.isRouteInvalid = true
          this.isLoading = false
        })
    }
  }

  generateMarkdown(content) {
    const converter = marked(content) // new showdown.Converter()
    this.doc.innerHTML = converter; //converter.makeHtml(content)
    this.findAll('pre').forEach(e => {
      hljs.highlightBlock(e)
    })
    this.isRouteValid = true
    this.isRouteInvalid = false
    Slim.asap(() => {
      this.scrollTop = 0
    })
  }

  onRemoved() {
    window.removeEventListener('hashchange', this._handleRouteChanged)
  }

  handleRouteChanged() {
    this.currentRoute = window.location.hash.split('#/')[1]
    this.currentRouteChanged()
  }
}