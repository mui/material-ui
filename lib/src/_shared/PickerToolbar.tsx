import * as React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import { ExtendMui } from '../typings/helpers';
import { PenIcon } from '../_shared/icons/PenIcon';
import { KeyboardIcon } from './icons/KeyboardIcon';
import { makeStyles } from '@material-ui/core/styles';
import { ToolbarComponentProps } from '../Picker/Picker';

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

interface PickerToolbarProps
  extends ExtendMui<ToolbarProps>,
    Pick<
      ToolbarComponentProps,
      | 'getMobileKeyboardInputViewButtonText'
      | 'isMobileKeyboardViewOpen'
      | 'toggleMobileKeyboardView'
    > {
  toolbarTitle: React.ReactNode;
  landscapeDirection?: 'row' | 'column';
  isLandscape: boolean;
  penIconClassName?: string;
}

function defaultGetKeyboardInputSwitchingButtonText(isKeyboardInputOpen: boolean) {
  return isKeyboardInputOpen
    ? 'text input view is open, go to calendar view'
    : 'calendar view is open, go to text input view';
}

const PickerToolbar: React.SFC<PickerToolbarProps> = ({
  children,
  isLandscape,
  toolbarTitle,
  landscapeDirection = 'column',
  className = null,
  penIconClassName,
  toggleMobileKeyboardView,
  isMobileKeyboardViewOpen,
  getMobileKeyboardInputViewButtonText = defaultGetKeyboardInputSwitchingButtonText,
  ...other
}) => {
  const classes = useStyles();

  return (
    <Toolbar
      data-mui-test="picker-toolbar"
      className={clsx(classes.toolbar, { [classes.toolbarLandscape]: isLandscape }, className)}
      {...other}
    >
      <Typography data-mui-test="picker-toolbar-title" color="inherit" variant="overline">
        {toolbarTitle}
      </Typography>
      <Grid
        container
        justify="space-between"
        className={classes.dateTitleContainer}
        direction={isLandscape ? landscapeDirection : 'row'}
        alignItems={isLandscape ? 'flex-start' : 'flex-end'}
      >
        {children}
        <IconButton
          onClick={toggleMobileKeyboardView}
          className={penIconClassName}
          color="inherit"
          data-mui-test="toggle-mobile-keyboard-view"
          aria-label={getMobileKeyboardInputViewButtonText(isMobileKeyboardViewOpen)}
        >
          {isMobileKeyboardViewOpen ? (
            <KeyboardIcon color="inherit" />
          ) : (
            <PenIcon color="inherit" />
          )}
        </IconButton>
      </Grid>
    </Toolbar>
  );
};

export default PickerToolbar;
