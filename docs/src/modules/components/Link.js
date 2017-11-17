// @flow
/* eslint-disable react/no-multi-comp */

import React from 'react';
import type { ElementType, Node } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NextLink from 'next/link';
import { withStyles } from 'material-ui/styles';
import { capitalizeFirstLetter } from 'material-ui/utils/helpers';

const styles = theme => ({
  root: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  variantDefault: {
    color: 'inherit',
  },
  variantPrimary: {
    color: theme.palette.primary[500],
  },
  variantAccent: {
    color: theme.palette.secondary.A400,
  },
  variantButton: {
    '&:hover': {
      textDecoration: 'inherit',
    },
  },
});

class OnClick extends React.Component<any, any> {
  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.props.onCustomClick) {
      this.props.onCustomClick(event);
    }
  };

  render() {
    const { component: ComponentProp, onCustomClick, ...props } = this.props;
    return <ComponentProp {...props} onClick={this.handleClick} />;
  }
}

OnClick.propTypes = {
  component: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onCustomClick: PropTypes.func,
};

type Variant = 'default' | 'primary' | 'accent' | 'button';

type DefaultProps = {
  activeClassName: string,
  variant?: Variant,
};

type ProvidedProps = {
  classes: Object,
  theme?: Object,
};

type Props = {
  activeClassName: string,
  children: Node,
  className?: string,
  component?: ElementType,
  href?: string,
  onClick?: Function,
  prefetch?: boolean,
  variant?: Variant,
};

class Link extends React.Component<Props & ProvidedProps> {
  static defaultProps: DefaultProps = {
    variant: 'default',
    activeClassName: 'active',
  };

  static contextTypes = {
    url: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const {
      activeClassName,
      children: childrenProp,
      component: ComponentProp,
      classes,
      className: classNameProp,
      variant,
      href,
      onClick,
      prefetch,
      ...other
    } = this.props;

    let ComponentRoot;
    const className = classNames(
      classes.root,
      classes[`variant${capitalizeFirstLetter(variant)}`],
      classNameProp,
    );
    let rootProps;
    let children = childrenProp;

    if (ComponentProp) {
      ComponentRoot = ComponentProp;
      rootProps = {
        ...other,
        className,
      };
    } else if (href) {
      ComponentRoot = NextLink;
      rootProps = {
        href,
        prefetch,
        passHref: true,
      };
      const active = this.context.url.pathname === href;
      children = (
        <OnClick
          component="a"
          className={classNames(className, {
            [activeClassName]: active && activeClassName,
          })}
          onCustomClick={onClick}
          {...other}
        >
          {children}
        </OnClick>
      );
    } else {
      ComponentRoot = 'a';
      rootProps = {
        ...other,
        className,
      };
    }

    return <ComponentRoot {...rootProps}>{children}</ComponentRoot>;
  }
}

export default withStyles(styles)(Link);
