import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// A function you can extract and put into its own module.
// Yes, 15 lines of code, it's all you need.
function styled(Component) {
  return (style, options) => {
    function StyledComponent(props) {
      const { classes, className, ...other } = props;
      return <Component className={clsx(classes.root, className)} {...other} />;
    }
    StyledComponent.propTypes = {
      classes: PropTypes.object.isRequired,
      className: PropTypes.string,
    };
    const styles =
      typeof style === 'function' ? theme => ({ root: style(theme) }) : { root: style };
    return withStyles(styles, options)(StyledComponent);
  };
}

// You can even write CSS with https://github.com/cssinjs/jss-template.
const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

function StyledComponents() {
  return <MyButton>{'Styled Components'}</MyButton>;
}

export default StyledComponents;
