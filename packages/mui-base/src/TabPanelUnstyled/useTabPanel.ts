import { useTabContext, getPanelId, getTabId } from '../TabsUnstyled';

export interface UseTabPanelProps {
  /**
   * The value of the TabPanel. It will be shown when the Tab with the corresponding value is selected.
   */
  value: number | string;
}

const useTabPanel = (props: UseTabPanelProps) => {
  const { value } = props;

  const context = useTabContext();
  if (context === null) {
    throw new Error('No TabContext provided');
  }

  const hidden = value !== context.value;
  const id = getPanelId(context, value);
  const tabId = getTabId(context, value);

  const getRootProps = () => {
    return {
      'aria-labelledby': tabId,
      hidden,
      id,
    };
  };

  return {
    hidden,
    getRootProps,
  };
};

export default useTabPanel;
