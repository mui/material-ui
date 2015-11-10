let storedEvents = {};

module.exports = {

  once(el, type, callback) {
    let typeArray = type ? type.split(' ') : [];
    let recursiveFunction = (e) => {
      e.target.removeEventListener(e.type, recursiveFunction);
      return callback(e);
    };

    for (let i = typeArray.length - 1; i >= 0; i--) {
      this.on(el, typeArray[i], recursiveFunction);
    }
  },

  // Only fire the last callback added to the stack
  onstack: function(el, type, callback) {
    if (storedEvents[el] === undefined) storedEvents[el] = {};
    if (storedEvents[el][type] === undefined) storedEvents[el][type] = [];
    if (storedEvents[el][type].length) this.off(el, type, storedEvents[el][type][0]);

    this.on(el, type, callback);
    storedEvents[el][type] = [callback].concat(storedEvents[el][type]);
  },

  // Remove a callback from the stack and reassign if callback was current
  offstack: function (el, type, callback) {
    if (storedEvents[el] === undefined) return;
    if (!storedEvents[el][type] === undefined) return;

    let idx = storedEvents[el][type].indexOf(callback);

    if (idx >= 0) {
      storedEvents[el][type].splice(idx, 1);
      if (idx === 0) {
        this.off(el, type, callback);
        if (storedEvents[el][type].length) {
          this.on(el, type, storedEvents[el][type][0]);
        }
      }
    }

    if (storedEvents[el][type].length === 0) delete(storedEvents[el][type]);
    if (storedEvents[el].length === 0) delete(storedEvents[el]);
  },

  on(el, type, callback) {
    if (el.addEventListener) {
      el.addEventListener(type, callback);
    }
    else {
      // IE8+ Support
      el.attachEvent('on' + type, () => {
        callback.call(el);
      });
    }
  },

  off(el, type, callback) {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback);
    }
    else {
      // IE8+ Support
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
