# Shadow DOM
Slim element can be defined using [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM) for it's internal view.
Shadow DOM sandboxes style and element identifiers ("id" attribute) in-order to achieve styling that does not take effect outside the DOM. By default, the shadow dom (if used) is in open mode.
Slim elements by default do not use shadow DOM unless explicitly required.

### Usage

###### es6
```javascript
class MyTag extends Slim {
  get useShadow() { return true }
}

Slim.tag('my-tag', MyTag)
```

###### es7 / next
```javascript
import {Slim} from 'slim-js'
import {tag, useShadow} from 'slim-js/Decorators'

@tag('my-tag')
@useShadow(true)
class MyTag extends Slim {}
```

### Event handling with shadow-dom (re-targeting)
Shadow-DOM encapsulation prevents some of the events bubbling.
Other events are being re-targeted while bubbling up the tree, as listeners receive the Event.target as the host element.
For example
```html
<parent-element>
    #shadow-root
    <child-element>
        #shadow-root
        <div></div>
</child-element>
</parent-element>
```
A listener created by **child-element** on the **div** would receive the **div** as the event's target.
A listener created by **parent-element** on the **child-element** would receive the **child-element** as the event's target

By default, custom events do not bubble through shadow-dom. In order to trigger a shadow-dom piercing custom event, use the following method:
```javascript
var event = new CustomEvent('event-name', {bubbles: true, composed: true})
```

### Styling inside a shadow-dom
Inside a shadow-root, styles are scoped by the browser and do not affect entities outside the shadow-dom, or inside nested shadow-doms.
HTMLElement.querySelector also is prevented from searching selectors inside a nested shadow-dom.
More information about styling shadow DOM can be found [here](https://developers.google.com/web/fundamentals/web-components/shadowdom#styling)

Custom CSS properties ARE inherited by shadow-roots and can be used for theming components.
To enable users customize or theme a component, a component's developer can expose specific style properties using custom CSS properties.
In addition, a component can use CSS mixins (in selected browsers)

#### Example
###### Outside the component
```css
html {
    --my-color: red;
    --my-mixin: {
        color: blue;
        font-weight: bold;
    }
}
```
###### Inside the custom element
```css
:host {
    background-color: var(--my-color, white);
    // defaults to white
    @apply --my-mixin;
}
```
