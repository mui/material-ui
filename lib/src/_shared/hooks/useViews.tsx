import * as React from 'react';
import { arrayIncludes } from '../../_helpers/utils';
import { PickerSelectionState } from './usePickerState';

import { AnyPickerView } from '../../Picker/SharedPickerProps';

export type PickerOnChangeFn<TDate = unknown> = (
  date: TDate,
  selectionState?: PickerSelectionState
) => void;

export function useViews({
  views,
  openTo,
  onChange,
  isMobileKeyboardViewOpen,
  toggleMobileKeyboardView,
}: {
  views: AnyPickerView[];
  openTo: AnyPickerView;
  onChange: PickerOnChangeFn;
  isMobileKeyboardViewOpen: boolean;
  toggleMobileKeyboardView: () => void;
}) {
  const [openView, _setOpenView] = React.useState(
    openTo && arrayIncludes(views, openTo) ? openTo : views[0]
  );

  const setOpenView = React.useCallback(
    (...args: Parameters<typeof _setOpenView>) => {
      if (isMobileKeyboardViewOpen) {
        toggleMobileKeyboardView();
      }

      _setOpenView(...args);
    },
    [isMobileKeyboardViewOpen, toggleMobileKeyboardView]
  );

  const previousView = views[views.indexOf(openView!) - 1];
  const nextView = views[views.indexOf(openView!) + 1];

  const openNext = React.useCallback(() => {
    if (nextView) {
      setOpenView(nextView);
    }
  }, [nextView, setOpenView]);

  const handleChangeAndOpenNext = React.useCallback(
    (date: unknown, currentViewSelectionState?: PickerSelectionState) => {
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
    [nextView, onChange, openNext]
  );

  return {
    nextView,
    previousView,
    openNext,
    handleChangeAndOpenNext,
    openView,
    setOpenView,
  };
}
