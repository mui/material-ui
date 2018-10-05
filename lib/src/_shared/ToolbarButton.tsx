import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core';

interface ToolbarButtonProps extends WithStyles<typeof styles> {
  selected: boolean;
  label: string;
  className?: string | null;
}

const ToolbarButton: React.SFC<TypographyProps & ToolbarButtonProps> = ({
  classes, selected, label, className, ...other
}) => (
  <Typography
    className={classnames(classes.toolbarBtn, className, {
      [classes.toolbarBtnSelected]: selected,
    })}
    {...other}
  >
    { label }
  </Typography>
);

(ToolbarButton as any).propTypes = {
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  classes: PropTypes.any.isRequired,
  className: PropTypes.string,
  innerRef: PropTypes.any
};

ToolbarButton.defaultProps = {
  className: '',
};

const styles = (theme: Theme) => ({
  toolbarBtn: {
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.54)',
  },
  toolbarBtnSelected: {
    color: theme.palette.common.white,
  },
});

export default withStyles(styles, { name: 'MuiPickersToolbarButton' })(ToolbarButton);
