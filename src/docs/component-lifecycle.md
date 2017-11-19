# Lifecycle

A Slim HTMLElement has a rich lifecycle so a developer can insert code hooks on many points in the component's life.

### Lifecycle hooks
- constructor
- [init phase]
- onBeforeCreated ()
- [constructing components tree]
- onCreated ()
- [creating and data binding with scoped children]
- onAdded ()
- onRender ()

### DOM lifecycle
additionally a component have the following
- onAdded (inserted into the DOM)
- onRemoved (removed from the DOM)

At any point in the code, either by responding to events or at any point, an element can call it's own render() method, and may optionally include a custom template (as string) as an argument. This will temporary replace the content with a new content and re-run the render cycle
- [constructing components tree]
- [creating and data binding with (new) scoped children]
- onRender ()

## Example
```javascript
@tag('my-element')
@template(`<span bind>{{myValue}}</span><input type="button" click="addOne" />`)
class MyElement extends Slim {
  onBeforeCreated () {
    // initializing predefined values
    this.myValue = 1
  }

  onCreated () {
    // element created and bound to parent custom elements
  }

  onRender() {
    // access to children
    this.find('button').value = 'Add one'
  }

  onAdded () {
    console.log('Added')
  }

  onRemoved() {
    console.log('Removed')
  }
}
```

# Slim.prototype.update(...props)
Force executing all bindables. If the developer provides specific paths or properties, it updates only the specific bingindgs.
Example:
```javascript
...
  onSomethingImportantHappened () {
    this.updateImportantData();
    this.update('data', 'someOtherImportantKey')
  }
...
```