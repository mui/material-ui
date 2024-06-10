'use client';
import * as React from 'react';
import { unstable_useId as useId, unstable_useForkRef as useForkRef } from '@mui/utils';
import { useTabsContext } from '../Tabs';
import { useCompoundItem } from '../useCompound';
import {
  UseTabPanelParameters,
  UseTabPanelReturnValue,
  UseTabPanelRootSlotProps,
} from './useTabPanel.types';

function tabPanelValueGenerator(otherTabPanelValues: Set<string | number>) {
  return otherTabPanelValues.size;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://next.mui.com/base-ui/react-tabs/#hooks)
 *
 * API:
 *
 * - [useTabPanel API](https://next.mui.com/base-ui/react-tabs/hooks-api/#use-tab-panel)
 */
function useTabPanel(parameters: UseTabPanelParameters): UseTabPanelReturnValue {
  const { value: valueParam, id: idParam, rootRef: externalRef } = parameters;

  const context = useTabsContext();
  if (context === null) {
    throw new Error('No TabContext provided');
  }

  const { value: selectedTabValue, getTabId } = context;

  const id = useId(idParam);
  const ref = React.useRef<HTMLElement>(null);
  const handleRef = useForkRef(ref, externalRef);
  const metadata = React.useMemo(() => ({ id, ref }), [id]);

  const { id: value } = useCompoundItem(valueParam ?? tabPanelValueGenerator, metadata);

  const hidden = value !== selectedTabValue;

  const correspondingTabId = value !== undefined ? getTabId(value) : undefined;

  const getRootProps = <ExternalProps extends Record<string, any> = {}>(
    externalProps: ExternalProps = {} as ExternalProps,
  ): UseTabPanelRootSlotProps<ExternalProps> => {
    return {
      'aria-labelledby': correspondingTabId ?? undefined,
      hidden,
      id: id ?? undefined,
      ...externalProps,
      ref: handleRef,
    };
  };

  return {
    hidden,
    getRootProps,
    rootRef: handleRef,
  };
}

export { useTabPanel };
