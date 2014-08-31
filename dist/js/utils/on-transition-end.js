function onTransitionEnd($el, callback) {
	$el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', callback);
}

module.exports = onTransitionEnd;
