import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import Popover, { PopoverProps as PopoverPropsType } from '@material-ui/core/Popover';
import { WrapperProps } from './Wrapper';
import { makeStyles } from '@material-ui/core/styles';
import { useKeyDown } from '../_shared/hooks/useKeyDown';
import { TextFieldProps } from '@material-ui/core/TextField';
import { DIALOG_WIDTH, DIALOG_WIDTH_WIDER } from '../constants/dimensions';

export const useStyles = makeStyles(
  {
    popoverPaper: {
      width: DIALOG_WIDTH,
      paddingBottom: 8,
    },
    popoverPaperWider: {
      width: DIALOG_WIDTH_WIDER,
    },
  },
  { name: 'MuiPickersInlineWrapper' }
);

export interface InlineWrapperProps<T = TextFieldProps> extends WrapperProps<T> {
  /** Popover props passed to material-ui Popover (with variant="inline") */
  PopoverProps?: Partial<PopoverPropsType>;
}

export const InlineWrapper: React.FC<InlineWrapperProps> = ({
  open,
  wider,
  children,
  PopoverProps,
  onClear,
  onDismiss,
  onSetToday,
  onAccept,
  showTabs,
  DateInputProps,
  InputComponent,
  ...other
}) => {
  const ref = React.useRef();
  const classes = useStyles();

  useKeyDown(open, {
    Enter: onAccept,
  });

  return (
    <React.Fragment>
      <InputComponent {...other} {...DateInputProps} inputRef={ref} />

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
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  PopoverProps: PropTypes.object,
} as any;

export default InlineWrapper;
