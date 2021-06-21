# Creating an element

### Class hierarchy

**Slim** ⇐ HTMLElement ⇐ Element ⇐ Node ⇐ EventTarget

### Slim::tag(), @tag, @template

Defining and registering a new custom element is done using either es6 syntax or es7/next decorators (with babel transpilation).

#### Examples

###### es6

```javascript
Slim.tag(
  'my-tag',
  `<div>Hello, i am a custom element</div>`,
  class MyTag extends Slim {
    // your code here
  }
)
```

###### es6/next/typescript

```javascript
import { Slim } from 'slim-js'
import { tag, template } from 'slim-js/Decorators'

@tag('my-tag')
@template('<div>Hello, i am a custom element</div>')
class MyTag extends Slim {
  // your code here
}
```

### HTML Usage

```html
<body>
...
    <my-tag></my-tag>
...
</body>
```
