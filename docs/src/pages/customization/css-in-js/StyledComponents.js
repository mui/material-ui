import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// A function you can extract and put into its own module.
// Yes, 8 lines of code, it's all you need.
const styled = Component => (style, options) => {
  const StyledComponent = props => <Component {...props} />;
  const styles =
    typeof style === 'function'
      ? theme => ({ ...style(theme) });
      : { ...style };
  return withStyles(styles, options)(StyledComponent);
}

// You can even write CSS with https://github.com/cssinjs/jss-template.
const MyButton = styled(Button)({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  },
});

function StyledComponents() {
  return <MyButton>{'Styled Components'}</MyButton>;
}

export default StyledComponents;
