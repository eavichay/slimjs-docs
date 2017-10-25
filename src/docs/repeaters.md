# Repeating elements
Slim.js provides the reserved attributes *slim-repeat* and *slim-repeat-as* in order to create repeated elements iterating an array.
For each entry in the array the targeted node will be duplicated and the array contents will be passed to that node.

For example:
```javascript
@tag("my-tag")
@template(`
<ul>
  <li slim-repeat="items" slim-repeat-as="item" bind>[[item]]</li>
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

By default, when *slim-repeat-as* is not provided, the key "data" will be used.

### Array mutations & Best practice
Slim.js enhances Array.prototype's *pop*, *push*, *shift*, *splice*, *unshift* methods to notify repeaters of a change.
Though the best practice is to replace the array reference with a new array (for faster performance), it is not mandatory.
All repeaters automatically subscribe to an array for mutations and respond when these happen.
Batched changes does not cost more in terms of performance: the repeater response is asynchronous and collect all changes within
one event loop of the javascript engine.

Though mutations do create response, they do not detect changes within the array. The best practice is to use immutable arrays as data source
and replace those with new arrays for every mutation in the data (Array.concat, Array.filter, Array.map etc.)

### Repeating elements with additional data binding(s)
A developer that uses PAP or PT binding to all repeated children should consider that the property name declared in *slim-repeat-as* will be excluded (defaulted to "data").
Example:
```html
<ul>
    <li slim-repeat="items" slim-repeat-as="item" bind>The item is [[item]] and this is [[otherProperty]]</li>
</ul>
```
In the above example, the bound parent's *otherProperty* is bound to the *li* elements' inner-text, as *item* on the *li* elements is bound to the array *items*.

> For deep nesting of elements it is encouraged to use Slim element children and use PAP binding. The best practice is to provide an array containing all the required data and avoid direct binding (performance-wise).