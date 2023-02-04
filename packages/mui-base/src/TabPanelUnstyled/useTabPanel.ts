import { useTabContext, getPanelId, getTabId } from '../TabsUnstyled';
import { UseTabPanelParameters, UseTabPanelReturnValue } from './useTabPanel.types';
/**
 *
 * Demos:
 *
 * - [Unstyled Tabs](https://mui.com/base/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTabPanel API](https://mui.com/base/api/use-tab-panel/)
 */
function useTabPanel(parameters: UseTabPanelParameters):UseTabPanelReturnValue {
  const { value } = parameters;

  const context = useTabContext();
  if (context === null) {
    throw new Error('No TabContext provided');
  }

  const hidden = value !== context.value;
  const id = getPanelId(context, value);
  const tabId = getTabId(context, value);

  const getRootProps = () => {
    return {
      'aria-labelledby': tabId ?? undefined,
      hidden,
      id: id ?? undefined,
    };
  };

  return {
    hidden,
    getRootProps,
  };
}

export default useTabPanel;
