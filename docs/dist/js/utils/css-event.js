

module.exports = {

  onTransitionEnd: function ($el, callback) {
    $el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', callback);
  },

  onAnimationEnd: function ($el, callback) {
    $el.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', callback);
  }

};
