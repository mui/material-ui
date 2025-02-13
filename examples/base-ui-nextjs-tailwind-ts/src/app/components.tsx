'use client';
import * as React from 'react';
import clsx from 'clsx';
import {
  Select as BaseSelect,
  SelectProps,
  SelectOwnerState,
  SelectRootSlotProps,
} from '@mui/base/Select';
import { Option, OptionProps, OptionOwnerState } from '@mui/base/Option';
import { Slider as BaseSlider, SliderProps, SliderOwnerState } from '@mui/base/Slider';

const SelectButton = React.forwardRef(function SelectButton<
  TValue extends {},
  Multiple extends boolean,
>(props: SelectRootSlotProps<TValue, Multiple>, ref: React.ForwardedRef<HTMLButtonElement>) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-base absolute h-full top-0 right-1"
      >
        <path d="m7 10 5 5 5-5H7z" />
      </svg>
    </button>
  );
});

// the components exported from this file have function props which are non-serializable
// therefore they are additionally wrapped with 'use client' here
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#passing-props-from-server-to-client-components-serialization

export function SelectOption(props: OptionProps<string>) {
  const {
    slotProps = {
      root: {},
    },
    ...other
  } = props;
  return (
    <Option
      slotProps={{
        root: (ownerState: OptionOwnerState<string>) => ({
          ...slotProps.root,
          className: clsx(
            'list-none p-2 rounded-[1px] cursor-pointer last-of-type:border-b-0',
            ownerState.selected && 'bg-blue-100 text-blue-900',
            ownerState.highlighted && 'bg-gray-100 text-gray-900',
            ownerState.highlighted && ownerState.selected && 'bg-gray-700 text-gray-50',
            ownerState.disabled ? 'text-gray-400' : 'hover:bg-gray-100, hover:text-gray-300',
          ),
        }),
      }}
      {...other}
    />
  );
}

export const Select = React.forwardRef(function Select<TValue extends {}, Multiple extends boolean>(
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const {
    slotProps = {
      root: {},
      listbox: {},
      popper: {},
    },
    ...other
  } = props;
  return (
    <BaseSelect
      {...other}
      ref={ref}
      slots={{
        root: SelectButton,
        ...props.slots,
      }}
      slotProps={{
        root: (ownerState: SelectOwnerState<string, false>) => ({
          ...slotProps.root,
          className: clsx(
            'text-gray-300 text-sm box-border min-width-[72px] py-2 px-3 rounded-sm text-left leading-normal bg-gray-900 border-[0] font-medium relative hover:bg-gray-400 hover:text-gray-900',
            ownerState.focusVisible &&
              'border-blue-400 outline-[3px] outline-solid outline-blue-200',
          ),
        }),
        listbox: {
          ...slotProps.listbox,
          className:
            'text-sm box-border p-0 mb-3 rounded-sm overflow-auto outline-0 bg-[rgb(14,20,27)] border border-solid border-gray-700 text-gray-300 shadow-[0_1px_2px_#a0aab4] max-h-[240px]',
        },
        popper: {
          ...slotProps.popper,
          className: 'z-[1]',
        },
      }}
    />
  );
});

export const Slider = React.forwardRef(function Slider(
  props: SliderProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const {
    slotProps = {
      root: {},
      rail: {},
      track: {},
      thumb: {},
      mark: {},
      markLabel: {},
      valueLabel: {},
    },
    ...other
  } = props;
  return (
    <BaseSlider
      {...other}
      slotProps={{
        root: (ownerState: SliderOwnerState) => ({
          ...slotProps.root,
          className: clsx(
            'text-blue-500 h-1.5 w-full py-4 inline-block relative cursor-pointer touch-none top-[-1px] hover:opacity-100',
            ownerState.disabled && 'pointer-events-none cursor-default text-gray-300 opacity-50',
          ),
        }),
        rail: {
          ...slotProps.rail,
          className: 'block absolute w-full h-1.5 rounded-full bg-gray-700 opacity-40',
        },
        track: {
          ...slotProps.track,
          className: 'block absolute h-1.5 rounded-full bg-current',
        },
        thumb: {
          ...slotProps.thumb,
          className:
            'absolute w-5 h-5 ml-[-8px] mt-[-7.5px] box-border rounded-[50%] outline-0 bg-white',
          // TODO: add hover/focusVisible/active box-shadow
        },
        // TODO: where does markActive go?
        mark: {
          ...slotProps.mark,
          className: 'absolute w-1 h-1 rounded-sm bg-current top-2/4 opacity-0',
        },
        markLabel: {
          ...slotProps.markLabel,
          className:
            'text-[10px] font-extrabold uppercase text-gray-300 absolute top-5 mt-2 data-[index="1"]:translate-x-[-100%]',
        },
      }}
      ref={ref}
    />
  );
});
