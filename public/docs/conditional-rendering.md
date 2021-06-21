# Conditional Rendering
Slim.js provides a way to compute during the rendering phase what should be rendered and what should be ignored.
A developer can manually update an element's template, or use *slim-if* attribute.

### s:if
Slim.js' reserved attribute *s:if* is bound to a property on the bound parent and appears in the DOM only if the result is true.
Additionally a developer can use exclamation mark to use false values.
For example:
```javascript
@tag("my-tag")
@template(
  '<div s:if="myBoolean">Now you see me</div>' +
  '<div s:if="!myBoolean">Now you do not!</div>')
class MyTag extends Slim {
  onBeforeCreated() {
    this.myBoolean = true;
    setInterval(() => {
      this.myBoolean = !this.myBoolean
    }, 500)
  }
}
```

### s:switch
Slim.js' reserved attributes *s:switch*, *s:case*, *s:default* offer conditional rendering upon changing a value and compares to it's string representation.
Example:
```html
<div s:switch="myProperty">
  <div s:case="value1">myProperty === 'value1'</div>
  <div s:case="value2">myProperty === 'value2'</div>
  <div s:default>myProperty is something else</div>
</div>
```

### Slim.prototype.render(customTemplate)
A developer can invoke the render method at any time, and optionally include a custom template.
When a custom template is provided, it will temporarily replace the template with the new template, destroying all it's children.
Calling render in the future, without a template, will restore the original template.
Example:
```javascript
@tag("my-tag")
@template('<div>Hello</div>')
class MyTag extends Slim {
  onCreated() {
    this.addEventListener('click', () => {
      this.render('<div>Goodbye</div>')
    })
  }
}
```
> Calling render loses the state of all children and should be used carefully