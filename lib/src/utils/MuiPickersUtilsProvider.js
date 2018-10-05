"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var _a = React.createContext(null), Consumer = _a.Consumer, Provider = _a.Provider;
exports.MuiPickersContextConsumer = Consumer;
var MuiPickersUtilsProvider = /** @class */ (function (_super) {
    __extends(MuiPickersUtilsProvider, _super);
    function MuiPickersUtilsProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            utils: null,
        };
        return _this;
    }
    MuiPickersUtilsProvider.getDerivedStateFromProps = function (_a) {
        var Utils = _a.utils, locale = _a.locale, moment = _a.moment;
        return {
            utils: new Utils({ locale: locale, moment: moment }),
        };
    };
    MuiPickersUtilsProvider.prototype.render = function () {
        return React.createElement(Provider, { value: this.state.utils, children: this.props.children });
    };
    MuiPickersUtilsProvider.propTypes = {
        utils: PropTypes.func.isRequired,
        locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        children: PropTypes.oneOfType([
            PropTypes.element.isRequired,
            PropTypes.arrayOf(PropTypes.element.isRequired),
        ]).isRequired,
        moment: PropTypes.func,
    };
    MuiPickersUtilsProvider.defaultProps = {
        locale: undefined,
        moment: undefined,
    };
    return MuiPickersUtilsProvider;
}(React.Component));
exports.default = MuiPickersUtilsProvider;
//# sourceMappingURL=MuiPickersUtilsProvider.js.map