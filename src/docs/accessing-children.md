# Accessing children
### slim-id attribute
When a Slim element requires access to a child element, using *id* attribute and DOM selectors may be troublesome,
especially when the element has multiple instances in the DOM.
Elements declared in a template can be referenced directly to their *bound parent* using hash (#) sign in the following manner:
```html
<div slim-id="myDiv">
    <span>Hello, </span>
    <span slim-id="mySpan">World</span>
</div>
```
In the element's class code a developer can access those children directly:
```javascript
class MyTag extends Slim {
  ...
  onCreated() {
    this.mySpan.innerText = "Custom Elements!"
    this.myDiv.style.backgroundColor = 'red';
  }
  ...
}
```
A shorthand for slim-id can be done using the hash (#) sign:
```html
<div #mydiv>Hello</div>
```
The hash technique is limited to lower cased alphabetic characters only.

### Slim.prototype.find
This function runs a search in the element's tree, returning the first element matching the selector.
If no element is found, it returns undefined.
### Slim.prototype.findAll
Returns all elements matching the selector in an Array.
If no elements are found, it returns an empty Array.

> **Note:** find and findAll methods performs a deep search in the tree, meaning that custom child elements may be holding children that matches the selector.
> If that happens, the find include these elements in the result.
> find and findAll are wrappers for querySelector and querySelectorAll, thus will not search inside a nested shadow DOM. 

### Slim.prototype.\[get\] rootElement
This will either return the element's shadow root (if used) or the element itself, depends of the use of shadow DOM.
A developer can search within nested shadow DOMs using access to rootElement.
For example: If a nested Slim element is using shadow DOM and the parent requires searching it's children,
it can be done using *rootElement*:
```javascript
var hiddenDivElements = this.find('child-element').rootElement.findAll('div')
```

### Accessing children and lifecycle
> **Note:** Accessing a child cannot be done before the element has finished the creation cycle.
> Therefore, a developer wishes to access referenced children should avoid doing so in onBeforeCreated hook