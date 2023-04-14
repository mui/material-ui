import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import useTabsList, { TabsListProvider } from '@mui/base/useTabsList';
import TabsListContext from './TabsListContext';

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
  const { variant, indicator, textColor, children, ...other } = props;

  const { getRootProps, contextValue } = useTabsList({ ...props, ref });

  const tabsListContextValue = React.useMemo(
    () => ({
      indicator,
      textColor,
      fullWidth: variant === 'fullWidth',
    }),
    [indicator, textColor, variant],
  );

  return (
    <TabsListProvider value={contextValue}>
      <TabsListContext.Provider value={tabsListContextValue}>
        <FlexContainer {...other} {...getRootProps()}>
          {children}
        </FlexContainer>
      </TabsListContext.Provider>
    </TabsListProvider>
  );
});

TabsList.propTypes = {
  children: PropTypes.node,
  indicator: PropTypes.node,
  textColor: PropTypes.oneOf(['primary', 'secondary']),
  variant: PropTypes.oneOf(['fullWidth', 'scrollable', 'standard']),
};

export default TabsList;
