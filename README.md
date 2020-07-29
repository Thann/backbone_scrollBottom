# Backbone_scrollBottom
Simple Backbone view addon that triggers an event when a view has been scrolled all the way down.

Install:
```bash
npm install thann/backbone_scrollbottom
```

Require in app & use in view:
```js
require('backbone_scrollbottom');
const someView = Backbone.View.extend({
  initialize() {
    this.initScrollBottom();
    this.on('scroll:bottom', (e) => {
      console.log("scrollbottom!!!!", e);
    });
  },
});
```

### Example
See [test/app.js](test/app.js) for an example.

Run test server with `npm run test` then navigate to [localhost:3069](http://localhost:3069).


