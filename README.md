# backbone_scrollBottom
Simple Backbone view addon that triggers an event when a view has been scrolled all the way down.

install:
```bash
npm install thann/backbone_scrollBottom
```

require in app & use in view:
```js
require('backbone_scrollBottom');
const someView = Backbone.View.extend({
  initialize() {
    this.initScrollBottom();
    this.listenTo(this, 'scroll:bottom', () => {
      console.log("scrollbottom!!!!");
    });
  },
});
```

### Example
See [test/app.js](test/app.js) for an example.

Run test server with `npm run test` then navigate to [localhost:3069](http://localhost:3069).


