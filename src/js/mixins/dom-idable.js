module.exports = {

  getDomId: function() {
  	return 'dom_id' + this._reactInternalInstance._rootNodeID.replace(/\./g, '_');
  }
  
}