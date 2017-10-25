# Lifecycle

A Slim HTMLElement has a rich lifecycle so a developer can insert code hooks on many points in the component's life.

### Initial lifecycle
- [createdCallback]
- onBeforeCreated
- [internal initialization and setup]
- onCreated
- onBeforeRender
- [internal :render()]
- onAfterRender

### DOM lifecycle
additionally a component have the following
- onAdded (inserted into the DOM)
- onRemoved (removed from the DOM)

### Update cycle
After the component is up and running any modifications in bound properties or attributes will cause an update cycle
- onBeforeUpdate()
- [internal update cycle]
- onUpdate()

### Property changes / binding execution
For each bound property or attribute, a special callback (if exists) will be triggered
- on[PropertyName]Changed (newValue)

> **Note:** property name is translated to PascalCase with "on" as prefix and "Changed" postfix. For example: for a property named "myValue" the callback invoked is "onMyValueChanged"

At any point in the code, either by responding to events or at any point, an element can call it's own render() method, and may optionally include a custom template (as string) as an argument. This will temporary replace the content with a new content and re-run the render cycle
- onBeforeRender
- [internal rendering]
- onAfterRender

## Example
```javascript
import {Slim} from 'slim-js'
import {tag, template} from 'slim-js/Decorators'

@tag('some-element')
@template('<div>Click me!</div>')
class SomeElement extends Slim {
  onBeforeCreated() {
    this.myValue = 'Hello, world'
    this._clickHandler = this.clickHandler.bind(this)
  }
  
  onAdded() {
    this.addEventListener('click', this._clickHandler)
  }
  
  onRemoved() {
    this.removeEventListener('click', this._clickHandler)
  }
  
  clickHandler() {
    console.log('Click', this.myValue)
  }
}
```