module.exports = {

  once: function (el, type, callback) {
    var typeArray = type.split(' ');

    for (var i = typeArray.length - 1; i >= 0; i--) {
      el.addEventListener(typeArray[i], function(e) {
        e.target.removeEventListener(e.type, arguments.callee);
        return callback(e);
      });
    };
  },

  on: function(el, type, callback, capture) {
    el.addEventListener(type, callback, capture || false);
  },

  off: function(el, type, callback, capture) {
    el.removeEventListener(type, callback, capture || false);
  }

}