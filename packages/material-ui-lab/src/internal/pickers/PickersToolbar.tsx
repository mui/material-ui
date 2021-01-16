import * as React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { MuiStyles, StyleRules, WithStyles, withStyles } from '@material-ui/core/styles';
import PenIcon from '../svg-icons/Pen';
import CalendarIcon from '../svg-icons/Calendar';
import { ToolbarComponentProps } from './typings/BasePicker';

export type PickersToolbarClassKey = 'root' | 'toolbarLandscape' | 'dateTitleContainer';

export const styles: MuiStyles<PickersToolbarClassKey> = (
  theme,
): StyleRules<PickersToolbarClassKey> => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 3),
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

export interface PickersToolbarProps
  extends Pick<
    ToolbarComponentProps,
    'getMobileKeyboardInputViewButtonText' | 'isMobileKeyboardViewOpen' | 'toggleMobileKeyboardView'
  > {
  className?: string;
  isLandscape: boolean;
  landscapeDirection?: 'row' | 'column';
  penIconClassName?: string;
  toolbarTitle: React.ReactNode;
}

function defaultGetKeyboardInputSwitchingButtonText(isKeyboardInputOpen: boolean) {
  return isKeyboardInputOpen
    ? 'text input view is open, go to calendar view'
    : 'calendar view is open, go to text input view';
}

const PickerToolbar: React.FC<PickersToolbarProps & WithStyles<typeof styles>> = (props) => {
  const {
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
  } = props;

  return (
    <div
      data-mui-test="picker-toolbar"
      className={clsx(classes.root, { [classes.toolbarLandscape]: isLandscape }, className)}
    >
      <Typography data-mui-test="picker-toolbar-title" color="textSecondary" variant="overline">
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
    </div>
  );
};

export default withStyles(styles, { name: 'MuiPickersToolbar' })(PickerToolbar);
