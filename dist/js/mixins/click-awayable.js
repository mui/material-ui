var $ = require('jquery');

module.exports = {

  //When the component mounts, listen to click events and check if we need to
  //Call the componentClickAway function.
  componentDidMount: function() {
    var clickEvent = 'click' + this._rootNodeID;

    $(document)
      .off(clickEvent)
      .on(clickEvent, function(e) {
        if (this.isMounted() && !$(e.target).closest(this.getDOMNode()).length) {
          if (this.componentClickAway) this.componentClickAway();
        }
    }.bind(this));
  },

  componentWillUnmount: function() {
    $(document).off('click' + this._rootNodeID);
  }

}
