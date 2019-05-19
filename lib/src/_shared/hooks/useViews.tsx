import * as React from 'react';
import { MaterialUiPickersDate } from '../..';
import { PickerView } from '../../Picker/Picker';

export function useViews(
  views: PickerView[],
  openTo: PickerView,
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void
) {
  const [openView, setOpenView] = React.useState(
    openTo && views.includes(openTo) ? openTo : views[0]
  );

  const getNextAvailableView = React.useCallback(
    (nextView: PickerView) => {
      if (views.includes(nextView)) {
        return nextView;
      }
      return views[views.indexOf(openView!) + 1];
    },
    [openView, views]
  );

  const handleChangeAndOpenNext = React.useCallback(
    (nextView: PickerView | null) => {
      return (date: MaterialUiPickersDate, isFinish?: boolean) => {
        const nextViewToOpen = nextView && getNextAvailableView(nextView);
        if (isFinish && nextViewToOpen) {
          // do not close picker if needs to show next view
          onChange(date, false);
          setOpenView(nextViewToOpen);
          return;
        }

        onChange(date, Boolean(isFinish));
      };
    },
    [getNextAvailableView, onChange]
  );

  return { handleChangeAndOpenNext, openView, setOpenView };
}
