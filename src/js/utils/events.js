module.exports = {

  once: function(el, type, callback) {
    var typeArray = type.split(' ');
    var recursiveFunction = function(e){
      e.target.removeEventListener(e.type, recursiveFunction);
      return callback(e);
    };

    for (var i = typeArray.length - 1; i >= 0; i--) {
      this.on(el, typeArray[i], recursiveFunction);
    }
  },

  // IE8+ Support
  on: function(el, type, callback) {
    if(el.addEventListener) {
      el.addEventListener(type, callback);
    } else {
      el.attachEvent('on' + type, function() {
        callback.call(el);
      });
    }
  },

  // IE8+ Support
  off: function(el, type, callback) {
    if(el.removeEventListener) {
      el.removeEventListener(type, callback);
    } else {
      el.detachEvent('on' + type, callback);
    }
  }
};