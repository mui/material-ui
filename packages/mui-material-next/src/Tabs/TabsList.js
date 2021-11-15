import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { useTabsList } from '@mui/base/TabsListUnstyled';

const FlexContainer = styled('div', {
  name: 'MuiTabs',
  slot: 'FlexContainer',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.flexContainer,
      ownerState.vertical && styles.flexContainerVertical,
      ownerState.centered && styles.centered,
    ];
  },
})(({ ownerState }) => ({
  display: 'flex',
  ...(ownerState.vertical && {
    flexDirection: 'column',
  }),
  ...(ownerState.centered && {
    justifyContent: 'center',
  }),
}));

/**
 * @ignore - internal component.
 */
const TabsList = React.forwardRef((props, ref) => {
  const { variant, indicator, textColor, ...other } = props;

  const { tabListRef, getRootProps, processChildren } = useTabsList(props);
  const handleRef = useForkRef(tabListRef, ref);

  const processedChildren = processChildren();
  const children = React.Children.map(processedChildren, (child) => {
    return React.cloneElement(child, {
      indicator,
      textColor,
      fullWidth: variant === 'fullWidth',
    });
  });

  return (
    <FlexContainer {...other} {...getRootProps()} ref={handleRef}>
      {children}
    </FlexContainer>
  );
});

TabsList.propTypes = {
  variant: PropTypes.oneOf(['fullWidth', 'scrollable', 'standard']),
  indicator: PropTypes.node,
  textColor: PropTypes.oneOf(['primary', 'secondary']),
};

export default TabsList;
