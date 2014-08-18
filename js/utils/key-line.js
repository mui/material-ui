var Constants = require('./constants.js');

module.exports = {
	getIncrementalDim: function(dim) {
		return Math.ceil(dim / Constants.KeyLines.Desktop.INCREMENT) * Constants.KeyLines.Desktop.INCREMENT;	
	}
}