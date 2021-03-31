import * as React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { MuiStyles, StyleRules, WithStyles, withStyles } from '@material-ui/core/styles';
import PenIcon from '../svg-icons/Pen';
import CalendarIcon from '../svg-icons/Calendar';
import ClockIcon from '../svg-icons/Clock';
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

const getViewTypeIcon = (viewType: 'calendar' | 'clock') =>
  viewType === 'clock' ? <ClockIcon color="inherit" /> : <CalendarIcon color="inherit" />;

export interface PickersToolbarProps
  extends Pick<
    ToolbarComponentProps,
    'getMobileKeyboardInputViewButtonText' | 'isMobileKeyboardViewOpen' | 'toggleMobileKeyboardView'
  > {
  className?: string;
  viewType?: 'calendar' | 'clock';
  isLandscape: boolean;
  landscapeDirection?: 'row' | 'column';
  penIconClassName?: string;
  toolbarTitle: React.ReactNode;
}

function defaultGetKeyboardInputSwitchingButtonText(
  isKeyboardInputOpen: boolean,
  viewType: 'calendar' | 'clock',
) {
  return isKeyboardInputOpen
    ? `text input view is open, go to ${viewType} view`
    : `${viewType} view is open, go to text input view`;
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
    viewType = 'calendar',
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
          aria-label={getMobileKeyboardInputViewButtonText(isMobileKeyboardViewOpen, viewType)}
        >
          {isMobileKeyboardViewOpen ? getViewTypeIcon(viewType) : <PenIcon color="inherit" />}
        </IconButton>
      </Grid>
    </div>
  );
};

export default withStyles(styles, { name: 'MuiPickersToolbar' })(PickerToolbar);
