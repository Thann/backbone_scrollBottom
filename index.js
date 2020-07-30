/**
 * Backbone ScrollBottom
 * trigger 'scroll:bottom' when view's bottom is in view
 */

'use strict';

const _ = require('underscore');
const Backbone = require('backbone');
const $ = Backbone.$;

const doc = $(document);
// HACK: jquery's "on" & "off" fns have different signature than the backbone ones.
for (const fn of ['on', 'off']) {
	const og = doc[fn];
	doc[fn] = (name, callback) => {
		og.call(doc, name, callback);
	}
}

Object.assign(Backbone.View.prototype, {
	// debounce: only trigger once per x milliseconds
	// factor: trigger y percent of screen remaining above bottom
	// offset: trigger z px above the bottom
	initScrollBottom(debounce=500, factor=1, offset=0) {
		this.listenTo(doc, 'scroll', _.throttle((ev) => {
			const scrollpos = $(window).scrollTop();
			const screenHeight = window.innerHeight * (2-factor) + offset;
			const length = this.el.offsetHeight + this.el.offsetTop;

			// console.log("XXXX", scrollpos, length-screenHeight, scrollpos > (length-screenHeight));
			if (scrollpos > (length - screenHeight)) {
				this.trigger('scroll:bottom', ev);
			}
		}, debounce));

		return this;
	},
	disableScrollBottom() {
		this.stopListening(doc, 'scroll');
		return this;
	},
});
