import { UseButtonRootSlotProps } from '../ButtonUnstyled';


export interface UseMenuItemParameters {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<any>;
  ref: React.Ref<any>;
  label?: string;
}

export interface UseMenuItemReturnValue {
  getRootProps: (other?: Record<string, any>) => UseButtonRootSlotProps;
  disabled: boolean;
  focusVisible: boolean;
}