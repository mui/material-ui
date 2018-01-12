import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import injectSheet from 'react-jss/lib/injectSheet';
import Typography from 'material-ui/Typography';

// 1. We define the styles.
const styles = theme => ({
  root: {
    color: props => (props.variant === 'primary' ? theme.palette.primary.main : 'inherit'),
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

function MyLink(props) {
  const { children, classes, className, variant, sheet, theme, ...other } = props;

  return (
    <a className={classNames(classes.root, className)} {...other}>
      {children}
    </a>
  );
}

MyLink.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  sheet: PropTypes.object,
  theme: PropTypes.object,
  variant: PropTypes.oneOf(['primary', 'default']),
};

// 2. We inject the styles.
const MyLinkStyled = injectSheet(styles)(MyLink);

export default function ReactJss() {
  return (
    <Typography type="subheading">
      <MyLinkStyled href="#" variant="default">
        MyLink
      </MyLinkStyled>
      {' - '}
      <MyLinkStyled href="#" variant="primary">
        {'primary'}
      </MyLinkStyled>
    </Typography>
  );
}
