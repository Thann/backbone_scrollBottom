/**
 * Backbone ScrollBottom
 * trigger 'scroll:bottom' when view's bottom is in view
 */

'use strict';

const _ = require('underscore');
const Backbone = require('backbone');
const $ = Backbone.$;

// HACK: jquery's "on" & "off" fns have different signature than the backbone ones.
const doc = $(document);
for (const fn of ['on', 'off']) {
	const og = doc[fn];
	doc[fn] = (name, callback) => {
		og.call(doc, name, callback);
	}
}

Object.assign(Backbone.View.prototype, {
	initScrollBottom(debounce=500) {
		this.listenTo(doc, 'scroll', _.throttle((ev) => {
			const scrollpos = $(window).scrollTop();
			const screenHeight = window.innerHeight;
			const length = this.el.offsetHeight + this.el.offsetTop;

			// console.log("XXXX", scrollpos, length-screenHeight, scrollpos - (length-screenHeight) > 0);
			if ((scrollpos - (length - screenHeight)) > 0) {
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
