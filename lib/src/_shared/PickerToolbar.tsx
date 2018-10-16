import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ExtendMui } from '../_helpers/types';

export interface PickerToolbarProps
  extends ExtendMui<ToolbarProps>,
    WithStyles<typeof styles> {
  children: React.ReactNodeArray;
}

const PickerToolbar: React.SFC<PickerToolbarProps> = ({
  children,
  className,
  classes,
  ...other
}) => {
  return (
    <Toolbar className={classnames(classes.toolbar, className)} {...other}>
      {children}
    </Toolbar>
  );
};

(PickerToolbar as any).propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
  classes: PropTypes.any.isRequired,
  innerRef: PropTypes.any,
};

PickerToolbar.defaultProps = {
  className: '',
};

const styles = (theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: 100,
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.primary.main
          : theme.palette.background.default,
    },
  });

export default withStyles(styles, { name: 'MuiPickersToolbar' })(PickerToolbar);
