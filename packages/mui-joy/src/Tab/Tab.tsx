import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useTab } from '@mui/base/TabUnstyled';
import { useSlotProps } from '@mui/base/utils';
import { ListItemButtonRoot } from '../ListItemButton/ListItemButton';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getTabUtilityClass } from './tabClasses';
import { TabOwnerState, TabTypeMap } from './TabProps';
import RowListContext from '../List/RowListContext';

const useUtilityClasses = (ownerState: TabOwnerState) => {
  const { selected, disabled, focusVisible, variant, color } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      selected && 'selected',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getTabUtilityClass, {});
};

const TabRoot = styled(ListItemButtonRoot, {
  name: 'JoyTab',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TabOwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    justifyContent: 'center',
    flexGrow: 1,
    position: 'relative', // TODO: check if this can be in the ListItemButtonRoot
    ...(ownerState.selected && {
      boxShadow: theme.vars.shadow.sm,
      fontWeight: 'initial',
      ...(!variantStyle.backgroundColor && {
        backgroundColor: theme.vars.palette.background.body,
        '&:hover': {
          backgroundColor: theme.vars.palette.background.body,
        },
      }),
    }),
  };
});

const Tab = React.forwardRef(function Tab(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyTab',
  });

  const row = React.useContext(RowListContext);

  const {
    action,
    children,
    value: valueProp,
    disabled = false,
    onChange,
    onClick,
    onFocus,
    component = 'button',
    variant = 'plain',
    color = 'neutral',
    ...other
  } = props;

  const tabRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();
  const handleRef = useForkRef(tabRef, ref);

  const { active, focusVisible, setFocusVisible, selected, getRootProps } = useTab({
    ...props,
    ref: handleRef,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        tabRef.current!.focus();
      },
    }),
    [setFocusVisible],
  );

  const ownerState = {
    ...props,
    row,
    active,
    focusVisible,
    disabled,
    selected,
    variant,
    color,
  };

  const classes = useUtilityClasses(ownerState);

  const tabRootProps = useSlotProps({
    elementType: TabRoot,
    getSlotProps: getRootProps,
    externalSlotProps: {},
    externalForwardedProps: other,
    additionalProps: {
      ref,
      as: component,
    },
    ownerState,
    className: classes.root,
  });

  // @ts-ignore `onChange` is conflicted
  return <TabRoot {...tabRootProps}>{children}</TabRoot>;
}) as OverridableComponent<TabTypeMap>;

Tab.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Callback invoked when new value is being set.
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * You can provide your own value. Otherwise, we fall back to the child position index.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The variant to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Tab;
