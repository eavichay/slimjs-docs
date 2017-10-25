# Interactivity
All native HTMLElement events are supported via reserved attributes, omitting the "on" prefix.
A Slim element can add event listeners via template. Example
```html
<ul mouseout="handleMouseOut">
    <li click="handleClick"></li>
    <li mouseover="handleMouseOver"></li>
</ul>
```
Slim.js will automatically add event listeners on the target elements and invoke the declared method name on the bound parent,
passing the native DOM event as an argument.

Native HTML Elements respond to interactive events by default, as opposed to Slim elements.
In-order to enable interactivity with native DOM events, either use the reserved *interactive* attribute on the declared
Slim element:
```html
<my-slim-child interactive click="handleClick"></my-slim-child>
```
or use *\[get\] isInteractive* property on the class declaration:
```javascript
class MyChildElement extends Slim {
  get isInteractive() { return true }
}
```

# Callback binding