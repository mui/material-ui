import * as React from 'react';
import * as PropTypes from 'prop-types';
import Popover, { PopoverProps as PopoverPropsType } from '@material-ui/core/Popover';
import { WrapperProps } from './Wrapper';
import { TextFieldProps } from '@material-ui/core/TextField';
import { useKeyDownHandler } from '../_shared/hooks/useKeyDown';

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
  const handleKeydown = useKeyDownHandler(open, {
    13: onAccept, // Enter
  });

  return (
    <React.Fragment>
      <InputComponent {...other} {...DateInputProps} inputRef={ref} />

      <Popover
        open={open}
        onClose={onDismiss}
        anchorEl={ref.current}
        onEscapeKeyDown={handleKeydown}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
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
