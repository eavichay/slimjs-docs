import {Slim} from "slim-js"
import {tag, template} from "slim-js/Decorators"
import showdown from "showdown"
import highlighter from "showdown-highlight"
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'

const markdownBank = {}

@tag('doc-router')
@template(`
<div slim-if="isRouteValid" #doc></div>
<div slim-if="!isRouteValid" route="[[currentRoute]]">
    <div>:( This page does not exists. Try another topic from the menu</div>
</div>
<style>
  doc-router {
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
</style>
`)
export default class _ extends Slim {

  routes = []
  currentRoute = ''
  _handleRouteChanged = null
  doc = null

  isRouteValid = true

  currentRouteChanged() {
    this.isRouteValid = this.routes.some( route => route.target === '#!' + this.currentRoute )
    if (this.isRouteValid) {
      const markdownURL = `/docs/${this.currentRoute}.md`
      if (markdownBank[markdownURL]) {
        this.generateMarkdown(markdownBank[markdownURL])
      } else {
        fetch(markdownURL)
          .then( r => {
            if (r.ok) {
              return r.text()
            } else throw new Error("Error loading markdown file")
          })
          .then(markdown => {
            markdownBank[markdownURL] = markdown
            this.generateMarkdown(markdown)
          })
          .catch(() => {
            this.doc.innerHTML = ''
            this.isRouteValid = false
          })
      }
    }
  }

  generateMarkdown(content) {
    const converter = new showdown.Converter({extensions: [highlighter]})
    this.doc.innerHTML = converter.makeHtml(content)
    this.findAll('pre').forEach(e => {
      hljs.highlightBlock(e)
    })
    // hljs.highlightBlock(this.doc)
  }

  constructor() {
    super()
    this._handleRouteChanged = this.handleRouteChanged.bind(this)
    window.addEventListener('hashchange', this._handleRouteChanged)
    this.currentRoute = window.location.hash.split('#!')[1]
  }

  onRemoved() {
    window.removeEventListener('hashchange', this._handleRouteChanged)
  }

  handleRouteChanged(e) {
    this.currentRoute = window.location.hash.split('#!')[1]
  }
}