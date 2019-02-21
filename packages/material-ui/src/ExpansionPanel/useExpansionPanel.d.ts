import * as React from 'react';

interface ExpansionPanelContext<ChangeEvent> {
  disabled: boolean;
  expanded: boolean;
  onChange: (event: Event, expanded: boolean) => void;
}

export default function useExpansionPanel<
  ChangeEvent = React.SyntheticEvent
>(): ExpansionPanelContext<ChangeEvent>;
