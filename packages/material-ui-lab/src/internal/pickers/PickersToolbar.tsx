import * as React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core/styles';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import { ExtendMui } from './typings/helpers';
import PenIcon from '../svg-icons/Pen';
import CalendarIcon from '../svg-icons/Calendar';
import { ToolbarComponentProps } from './typings/BasePicker';

export const styles = (theme: Theme) => {
  const toolbarBackground =
    theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.background.default;

  return createStyles({
    root: {
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
  });
};

export type PickersToolbarClassKey = keyof WithStyles<typeof styles>['classes'];

export interface PickersToolbarProps
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

const PickerToolbar: React.FC<PickersToolbarProps & WithStyles<typeof styles>> = ({
  children,
  classes,
  className,
  getMobileKeyboardInputViewButtonText = defaultGetKeyboardInputSwitchingButtonText,
  isLandscape,
  isMobileKeyboardViewOpen,
  landscapeDirection = 'column',
  penIconClassName,
  toggleMobileKeyboardView,
  toolbarTitle,
}) => {
  return (
    <Toolbar
      data-mui-test="picker-toolbar"
      className={clsx(classes.root, { [classes.toolbarLandscape]: isLandscape }, className)}
    >
      <Typography data-mui-test="picker-toolbar-title" color="inherit" variant="overline">
        {toolbarTitle}
      </Typography>
      <Grid
        container
        justifyContent="space-between"
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
            <CalendarIcon color="inherit" />
          ) : (
            <PenIcon color="inherit" />
          )}
        </IconButton>
      </Grid>
    </Toolbar>
  );
};

export default withStyles(styles, { name: 'MuiPickersToolbar' })(PickerToolbar);
