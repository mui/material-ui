import { useTabContext, getPanelId, getTabId } from '../TabsUnstyled';
import { UseTabPanelParameters } from './useTabPanel.types';

const useTabPanel = (parameters: UseTabPanelParameters) => {
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
};

export default useTabPanel;
