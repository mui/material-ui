"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@mui/utils");

var _system = require("@mui/system");

var _base = require("@mui/base");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function getSvgIconUtilityClass(slot) {
  return (0, _base.generateUtilityClass)('MuiSvgIcon', slot);
}

const useUtilityClasses = ownerState => {
  const {
    color,
    fontSize,
    classes
  } = ownerState;
  const slots = {
    root: ['root', color !== 'inherit' && `color${(0, _utils.unstable_capitalize)(color)}`, `fontSize${(0, _utils.unstable_capitalize)(fontSize)}`]
  };
  return (0, _base.unstable_composeClasses)(slots, getSvgIconUtilityClass, classes);
};

const SvgIconRoot = (0, _system.styled)('svg', {
  name: 'MuiSvgIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== 'inherit' && styles[`color${(0, _utils.unstable_capitalize)(ownerState.color)}`], styles[`fontSize${(0, _utils.unstable_capitalize)(ownerState.fontSize)}`]];
  }
})(({
  theme = {},
  ownerState
}) => {
  var _theme$transitions;

  const styles = {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: 'currentColor',
    flexShrink: 0
  };

  if (typeof ((_theme$transitions = theme.transitions) == null ? void 0 : _theme$transitions.create) === 'function') {
    styles.transition = theme.transitions.create('fill', {
      duration: theme.transitions.duration.shorter
    });
  } // font size


  if (ownerState.fontSize) {
    if (ownerState.fontSize === 'inherit') {
      styles.fontSize = 'inherit';
    } else if (theme.name === 'joy') {
      // for @mui/joy, use CSS var if exists
      styles.fontSize = (theme.vars || theme).fontSize[ownerState.fontSize];
    } else {
      var _theme$typography, _theme$typography2, _theme$typography3;

      // default (same as @mui/material)
      styles.fontSize = {
        small: ((_theme$typography = theme.typography) == null ? void 0 : _theme$typography.pxToRem(20)) || '1.25rem',
        medium: ((_theme$typography2 = theme.typography) == null ? void 0 : _theme$typography2.pxToRem(24)) || '1.5rem',
        large: ((_theme$typography3 = theme.typography) == null ? void 0 : _theme$typography3.pxToRem(35)) || '2.1875rem'
      }[ownerState.fontSize];
    }
  } // color


  if (ownerState.color) {
    if (ownerState.color === 'inherit') {
      styles.color = 'inherit';
    } else if (theme.name === 'joy') {
      // for @mui/joy, use CSS var if exists
      styles.color = (theme.vars || theme).palette[ownerState.color].textColor;
    } else {
      var _palette$ownerState$c, _palette$ownerState$c2, _theme$palette, _theme$palette2;

      // default (same as @mui/material)
      // should be sync with https://github.com/mui-org/material-ui/blob/master/packages/mui-material/src/styles/createPalette.js
      const palette = theme.palette || {
        primary: {
          main: '#1976d2'
        },
        secondary: {
          main: '#9c27b0'
        },
        error: {
          main: '#d32f2f'
        },
        info: {
          main: '#0288d1'
        },
        success: {
          main: '#2e7d32'
        },
        warning: {
          main: '#ed6c02'
        }
      };
      styles.color = (_palette$ownerState$c = (_palette$ownerState$c2 = palette[ownerState.color]) == null ? void 0 : _palette$ownerState$c2.main) != null ? _palette$ownerState$c : {
        action: ((_theme$palette = theme.palette) == null ? void 0 : _theme$palette.action.active) || 'rgba(0, 0, 0, 0.54)',
        disabled: ((_theme$palette2 = theme.palette) == null ? void 0 : _theme$palette2.action.disabled) || 'rgba(0, 0, 0, 0.26)'
      }[ownerState.color];
    }
  }

  return styles;
});
const SvgIcon = /*#__PURE__*/React.forwardRef(function SvgIcon(inProps, ref) {
  const props = (0, _system.useThemeProps)({
    props: inProps,
    name: 'MuiSvgIcon'
  });
  const {
    children,
    className,
    color = 'inherit',
    component = 'svg',
    fontSize = 'medium',
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = '0 0 24 24'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    color,
    component,
    fontSize,
    inheritViewBox,
    viewBox
  });
  const more = {};

  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }

  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SvgIconRoot, (0, _extends2.default)({
    as: component,
    className: (0, _clsx.default)(classes.root, className),
    ownerState: ownerState,
    focusable: "false",
    color: htmlColor,
    "aria-hidden": titleAccess ? undefined : true,
    role: titleAccess ? 'img' : undefined,
    ref: ref
  }, more, other, {
    children: [children, titleAccess ? /*#__PURE__*/(0, _jsxRuntime.jsx)("title", {
      children: titleAccess
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? SvgIcon.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Node passed into the SVG element.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['inherit']), _propTypes.default.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['inherit']), _propTypes.default.string]),

  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: _propTypes.default.string,

  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: _propTypes.default.bool,

  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: _propTypes.default.string,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),

  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: _propTypes.default.string,

  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: _propTypes.default.string
} : void 0;
SvgIcon.muiName = 'SvgIcon';
var _default = SvgIcon;
exports.default = _default;