"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropTypes = require("prop-types");
var date = PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
]);
exports.default = { date: date };
//# sourceMappingURL=prop-types.js.map