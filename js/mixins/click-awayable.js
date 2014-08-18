var $ = require('jquery'),
  React = require('react');

module.exports = {
  listenToClickAway: function(reactComp, callback) {
    var clickEvent = 'click' + reactComp._rootNodeID;

    $(document)
      .off(clickEvent)
      .on(clickEvent, function(e) {
        if (reactComp.isMounted() && !$(e.target).closest(reactComp.getDOMNode()).length) {
          callback();
        }
    });
  },

  stopListeningToClickAway: function(reactComp) {
    $(document).off('click' + reactComp._rootNodeID);
  }
}