import PropTypes from 'prop-types';
import withStyles from './withStyles';

function createStyled(styles, options) {
  function Styled(props) {
    const { children, classes, theme } = props;

    return children({
      classes,
      theme,
    });
  }

  Styled.propTypes = {
    children: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object,
  };

  const StyledWrapped = withStyles(styles, options)(Styled);

  return StyledWrapped;
}

export default createStyled;
