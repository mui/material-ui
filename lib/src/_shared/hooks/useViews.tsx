import * as React from 'react';
import { MaterialUiPickersDate } from '../..';
import { PickerView } from '../../Picker/Picker';
import { arrayIncludes } from '../../_helpers/utils';

export function useViews(
  views: PickerView[],
  openTo: PickerView,
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void
) {
  const [openView, setOpenView] = React.useState(
    openTo && arrayIncludes(views, openTo) ? openTo : views[0]
  );

  const handleChangeAndOpenNext = React.useCallback(
    (date: MaterialUiPickersDate, isFinish?: boolean) => {
      const nextViewToOpen = views[views.indexOf(openView!) + 1];
      if (isFinish && nextViewToOpen) {
        // do not close picker if needs to show next view
        onChange(date, false);
        setOpenView(nextViewToOpen);
        return;
      }

      onChange(date, Boolean(isFinish));
    },
    [onChange, openView, views]
  );

  return { handleChangeAndOpenNext, openView, setOpenView };
}
