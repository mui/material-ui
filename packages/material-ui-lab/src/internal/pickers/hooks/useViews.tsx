import * as React from 'react';
import { useControlled } from '@material-ui/core/utils';
import { arrayIncludes } from '../utils';
import { PickerSelectionState } from './usePickerState';
import { AllAvailableViews } from '../typings/Views';

export type PickerOnChangeFn<TDate> = (
  date: TDate | null,
  selectionState?: PickerSelectionState,
) => void;

interface UseViewsOptions<TDate, TView extends AllAvailableViews> {
  onChange: PickerOnChangeFn<TDate>;
  views: TView[];
  view: TView | undefined;
  openTo?: TView;
  onViewChange?: (newView: TView) => void;
}

export function useViews<TDate, TView extends AllAvailableViews>({
  view,
  views,
  openTo,
  onChange,
  onViewChange,
}: UseViewsOptions<TDate, TView>) {
  const [openView, setOpenView] = useControlled<TView>({
    name: 'Picker',
    state: 'view',
    controlled: view,
    default: openTo && arrayIncludes(views, openTo) ? openTo : views[0],
  });

  const previousView: TView | null = views[views.indexOf(openView) - 1] ?? null;
  const nextView: TView | null = views[views.indexOf(openView) + 1] ?? null;

  const changeView = React.useCallback(
    (newView: TView) => {
      setOpenView(newView);

      if (onViewChange) {
        onViewChange(newView);
      }
    },
    [setOpenView, onViewChange],
  );

  const openNext = React.useCallback(() => {
    if (nextView) {
      changeView(nextView);
    }
  }, [nextView, changeView]);

  const handleChangeAndOpenNext = React.useCallback(
    (date: TDate, currentViewSelectionState?: PickerSelectionState) => {
      const isSelectionFinishedOnCurrentView = currentViewSelectionState === 'finish';
      const globalSelectionState =
        isSelectionFinishedOnCurrentView && Boolean(nextView)
          ? 'partial'
          : currentViewSelectionState;

      onChange(date, globalSelectionState);
      if (isSelectionFinishedOnCurrentView) {
        openNext();
      }
    },
    [nextView, onChange, openNext],
  );

  return {
    nextView,
    previousView,
    openNext,
    handleChangeAndOpenNext,
    openView,
    setOpenView: changeView,
  };
}
