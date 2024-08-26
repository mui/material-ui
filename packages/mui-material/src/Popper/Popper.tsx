'use client';
import { SxProps } from '@mui/system';
import { useRtl } from '@mui/system/RtlProvider';
import refType from '@mui/utils/refType';
import HTMLElementType from '@mui/utils/HTMLElementType';
import PropTypes from 'prop-types';
import * as React from 'react';
import BasePopper from './BasePopper';
import { PopperProps as BasePopperProps } from './BasePopper.types';
import { Theme } from '../styles';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';

export interface PopperProps extends Omit<BasePopperProps, 'direction'> {
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType;
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  /**
   * The props used for each slot inside the Popper.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  componentsProps?: BasePopperProps['slotProps'];
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

const PopperRoot = styled(BasePopper, {
  name: 'MuiPopper',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({});

/**
 *
 * Demos:
 *
 * - [Autocomplete](https://next.mui.com/material-ui/react-autocomplete/)
 * - [Menu](https://next.mui.com/material-ui/react-menu/)
 * - [Popper](https://next.mui.com/material-ui/react-popper/)
 *
 * API:
 *
 * - [Popper API](https://next.mui.com/material-ui/api/popper/)
 */
const Popper = React.forwardRef(function Popper(
  inProps: PopperProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const isRtl = useRtl();
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiPopper',
  });

  const {
    anchorEl,
    component,
    components,
    componentsProps,
    container,
    disablePortal,
    keepMounted,
    modifiers,
    open,
    placement,
    popperOptions,
    popperRef,
    transition,
    slots,
    slotProps,
    ...other
  } = props;

  const RootComponent = slots?.root ?? components?.Root;
  const otherProps = {
    anchorEl,
    container,
    disablePortal,
    keepMounted,
    modifiers,
    open,
    placement,
    popperOptions,
    popperRef,
    transition,
    ...other,
  };
  return (
    <PopperRoot
      as={component}
      direction={isRtl ? 'rtl' : 'ltr'}
      slots={{ root: RootComponent }}
      slotProps={slotProps ?? componentsProps}
      {...otherProps}
      ref={ref}
    />
  );
}) as React.ForwardRefExoticComponent<PopperProps & React.RefAttributes<HTMLDivElement>>;

Popper.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * Popper render function or node.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Popper.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.func,
  ]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
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
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
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
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
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
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: refType,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: PropTypes.bool,
} as any;

export default Popper;
