import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import EventListener from 'react-event-listener';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import Popover, { PopoverProps as PopoverPropsType } from '@material-ui/core/Popover';
import { WrapperProps } from './Wrapper';
import { TextFieldProps } from '@material-ui/core/TextField';
import { DIALOG_WIDTH, DIALOG_WIDTH_WIDER } from '../constants/dimensions';

export interface InlineWrapperProps<T = TextFieldProps> extends WrapperProps<T> {
  /** Dialog props passed to material-ui Dialog */
  PopoverProps?: Partial<PopoverPropsType>;
  /** Show only calendar for datepicker in popover mode */
  onlyCalendar?: boolean;
}

export const styles = {
  popoverPaper: {
    width: DIALOG_WIDTH,
    paddingBottom: 8,
  },
  popoverPaperWider: {
    width: DIALOG_WIDTH_WIDER,
  },
};

const InlineWrapper: React.FC<InlineWrapperProps & WithStyles<typeof styles>> = ({
  open,
  wider,
  children,
  PopoverProps,
  onClear,
  onDismiss,
  onSetToday,
  onlyCalendar,
  classes,
  onAccept,
  DateInputProps,
  InputComponent,
  ...other
}) => {
  const ref = React.useRef();
  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          onAccept();
          break;
        default:
          return; // if key is not handled, stop execution
      }

      // if event was handled prevent other side effects
      event.preventDefault();
    },
    [onAccept]
  );

  return (
    <React.Fragment>
      {open && <EventListener target="window" onKeyDown={handleKeyDown} />}

      <InputComponent inputRef={ref} {...other} {...DateInputProps} />

      <Popover
        open={open}
        onClose={onAccept}
        anchorEl={ref.current}
        classes={{
          paper: clsx(classes.popoverPaper, { [classes.popoverPaperWider]: wider }),
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: true ? 'right' : 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: true ? 'right' : 'center',
        }}
        children={children}
        {...PopoverProps}
      />
    </React.Fragment>
  );
};

InlineWrapper.propTypes = {
  onlyCalendar: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  PopoverProps: PropTypes.object,
} as any;

InlineWrapper.defaultProps = {
  onlyCalendar: false,
};

export default withStyles(styles)(InlineWrapper);
