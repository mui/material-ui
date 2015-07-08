let Events = require('./events');


module.exports = {

  _testSupportedProps(props) {
    let i,
      el = document.createElement('div');

    for (i in props) {
      if (props.hasOwnProperty(i) && el.style[i] !== undefined) {
        return props[i];
      }
    }
  },

  //Returns the correct event name to use
  transitionEndEventName() {
    return this._testSupportedProps({
      'transition':'transitionend',
      'OTransition':'otransitionend',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd',
    });
  },

  animationEndEventName() {
    return this._testSupportedProps({
      'animation': 'animationend',
      '-o-animation': 'oAnimationEnd',
      '-moz-animation': 'animationend',
      '-webkit-animation': 'webkitAnimationEnd',
    });
  },

  onTransitionEnd(el, callback) {
    let transitionEnd = this.transitionEndEventName();

    Events.once(el, transitionEnd, () => {
      return callback();
    });
  },

  onAnimationEnd(el, callback) {
    let animationEnd = this.animationEndEventName();

    Events.once(el, animationEnd, () => {
      return callback();
    });
  },
};
