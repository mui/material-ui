import * as React from 'react';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';

import ViewQuiltRounded from '@material-ui/icons/ViewQuiltRounded';
import ViewModuleRounded from '@material-ui/icons/ViewModuleRounded';
import ViewAgendaRounded from '@material-ui/icons/ViewAgendaRounded';
import ViewWeekRounded from '@material-ui/icons/ViewWeekRounded';
import ViewSidebarRounded from '@material-ui/icons/ViewSidebarRounded';

const views = ['quilt', 'module', 'agenda', 'week', 'sidebar'] as const;

type View = typeof views[number];

const viewIcons: Record<View, React.ReactElement> = {
  quilt: <ViewQuiltRounded />,
  module: <ViewModuleRounded />,
  agenda: <ViewAgendaRounded />,
  week: <ViewWeekRounded />,
  sidebar: <ViewSidebarRounded />,
};

export default function ViewToggleButton() {
  const [view, setView] = React.useState<View>('quilt');
  return (
    <ToggleButtonGroup
      size="small"
      color="primary"
      value={view}
      exclusive
      onChange={(event, value) => setView(value)}
      aria-label="view"
    >
      {views.map((item) => (
        <ToggleButton key={item} value={item} aria-label={item}>
          {viewIcons[item]}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
