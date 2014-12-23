module.exports = {

  resetState: function(callback) {
    this.setState(this.getInitialState(), callback);
  }
  
}