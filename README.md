# monad-navigation
Generic navigation module (menu builder) from Monad CMS.

## Installation

### Using NPM
```sh
$ npm install --save monad-navigation
```

`require` it in your Javascript bootstrapper and add the extra module dependency
to your admin module:

```js
require('monad-cms');
require('monad-navigation');

angular.module('myAdminModule', ['monad-cms', 'monad-navigation']);
```

### Using Bower
```sh
$ bower install --save monad-navigation
```

Add a link to the script in your HTML file, _after_ the main monad script but
_before_ your custom scripts:

```html
<script src="bower_components/monad/dist/monad.js"></script>
<script src="bower_components/monad-navigation/dist/monad-navigation.js"></script>
<script src="myAdminBundle.js"></script>
```

Now register the dependency like with the NPM install:

```js
angular.module('myAdminModule', ['monad-cms', 'monad-navigation']);
```

