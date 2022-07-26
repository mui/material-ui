import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useTabPanel } from '@mui/base/TabPanelUnstyled';
import { useSlotProps } from '@mui/base/utils';
import { SheetRoot } from '../Sheet/Sheet';
import { styled, useThemeProps } from '../styles';
import SizeTabsContext from '../Tabs/SizeTabsContext';
import { getTabPanelUtilityClass } from './tabPanelClasses';
import { TabPanelOwnerState, TabPanelTypeMap } from './TabPanelProps';

const useUtilityClasses = (ownerState: TabPanelOwnerState) => {
  const { hidden, variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      hidden && 'hidden',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getTabPanelUtilityClass, {});
};

const TabPanelRoot = styled(SheetRoot, {
  name: 'JoyTabPanel',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TabPanelOwnerState }>(({ theme, ownerState }) => ({
  padding: 'var(--Tabs-gap)',
  ...(ownerState.size === 'sm' && {
    fontSize: theme.vars.fontSize.sm,
  }),
  ...(ownerState.size === 'md' && {
    fontSize: theme.vars.fontSize.md,
  }),
  ...(ownerState.size === 'lg' && {
    fontSize: theme.vars.fontSize.lg,
  }),
}));

const TabPanel = React.forwardRef(function TabPanel(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyTabPanel',
  });
  const tabsSize = React.useContext(SizeTabsContext);

  const {
    children,
    value,
    component,
    color = 'neutral',
    variant = 'plain',
    size: sizeProp,
    ...other
  } = props;

  const { hidden, getRootProps } = useTabPanel(props);

  const size = sizeProp ?? tabsSize;

  const ownerState = {
    ...props,
    hidden,
    color,
    variant,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const tabPanelRootProps = useSlotProps({
    elementType: TabPanelRoot,
    getSlotProps: getRootProps,
    externalSlotProps: {},
    externalForwardedProps: other,
    additionalProps: {
      role: 'tabpanel',
      ref,
      as: component,
    },
    ownerState,
    className: classes.root,
  });

  return <TabPanelRoot {...tabPanelRootProps}>{!hidden && children}</TabPanelRoot>;
}) as OverridableComponent<TabPanelTypeMap>;

TabPanel.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * The variant to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default TabPanel;
