import { Slim } from 'slim-js';
import { tag, template } from 'slim-js/decorators';
import 'slim-js/directives';
import TEMPLATE from './app.template.hbs';

@tag('slim-docs')
@template(TEMPLATE)
class App extends Slim {
  menuItems = [
    { label: 'Welcome', target: 'welcome' },
    { label: 'Getting started', target: 'getting-started' },
    {
      label: 'Creating an element',
      target: 'creating-an-element',
      children: [
        { label: 'Lifecycle', target: 'component-lifecycle' },
        { label: 'Accessing children', target: 'accessing-children' },
        { label: 'Conditional rendering', target: 'conditional-rendering' },
        { label: 'Shadow-DOM', target: 'shadow-dom' },
      ],
    },
    { label: 'Data binding', target: 'data-binding' },
    { label: 'Repeating elements', target: 'repeaters' },
    { label: 'Plugins', target: 'plugins' },
    { label: 'Extending Slim & Directives', target: 'extending-slim' },
  ];

  constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
  }

  onCreated() {
    if (window.location.hash === '') {
      window.location.hash = '#/welcome';
    }
    this.viewbox.addEventListener('scroll', this.handleScroll);
  }

  disconnectedCallback() {
    this.viewbox.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.viewbox.scrollTop > 50) {
      this.header.classList.add('small');
    } else {
      this.header.classList.remove('small');
    }
  }
}
