# Repeating elements
Slim.js provides the reserved attributes *slim-repeat* and *slim-repeat-as* in order to create repeated elements iterating an array.
For each entry in the array the targeted node will be duplicated and the array contents will be passed to that node.

For example:
```javascript
@tag("my-tag")
@template(`
<ul>
  <li s:repeat="items as item" bind>{{item}}</li>
</ul>
`)
class MyTag extends Slim {
  onBeforeCreated() {
    this.items = ["Banana", "Orange", "Apple"]
  }
}
```
Every instance of *li* element will be automatically bound to the repeater's source array via the "item" property.
Additionally, *data_index* and *data_source* properties will also be injected to the target elements.

By default, when *s:repeat*'s *as* is not provided, the key "data" will be used. In the above example:
```html
<li s:repeat="items" bind>{{data}}</li>
```

### Array mutations & Best practice
Array mutations do not create response, nor repeater elements detect changes within the array. The best practice is to use immutable arrays as data source.

### Repeating elements with additional data binding(s)
A developer that uses PAP or PT binding to all repeated children should consider that the property name declared in *slim-repeat-as* will be excluded (defaulted to "data").
Example:
```html
<ul>
    <li s:repeat="items as item" bind>The item is {{item}} and this is {{otherProperty}}</li>
</ul>
```
In the above example, the bound parent's *otherProperty* is bound to the *li* elements' inner-text, as *item* on the *li* elements is bound to the array *items*.

> For deep nesting of elements it is encouraged to use Slim element children and use PAP binding. The best practice is to provide an array containing all the required data and avoid direct binding (performance-wise).