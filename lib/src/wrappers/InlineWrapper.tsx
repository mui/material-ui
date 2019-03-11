import Popover, { PopoverProps as PopoverPropsType } from '@material-ui/core/Popover';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { TextFieldProps } from '@material-ui/core/TextField';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import EventListener from 'react-event-listener';
import { WrapperProps } from '.';
import { DIALOG_WIDTH, DIALOG_WIDTH_WIDER } from '../constants/dimensions';

export interface InlineWrapperProps<T = TextFieldProps> extends WrapperProps<T> {
  /** On open callback */
  onOpen?: () => void;
  /** On close callback */
  onClose?: () => void;
  /** Dialog props passed to material-ui Dialog */
  PopoverProps?: Partial<PopoverPropsType>;
  /** Show only calendar for datepicker in popover mode */
  onlyCalendar?: boolean;
}

const InlineWrapper: React.FC<InlineWrapperProps & WithStyles<typeof styles>> = ({
  open,
  wider,
  children,
  onOpen,
  onClose,
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
        id="picker-popover"
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

export const styles = {
  popoverPaper: {
    width: DIALOG_WIDTH,
    paddingBottom: 8,
  },
  popoverPaperWider: {
    width: DIALOG_WIDTH_WIDER,
  },
};

export default withStyles(styles)(InlineWrapper);
