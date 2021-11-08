import * as React from 'react';
import PropTypes from 'prop-types';
import { isFragment } from 'react-is';
import TabListUnstyledProps from './TabListUNstyledProps';
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/components/tabs/)
 *
 * API:
 *
 * - [TabsListUnstyled API](https://mui.com/api/tabs-list-unstyled/)
 */
function TabsListUnstyled(props: TabListUnstyledProps) {
  const { children } = props;
  let childIndex = 0;

  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "MUI: The Tabs component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        const childValue = child.props.value === undefined ? childIndex : child.props.value;

        return React.cloneElement(child, {
          value: childValue,
        });
      })}
    </>
  );
}

TabsListUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The Tabs inside the TabList.
   */
  children: PropTypes.node,
} as any;

export default TabsListUnstyled;
