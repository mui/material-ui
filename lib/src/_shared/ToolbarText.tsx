import { Theme } from '@material-ui/core';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ExtendMui } from '../typings/extendMui';

export interface ToolbarTextProps extends ExtendMui<TypographyProps>, WithStyles<typeof styles> {
  selected: boolean;
  label: string;
}

// TODO make a styled(Typography) when updated to material-ui
const ToolbarText: React.FunctionComponent<ToolbarTextProps> = ({
  classes,
  selected,
  label,
  className = null,
  ...other
}) => (
  <Typography
    className={clsx(classes.toolbarTxt, className, {
      [classes.toolbarBtnSelected]: selected,
    })}
    {...other}
  >
    {label}
  </Typography>
);

(ToolbarText as any).propTypes = {
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  classes: PropTypes.any.isRequired,
  className: PropTypes.string,
  innerRef: PropTypes.any,
};

ToolbarText.defaultProps = {
  className: '',
};

export const styles = (theme: Theme) => ({
  toolbarTxt: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  toolbarBtnSelected: {
    color: theme.palette.common.white,
  },
});

export default withStyles(styles, { name: 'MuiPickersToolbarText' })(ToolbarText);
