import * as React from 'react';
import clsx from 'clsx';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import { ExtendMui } from '../typings/extendMui';
import { PenIcon } from '../_shared/icons/PenIcon';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Grid } from '@material-ui/core';

export const useStyles = makeStyles(
  theme => {
    const toolbarBackground =
      theme.palette.type === 'light'
        ? theme.palette.primary.main
        : theme.palette.background.default;
    return {
      toolbar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: toolbarBackground,
        color: theme.palette.getContrastText(toolbarBackground),
      },
      toolbarLandscape: {
        height: 'auto',
        maxWidth: 160,
        padding: 16,
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
      },
      dateTitleContainer: {
        flex: 1,
      },
    };
  },
  { name: 'MuiPickersToolbar' }
);

interface PickerToolbarProps extends ExtendMui<ToolbarProps> {
  title: string;
  landscapeDirection?: 'row' | 'column';
  isLandscape: boolean;
  penIconClassName?: string;
}

const PickerToolbar: React.SFC<PickerToolbarProps> = ({
  children,
  isLandscape,
  title,
  landscapeDirection = 'column',
  className = null,
  penIconClassName,
  ...other
}) => {
  const classes = useStyles();

  return (
    <Toolbar
      className={clsx(classes.toolbar, { [classes.toolbarLandscape]: isLandscape }, className)}
      {...other}
    >
      <Typography color="inherit" variant="overline" children={title} />
      <Grid
        container
        justify="space-between"
        className={classes.dateTitleContainer}
        direction={isLandscape ? landscapeDirection : 'row'}
        alignItems={isLandscape ? 'flex-start' : 'flex-end'}
      >
        {children}
        <IconButton className={penIconClassName} color="inherit">
          <PenIcon color="inherit" />
        </IconButton>
      </Grid>
    </Toolbar>
  );
};

export default PickerToolbar;
