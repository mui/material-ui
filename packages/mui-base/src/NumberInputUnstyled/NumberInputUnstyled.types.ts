import { OverrideProps, Simplify } from '@mui/types';
import { UseNumberInputParameters } from './useNumberInput.types';
import { SlotComponentProps } from '../utils';

export interface NumberInputUnstyledComponentsPropsOverrides {}

export type NumberInputUnstyledOwnProps = {} & Omit<UseNumberInputParameters, 'error'> & {
    /**
     * The id of the `input` element.
     */
    id?: string;
    /**
     * The props used for each slot inside the Input.
     * @default {}
     */
    slotProps?: {
      input?: SlotComponentProps<
        'input',
        NumberInputUnstyledComponentsPropsOverrides,
        NumberInputUnstyledOwnerState
      >;
    };
    /**
     * The components used for each slot inside the InputBase.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: {
      // root?: React.ElementType;
      input?: React.ElementType;
    };
  };

export interface NumberInputUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & NumberInputUnstyledOwnProps;
  defaultComponent: D;
}

export type NumberInputUnstyledProps<
  D extends React.ElementType = NumberInputUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<NumberInputUnstyledTypeMap<P, D>, D> & {
  component?: D;
};

export type NumberInputUnstyledOwnerState = Simplify<
  Omit<NumberInputUnstyledProps, 'component' | 'slots' | 'slotProps'> & {
    // formControlContext: FormControlUnstyledState | undefined;
    // focused: boolean;
    type: React.InputHTMLAttributes<HTMLInputElement>['type'] | undefined;
  }
>;
