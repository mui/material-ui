"use strict";

var index = 0;

module.exports = {
  generate: function generate() {
    return "mui-id-" + index++;
  }
};