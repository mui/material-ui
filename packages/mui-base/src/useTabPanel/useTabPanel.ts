import { unstable_useId as useId } from '@mui/utils';
import { useTabsContext } from '../Tabs';
import { useCompoundItem } from '../utils/useCompoundItem';
import { UseTabPanelParameters, UseTabPanelReturnValue } from './useTabPanel.types';

function tabPanelValueGenerator(otherTabPanelValues: Set<string | number>) {
  return otherTabPanelValues.size;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/base/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTabPanel API](https://mui.com/base/react-tabs/hooks-api/#use-tab-panel)
 */
function useTabPanel(parameters: UseTabPanelParameters): UseTabPanelReturnValue {
  const { value: valueParam, id: idParam } = parameters;

  const context = useTabsContext();
  if (context === null) {
    throw new Error('No TabContext provided');
  }

  const { value: selectedTabValue, getTabId } = context;

  const id = useId(idParam);

  const { id: value } = useCompoundItem<string | number, string | undefined>(
    valueParam,
    id,
    tabPanelValueGenerator,
  );

  const hidden = value !== selectedTabValue;

  const correspondingTabId = value !== undefined ? getTabId(value) : undefined;

  const getRootProps = () => {
    return {
      'aria-labelledby': correspondingTabId ?? undefined,
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
