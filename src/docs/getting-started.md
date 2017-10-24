# Introduction
Slim.js is a lightweight web component authoring library that provides extended capabilities for components (such as data binding) using es6 native class inheritance. This library is focused on providing developers the ability to write robust web components quickly and without the hassle of unnecessary dependencies or an overhead of a framework.

### Installation
```bash
npm install slim-js
yarn add slim-js
bower install slimjs
```

### Web-Components Spec. & Polyfills
Slim.js is based on the browser's native DOM API's web-components spec.
For browsers that do not support this natively, a polyfill is required.

You can load the polyfill directly from the html file
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.17/webcomponents-lite.js"></script>
``` 
or use Slim.polyfill utility method to determine whether the polyfill is required and load if so.
```html
<script src="/path/to/slim.js/Slim.js"></script>
<script type="text/javascript">
    Slim.polyfill('https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.17/webcomponents-lite.js');
</script>
```

