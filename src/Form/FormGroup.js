// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
  },
};

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
   * Display group of elements in a compact row.
   */
  row: boolean,
};

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */
class FormGroup extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    row: false,
  };

  render() {
    const { classes, className, children, row, ...other } = this.props;
    const rootClassName = classNames(
      classes.root,
      {
        [classes.row]: row,
      },
      className,
    );

    return (
      <div className={rootClassName} {...other}>
        {children}
      </div>
    );
  }
}

export default withStyles(styles, { name: 'MuiFormGroup' })(FormGroup);
