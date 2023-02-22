import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import useTabsList from '@mui/base/useTabsList';

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

  const { getRootProps, processChildren } = useTabsList({ ...props, ref });

  const processedChildren = processChildren();
  const children = React.Children.map(processedChildren, (child) => {
    return React.cloneElement(child, {
      indicator,
      textColor,
      fullWidth: variant === 'fullWidth',
    });
  });

  return (
    <FlexContainer {...other} {...getRootProps()}>
      {children}
    </FlexContainer>
  );
});

TabsList.propTypes = {
  indicator: PropTypes.node,
  textColor: PropTypes.oneOf(['primary', 'secondary']),
  variant: PropTypes.oneOf(['fullWidth', 'scrollable', 'standard']),
};

export default TabsList;
