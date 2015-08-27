'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Colors = require('./colors');

var Typography = function Typography() {
  _classCallCheck(this, Typography);

  // text colors
  this.textFullBlack = Colors.fullBlack;
  this.textDarkBlack = Colors.darkBlack;
  this.textLightBlack = Colors.lightBlack;
  this.textMinBlack = Colors.minBlack;
  this.textFullWhite = Colors.fullWhite;
  this.textDarkWhite = Colors.darkWhite;
  this.textLightWhite = Colors.lightWhite;

  // font weight
  this.fontWeightLight = 300;
  this.fontWeightNormal = 400;
  this.fontWeightMedium = 500;

  this.fontStyleButtonFontSize = 14;
};

module.exports = new Typography();