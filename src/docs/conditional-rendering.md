# Conditional Rendering
Slim.js provides a way to compute during the rendering phase what should be rendered and what should be ignored.
A developer can manually update an element's template, or use *slim-if* attribute.

### slim-if
Slim.js' reserved attribute *slim-if* is bound to a property on the bound parent and appears in the DOM only if the result is true.
Additionally a developer can use exclamation mark to use false values.
For example:
```javascript
@tag("my-tag")
@template(
  '<div slim-if="myBoolean">Now you see me</div>' +
  '<div slim-if="!myBoolean">Now you do not!></div>')
class MyTag extends Slim {
  onBeforeCreated() {
    this.myBoolean = true;
    setInterval(() => {
      this.myBoolean = !this.myBoolean
    }, 500)
  }
}
```
In the above example, every 0.5 second a change in *myBoolean* property will trigger changes in the DOM and an update cycle.

### Slim.prototype.render(customTemplate)
A developer can invoke the render method at any time, and optionally include a custom template.
When a custom template is provided, it will temporarily replace the template with the new template, destroying all it's children.
Calling render in the future, without a template, will restore the original template.
Example:
```javascript
@tag("my-tag")
@template('<div>Hello</div>')
class MyTag extends Slim {
  onBeforeCreated() {
    this.addEventListener(() => {
      this.render('<div>Goodbye</div>')
    })
  }
}
```
> Calling render loses the state of all children and should be used carefully