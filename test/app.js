// Basic Backbone view for testing

require('../index.js');
const _ = require('underscore');
const Backbone = require('backbone');

const layoutView = Backbone.View.extend({
	el: '#app',
	template: `<div> blah blah </div>`,
	initialize() {
		this._tmpl = _.template(this.template);
		this.initScrollBottom();
		this.listenTo(this, 'scroll:bottom', () => {
			console.log("scrollbottom!!!!");
		});
	},
	render() {
		this.$el.html(this._tmpl());
		// Add a bunch of nonsense
		for (let i = 0; i < 100; i++) {
			this.$el.append('<div> lame </div>');
		}
	},
});

Backbone.$(document).ready(() => {
	const lv = new layoutView();
	lv.render();
	window.layoutView= lv;
	console.log("disable with: window.layoutView.stopListening()");
});
