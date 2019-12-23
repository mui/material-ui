import * as React from 'react';
import { PickerView } from '../../Picker/Picker';
import { arrayIncludes } from '../../_helpers/utils';
import { MaterialUiPickersDate } from '../../typings/date';

export function useViews(
  views: PickerView[],
  openTo: PickerView,
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void
) {
  const [openView, setOpenView] = React.useState(
    openTo && arrayIncludes(views, openTo) ? openTo : views[0]
  );

  const nextView = views[views.indexOf(openView!) + 1];
  const openNext = React.useCallback(() => {
    if (nextView) {
      setOpenView(nextView);
    }
  }, [nextView]);

  const handleChangeAndOpenNext = React.useCallback(
    (date: MaterialUiPickersDate, isFinish?: boolean) => {
      // do not close picker if needs to show next view
      onChange(date, Boolean(isFinish && !nextView));

      if (isFinish) {
        openNext();
      }
    },
    [nextView, onChange, openNext]
  );

  return { nextView, openNext, handleChangeAndOpenNext, openView, setOpenView };
}
