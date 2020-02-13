import * as React from 'react';
import { PickerView } from '../../Picker/Picker';
import { arrayIncludes } from '../../_helpers/utils';
import { MaterialUiPickersDate } from '../../typings/date';

export type PickerOnChangeFn = (date: MaterialUiPickersDate, isFinish?: boolean | symbol) => void;

export function useViews({
  views,
  openTo,
  onChange,
  isMobileKeyboardViewOpen,
  toggleMobileKeyboardView,
}: {
  views: PickerView[];
  openTo: PickerView;
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

  const nextView = views[views.indexOf(openView!) + 1];
  const openNext = React.useCallback(() => {
    if (nextView) {
      setOpenView(nextView);
    }
  }, [nextView, setOpenView]);

  const handleChangeAndOpenNext = React.useCallback(
    (date: MaterialUiPickersDate, isFinish?: boolean | symbol) => {
      // do not close picker if needs to show next view
      onChange(date, Boolean(nextView) ? false : isFinish);

      if (isFinish) {
        openNext();
      }
    },
    [nextView, onChange, openNext]
  );

  return {
    nextView,
    openNext,
    handleChangeAndOpenNext,
    openView,
    setOpenView,
  };
}
