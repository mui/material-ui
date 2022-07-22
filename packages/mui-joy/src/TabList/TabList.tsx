import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useTabsList } from '@mui/base/TabsListUnstyled';
import { useSlotProps } from '@mui/base/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import List from '../List/List';
import { getTabListUtilityClass } from './tabListClasses';
import { TabListProps, TabListOwnerState, TabListTypeMap } from './TabListProps';

const useUtilityClasses = (ownerState: TabListOwnerState) => {
  const { orientation } = ownerState;

  const slots = {
    root: ['root', orientation],
  };

  return composeClasses(slots, getTabListUtilityClass, {});
};

const TabListRoot = styled(List, {
  name: 'JoyTabList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TabListProps }>(({ theme }) => ({
  '--List-radius': theme.vars.radius.md,
  '--List-gap': '8px',
  '--List-padding': 'var(--List-gap)',
  '--List-divider-gap': '0px',
}));

const TabList = React.forwardRef(function TabList(inProps, ref) {
  const props = useThemeProps<typeof inProps & TabListProps>({
    props: inProps,
    name: 'JoyTabList',
  });

  const {
    className,
    component = 'div',
    children,
    variant = 'soft',
    color = 'neutral',
    ...other
  } = props;

  const { isRtl, orientation, getRootProps, processChildren } = useTabsList({ ...props, ref });

  const ownerState = {
    ...props,
    isRtl,
    orientation,
    variant,
    color,
  };

  const classes = useUtilityClasses(ownerState);

  const tabsListRootProps = useSlotProps({
    elementType: TabListRoot,
    getSlotProps: getRootProps,
    externalSlotProps: {},
    externalForwardedProps: other,
    additionalProps: {
      component,
      row: orientation === 'horizontal',
      variant,
      color,
    },
    ownerState,
    className: classes.root,
  });

  const processedChildren = processChildren();

  return <TabListRoot {...tabsListRootProps}>{processedChildren}</TabListRoot>;
}) as OverridableComponent<TabListTypeMap>;

TabList.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the TabList if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
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
} as any;

export default TabList;
