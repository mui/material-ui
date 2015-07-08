module.exports = {

  once(el, type, callback) {
    let typeArray = type.split(' ');
    let recursiveFunction = (e) => {
      e.target.removeEventListener(e.type, recursiveFunction);
      return callback(e);
    };

    for (let i = typeArray.length - 1; i >= 0; i--) {
      this.on(el, typeArray[i], recursiveFunction);
    }
  },

  // IE8+ Support
  on(el, type, callback) {
    if (el.addEventListener) {
      el.addEventListener(type, callback);
    }
    else {
      el.attachEvent('on' + type, () => {
        callback.call(el);
      });
    }
  },

  // IE8+ Support
  off(el, type, callback) {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback);
    }
    else {
      el.detachEvent('on' + type, callback);
    }
  },

  isKeyboard(e) {
    return [
      'keydown',
      'keypress',
      'keyup',
    ].indexOf(e.type) !== -1;
  },
};
