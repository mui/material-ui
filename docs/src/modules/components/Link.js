/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-has-content */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';

function NextWrapper(props) {
  const { className, activeClassName, onClick, router, href, prefetch, ...other } = props;

  return (
    <NextLink href={href} prefetch={prefetch}>
      <a
        onClick={onClick}
        className={classNames(className, {
          [activeClassName]: router.pathname === href && activeClassName,
        })}
        {...other}
      />
    </NextLink>
  );
}

NextWrapper.defaultProps = {
  activeClassName: 'active',
};

NextWrapper.propTypes = {
  activeClassName: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

function Link(props) {
  const { naked, ...other } = props;

  const ToRender = {
    component: NextWrapper,
    ...other,
  };

  if (naked) {
    const { component: Component, ...rest } = ToRender;

    return <Component {...rest} />;
  }

  return <MuiLink {...ToRender} />;
}

Link.propTypes = {
  naked: PropTypes.bool,
};

export default withRouter(Link);
