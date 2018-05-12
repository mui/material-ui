import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// A function you can extract and put into its own module.
// Yes, 11 lines of code is all you need.
function createStyled(styles, options) {
  function Styled(props) {
    const { children, ...other } = props;
    return props.children(other);
  }
  Styled.propTypes = {
    children: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };
  return withStyles(styles, options)(Styled);
}

const Styled = createStyled({
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

function RenderProps() {
  return (
    <Styled>{({ classes }) => <Button className={classes.root}>{'Render props'}</Button>}</Styled>
  );
}
export default RenderProps;
