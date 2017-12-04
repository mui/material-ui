// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = (theme: Object) => ({
  root: {
    margin: 0,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px \
      20px ${theme.spacing.unit * 3}px`,
    flex: '0 0 auto',
  },
});

type ProvidedProps = {
  classes: Object,
  /**
   * @ignore
   */
  theme?: Object,
};

export type Props = {
  /**
   * Other base element props.
   */
  [otherProp: string]: any,
  /**
   * The content of the component.
   */
  children?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, this can be useful to render an h4 instead of the default h2.
   */
  disableTypography: boolean,
};

class DialogTitle extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    disableTypography: false,
  };

  render() {
    const { children, classes, className, disableTypography, ...other } = this.props;

    return (
      <div data-mui-test="DialogTitle" className={classNames(classes.root, className)} {...other}>
        {disableTypography ? children : <Typography type="title">{children}</Typography>}
      </div>
    );
  }
}

export default withStyles(styles, { name: 'MuiDialogTitle' })(DialogTitle);
