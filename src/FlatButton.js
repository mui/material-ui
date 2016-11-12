// @flow weak
import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import SwitchBase from 'material-ui/internal/SwitchBase';
import classNames from 'classnames';
const styleSheet = createStyleSheet('QuestionsButtons', (theme) => ({
  default: {},
  checked: {},
  button: {
    padding: 10,
    '&:hover': {
      color: theme.contrast,
    },
    '&:focus': {
      color: theme.contrast,
    },
    margin: '0 10px',
  },
}));
export default function QuestionsButtons(props, context) {
  const classes = context.styleManager.render(styleSheet);
  const {
    className,
    checkedClassName,
    icon,
    checkedIcon,
    onChange,
    role,
    labelCls,
    ...other
  } = props;
  const myfunc = ()=>console.log("cccc");
  const ButProps = {
    className: classNames(classes.default, className),
    checkedClassName: classNames(classes.checked, checkedClassName),
    icon: icon || <i className="fa fa-question-circle-o"/>,
    checkedIcon: checkedIcon || icon || <i className="fa fa-question-circle"/>,
    onChange: onChange || myfunc,
    role: role || "button",
    labelCls,
    ...other,
  };
  return (
    <SwitchBase {...ButProps}/>
  );
}
QuestionsButtons.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};