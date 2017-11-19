import {Slim} from "slim-js"
import {tag, template} from "slim-js/Decorators"
import showdown from "showdown"
import highlighter from "showdown-highlight"
import hljs from 'highlight.js/lib/highlight.js'
import 'highlight.js/styles/atom-one-light.css'

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
hljs.registerLanguage('html', require('highlight.js/lib/languages/htmlbars'))

const markdownBank = {}

@tag('doc-router')
@template(`
<div s:if="isRouteValid" s:id="doc"></div>
<div s:if="isLoading">
    <div class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
</div>
<div class="static-noise-effect" s:if="isRouteInvalid">
    <div class="sad-404">:(</div>
    <div>This entry does not exists. Try another topic (use the menu)</div>
</div>
<style>
  doc-router {
    padding-left: 2em;
    padding-right: 2em;
    padding-bottom: 10em;
    width: 100%;
    overflow-x: auto;    
  }
  doc-router pre {
    border-left: 1px dotted grey;
    padding-left: 1em;
  }
  
  doc-router div.hljs {
    height: 100%;
  }
  
  doc-router > div blockquote:before {
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
  
  doc-router > div blockquote:after {
    content: "";
  }
</style>
`)
export default class DocsRouter extends Slim {

  onBeforeCreated() {
    this.isRouteValid = true
    this.isRouteInvalid = false

  }

  onCreated() {
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
    const converter = new showdown.Converter({extensions: [highlighter]})
    this.doc.innerHTML = converter.makeHtml(content)
    this.findAll('pre').forEach(e => {
      hljs.highlightBlock(e)
    })
    this.isRouteValid = true
    this.isRouteInvalid = false
    Slim.asap(() => {
      this.scrollTop = 0
    })
  }

  constructor() {
    super()
    this._handleRouteChanged = this.handleRouteChanged.bind(this)
    window.addEventListener('hashchange', this._handleRouteChanged)
    this.currentRoute = window.location.hash.split('#/')[1]
  }

  onRemoved() {
    window.removeEventListener('hashchange', this._handleRouteChanged)
  }

  handleRouteChanged() {
    this.currentRoute = window.location.hash.split('#/')[1]
    this.currentRouteChanged()
  }
}