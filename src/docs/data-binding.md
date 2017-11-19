# Data binding

Slim elements support automated binding mechanism, implicitly from element templates.

There are 2 types of data binding:
- Property → Attribute → Property binding (PAP)
- Property → Text binding (PT)

### Properties and Attributes (PAP)
This binding takes effect when a Slim custom element is nested in another Slim custom element, declared in the element's template.
For example:
```javascript
Slim.tag("parent-element",
'<child-element bind:target-property="sourceProperty"></child-element>',
class ParentElement extends Slim {
  onBeforeCreated() {
    this.parentProperty = "Hello"
  }
})
```
During the creation process of the parent element and the child element, a binding object will be created in the background and assigned
in the parent element's *_bindings* private property.
In addition, the parent-element will automatically create a custom getter/setter functions on key *"sourceProperty"*
that triggers a modification on the child-element (a pre-existing setter function will be chained).

The child element will automatically set the *target-property* attribute with the actual value of the parent-element's *sourceProperty* and
will update the child-element's *targetProperty* (dash-case converted to camel-cased) with that value, invoking *onTargetPropertyChanged* method (if exists).

Bindings are not exclusive for 1st level children. Any element declared in a template is automatically bound to the element that declares it.

> **Note:** DOM does not support attribute values to be anything other than DOMString -
> this means that all values are to be converted to DOMString on an element's attribute. The element's property, though, will receive 
> the actual value. This way the PAP bindings allows passing complex objects to children via binding.

If a Slim element is not nested in any other Slim element and still requires binding a property to an attribute, it is done using the @attribute decorator.
```javascript
import {Slim} from 'slim-js'
import {tag, attribute} from 'slim-js/Decorators'

@tag('some-element')
class extends Slim {
  @attribute
  myProperty // bounds to my-property attribute automatically.
}
```

### Property → Text binding (PT)
Text nodes can also contain bindings to properties defined in their *bound parent* (The element declaring the binding in it's template).
In order to apply text-node bindings, the developer must explicitly request it using the reserved *bind* keyword attribute.
For example:
```javascript
@tag("my-tag")
@template("<div bind>Hello, {{myName}}!</div>")
class MyTag extends Slim {
  onBeforeCreated() {
    this.myName = "Custom Elements Developer"
  }
}
```
Similar to PAP binding, a binding object will be automatically created in the background, and attached to MyTag's *_bindings* private property.
A custom getter/setter with the key *myName* will be created on MyTag's instance, thus any changes in the value will invoke an update chain of events.

Property → Text bindings should be used on leaf nodes (avoid nodes with children) and the developer must explicitly add *bind* attribute on the leaf node.

#### Computed and pathed binding(s)
##### Computer
A declaration of a PAP binding can include a wrapping method, for filtering or modifications in the result.
For example:
```javascript
Slim.tag("parent-element",
'<child-element bind:target-property="myMethod(greeting)"></child-element>',
class ParentElement extends Slim {
  onBeforeCreated() {
    this.greeting = "Hello"
  }
  
  myMethod(value) {
    return value.toUpperCase()
  }
})
```
In the above example, any change in *greeting* on the parent-element will be passed to *myMethod* function on the parent before sent to the child.
The child will receive the function's returned value. In this example, the upper-cased "HELLO" string.
A method-wrapped PAP binding can contain multiple source properties, for each of them a binding object will be automatically created in the background.
```html
<child-element bind:target-property="myMethod(propertyOne, propertyTwo)"></child-element>
```

##### Binding path
A developer can use dot-notation in order to deeply search within an object or array.
For example:
```html
<div bind>Hello, {{user.name}}, your role is {{getUserRole(user)}}</div>
<div bind:prop="someFunction(user.name)"></div>
<ul bind:attr="user.name"></ul>
```
> Path binding takes effect on the "root" of an expresison, responding to changes only on the object's reference. It does not creates an observable out of an object. 

# Repositioning bound elements
If you wish to move an element outside the template and keep the binding, use the DOM native API calls (i.e. appendChild) AFTER the element is created and the binding takes effect.
A use-case for this kind of manipulation may be popping up an element, covering the whole view.
That element can be nested somewhere deep in the DOM, while later on, after the bindings take effect, can be moved to the document's root (document.appendChild(element)).


