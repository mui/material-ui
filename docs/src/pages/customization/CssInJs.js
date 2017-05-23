// @flow

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';

// 1. We define the styles.
const styleSheet = createStyleSheet('MyLink', theme => ({
  root: {
    color: 'inherit',
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  primary: {
    color: theme.palette.primary[500],
  },
}));

function MyLink(props) {
  const { children, classes, className, variant, ...other } = props;

  return (
    <a
      className={classNames(
        classes.root,
        {
          [classes.primary]: variant === 'primary',
        },
        className,
      )}
      {...other}
    >
      {children}
    </a>
  );
}

MyLink.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary']),
};

// 2. We inject the styles.
const MyLinkStyled = withStyles(styleSheet)(MyLink);

export default function CssInJs() {
  return (
    <div>
      <MyLinkStyled href="#">
        {'MyLink'}
      </MyLinkStyled>
      {' - '}
      <MyLinkStyled href="#" variant="primary">
        {'primary'}
      </MyLinkStyled>
    </div>
  );
}
