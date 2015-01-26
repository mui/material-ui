module.exports = {

  getDomId: function() {
    return 'dom_id' + this._rootNodeID.replace(/\./g, '_');
  }
  
}