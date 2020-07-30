// Basic Backbone view for testing

require('../index.js');
const _ = require('underscore');
const Backbone = require('backbone');

const layoutView = Backbone.View.extend({
	el: '#app',
	template: `
		<br>
		<h3> thann/backbone_scrollbottom demo </h3>
		<div> scroll to the bottom, and see more stuff appear </div>
		<br>
`,
	initialize() {
		this._tmpl = _.template(this.template);
		this.initScrollBottom();
		// this.initScrollBottom(undefined, factor=.75);
		// this.initScrollBottom(undefined, factor=1, offset=200);
		let i = 0;
		this.on('scroll:bottom', (e) => {
			i++;
			console.log("scrollbottom!!!!", i, e);
			this.render(i);
		});
	},
	render(x) {
		this.$el.html(this._tmpl());
		// Add a bunch of nonsense
		for (let i = 0; i <= (x||0); i++) {
			for (let j = 0; j < 100; j++) {
				this.$el.append(`<div> line: ${i}, ${j} </div>`);
			}
		}
	},
});

Backbone.$(document).ready(() => {
	const lv = new layoutView();
	lv.render();
	window.layoutView= lv;
	console.log("disable with: window.layoutView.stopListening()");
});
