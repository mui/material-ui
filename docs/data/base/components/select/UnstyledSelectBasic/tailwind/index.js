import * as React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@mui/base/Select';
import { Option as BaseOption } from '@mui/base/Option';
import { useTheme } from '@mui/system';
import clsx from 'clsx';

const getOptionColorClasses = ({ selected, highlighted, disabled }) => {
  let classes = '';
  if (disabled) {
    classes += 'text-slate-400 dark:text-slate-700';
  } else {
    if (selected) {
      classes +=
        ' bg-purple-100 dark:bg-purple-950 text-purple-950 dark:text-purple-50';
    } else if (highlighted) {
      classes +=
        ' bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-300';
    }
    classes +=
      ' hover:dark:bg-slate-800 hover:bg-slate-100 hover:dark:text-slate-300 hover:text-slate-900';
  }
  return classes;
};

const Option = React.forwardRef((props, ref) => {
  return (
    <BaseOption
      ref={ref}
      {...props}
      slotProps={{
        root: ({ selected, highlighted, disabled }) => ({
          className: `list-none p-2 rounded-lg cursor-default last-of-type:border-b-0 ${getOptionColorClasses(
            { selected, highlighted, disabled },
          )}`,
        }),
      }}
    />
  );
});

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledSelectBasic() {
  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <CustomSelect
        slotProps={{
          popper: { className: `${isDarkMode ? 'dark' : ''} z-10` },
        }}
        defaultValue={10}
      >
        <Option value={10}>Ten</Option>
        <Option value={20}>Twenty</Option>
        <Option value={30}>Thirty</Option>
      </CustomSelect>
    </div>
  );
}

const resolveSlotProps = (fn, args) => (typeof fn === 'function' ? fn(args) : fn);

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  return (
    <Select
      ref={ref}
      className={clsx('CustomSelect', props.className)}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `text-sm box-border w-80 px-3 py-2 rounded-lg text-left bg-white dark:bg-slate-800 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-700 outline-0 shadow shadow-slate-200 dark:shadow-slate-900 ${
                ownerState.focusVisible
                  ? 'border-purple-400 shadow-outline-purple'
                  : ''
              } ${
                ownerState.open ? 'after:content-["▴"]' : 'after:content-["▾"]'
              } after:float-right`,
              resolvedSlotProps?.className,
            ),
          };
        },
        listbox: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.listbox,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `text-sm font-sans p-1.5 my-3 w-80 rounded-xl overflow-auto outline-0 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 shadow shadow-slate-200 dark:shadow-slate-900`,
              resolvedSlotProps?.className,
            ),
          };
        },
        popper: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.popper,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(resolvedSlotProps?.className),
          };
        },
      }}
      {...props}
    />
  );
});

CustomSelect.propTypes = {
  className: PropTypes.string,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: PropTypes.shape({
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popper: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        anchorEl: PropTypes.oneOfType([
          function (props, propName) {
            if (props[propName] == null) {
              return new Error(
                "Prop '" + propName + "' is required but wasn't specified",
              );
            } else if (
              typeof props[propName] !== 'object' ||
              props[propName].nodeType !== 1
            ) {
              return new Error(
                "Expected prop '" + propName + "' to be of type Element",
              );
            }
          },
          PropTypes.func,
          PropTypes.shape({
            contextElement: function (props, propName) {
              if (props[propName] == null) {
                return null;
              } else if (
                typeof props[propName] !== 'object' ||
                props[propName].nodeType !== 1
              ) {
                return new Error(
                  "Expected prop '" + propName + "' to be of type Element",
                );
              }
            },
            getBoundingClientRect: PropTypes.func.isRequired,
          }),
        ]),
        children: PropTypes.oneOfType([
          PropTypes.element,
          PropTypes.func,
          PropTypes.number,
          PropTypes.shape({
            '__@iterator@62': PropTypes.func.isRequired,
          }),
          PropTypes.string,
          PropTypes.bool,
        ]),
        container: PropTypes.oneOfType([
          function (props, propName) {
            if (props[propName] == null) {
              return new Error(
                "Prop '" + propName + "' is required but wasn't specified",
              );
            } else if (
              typeof props[propName] !== 'object' ||
              props[propName].nodeType !== 1
            ) {
              return new Error(
                "Expected prop '" + propName + "' to be of type Element",
              );
            }
          },
          PropTypes.func,
        ]),
        direction: PropTypes.oneOf(['ltr', 'rtl']),
        disablePortal: PropTypes.bool,
        keepMounted: PropTypes.bool,
        modifiers: PropTypes.arrayOf(
          PropTypes.shape({
            data: PropTypes.object,
            effect: PropTypes.func,
            enabled: PropTypes.bool,
            fn: PropTypes.func,
            name: PropTypes.any,
            options: PropTypes.object,
            phase: PropTypes.oneOf([
              'afterMain',
              'afterRead',
              'afterWrite',
              'beforeMain',
              'beforeRead',
              'beforeWrite',
              'main',
              'read',
              'write',
            ]),
            requires: PropTypes.arrayOf(PropTypes.string),
            requiresIfExists: PropTypes.arrayOf(PropTypes.string),
          }),
        ),
        open: PropTypes.bool,
        placement: PropTypes.oneOf([
          'auto-end',
          'auto-start',
          'auto',
          'bottom-end',
          'bottom-start',
          'bottom',
          'left-end',
          'left-start',
          'left',
          'right-end',
          'right-start',
          'right',
          'top-end',
          'top-start',
          'top',
        ]),
        popperOptions: PropTypes.shape({
          modifiers: PropTypes.array,
          onFirstUpdate: PropTypes.func,
          placement: PropTypes.oneOf([
            'auto-end',
            'auto-start',
            'auto',
            'bottom-end',
            'bottom-start',
            'bottom',
            'left-end',
            'left-start',
            'left',
            'right-end',
            'right-start',
            'right',
            'top-end',
            'top-start',
            'top',
          ]),
          strategy: PropTypes.oneOf(['absolute', 'fixed']),
        }),
        popperRef: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.shape({
            current: PropTypes.object,
          }),
        ]),
        slotProps: PropTypes.shape({
          root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        }),
        slots: PropTypes.shape({
          root: PropTypes.elementType,
        }),
        transition: PropTypes.bool,
      }),
    ]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
};
