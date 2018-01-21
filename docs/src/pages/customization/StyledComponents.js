import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

// A function you can extract and put into its own module.
// Yes, 13 lines of code, it's all you need.
function styled(Component) {
  return (styles, options) => {
    function StyledComponent(props) {
      const { classes, className, ...other } = props;
      return <Component className={classNames(classes.root, className)} {...other} />;
    }
    StyledComponent.propTypes = {
      classes: PropTypes.object.isRequired,
      className: PropTypes.string,
    };
    return withStyles({ root: styles }, options)(StyledComponent);
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
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
});

function StyledComponents() {
  return <MyButton>{'Styled Components'}</MyButton>;
}

export default StyledComponents;
