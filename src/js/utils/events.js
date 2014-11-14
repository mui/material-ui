module.exports = {

  once: function (node, type, callback) {
    var typeArray = type.split(' ');

    for (var i = typeArray.length - 1; i >= 0; i--) {
      node.addEventListener(typeArray[i], function(e) {
        e.target.removeEventListener(e.type, arguments.callee);
        return callback(e);
      });
    };
    
  }

}