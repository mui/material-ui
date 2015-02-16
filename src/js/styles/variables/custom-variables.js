var Colors = require('../colors.js');
var Spacing = require('./spacing.js');
var Theme = require('../theme.js').get();

module.exports = {

  // Disabled Colors
  disabledColor: Theme.textColor, // fadeout 30%

  // Spacing
  spacing: Spacing,

  // checkbox
  checkboxBoxColor: Theme.textColor,
  checkboxCheckedColor: Theme.primary1Color,
  checkboxRequiredColor: Theme.primary1Color,
  checkboxDisabledColor: this.disabledColor,

  // toggle
  toggleThumbOnColor: Theme.primary1Color,
  toggleThumbOffColor: Colors.grey50,
  toggleThumbDisabledColor: Colors.grey400,
  toggleThumbRequiredColor: Theme.primary1Color,
  toggleTrackOnColor: Theme.primary1Color, // fadeout 50%
  toggleTrackOffColor: Colors.minBlack,
  toggleTrackDisabledColor: Colors.faintBlack,
  toggleTrackRequiredColor: this.toggleThumbRequiredColor, // fadeout 50%

  // radio button 
  radioButtonBorderColor:  Theme.textColor,
  radioButtonBackgroundColor: Colors.white,
  radioButtonCheckedColor: Theme.primary1Color,
  radioButtonRequiredColor: Theme.primary1Color,
  radioButtonDisabledColor: this.disabledColor,

}