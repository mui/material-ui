import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { RadioProps } from '../Radio/RadioProps';
import { SxProps } from '../styles/types';

export type RadioGroupSlot = 'root';

export interface RadioGroupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Class name applied to the root element.
     */
    className?: string;
    /**
     * The component used for the Root slot.
     * Either a string to use a HTML element or a component.
     */
    component?: React.ElementType;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: RadioProps['color'];
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue?: any;
    /**
     * The radio's `disabledIcon` prop. If specified, the value is passed down to every radios under this element.
     */
    disableIcon?: boolean;
    /**
     * The name used to reference the value of the control.
     * If you don't provide this prop, it falls back to a randomly generated name.
     */
    name?: string;
    /**
     * The radio's `overlay` prop. If specified, the value is passed down to every radios under this element.
     */
    overlay?: boolean;
    /**
     * Callback fired when a radio button is selected.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
     * You can pull out the new value by accessing `event.target.value` (string).
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * If `true`, flex direction is set to 'row'.
     * @default false
     */
    row?: boolean;
    /**
     * The size of the component.
     * @default 'md'
     */
    size?: RadioProps['size'];
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * Value of the selected radio button. The DOM API casts this to a string.
     */
    value?: any;
    /**
     * The variant to use.
     */
    variant?: RadioProps['variant'];
  };
  defaultComponent: D;
}

export type RadioGroupProps<
  D extends React.ElementType = RadioGroupTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<RadioGroupTypeMap<P, D>, D>;
