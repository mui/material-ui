import * as React from 'react';
import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewQuiltRounded from '@mui/icons-material/ViewQuiltRounded';
import ViewModuleRounded from '@mui/icons-material/ViewModuleRounded';
import ViewAgendaRounded from '@mui/icons-material/ViewAgendaRounded';
import ViewWeekRounded from '@mui/icons-material/ViewWeekRounded';
import ViewSidebarRounded from '@mui/icons-material/ViewSidebarRounded';

const views = ['quilt', 'module', 'agenda', 'week', 'sidebar'] as const;

type View = (typeof views)[number];

const viewIcons: Record<View, React.ReactElement<any>> = {
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
      sx={(theme) => ({
        bgcolor: '#fff',
        ...theme.applyDarkStyles({
          bgcolor: 'primaryDark.800',
        }),
      })}
    >
      {views.map((item) => (
        <ToggleButton
          key={item}
          value={item}
          aria-label={item}
          sx={[
            {
              color: 'grey.400',
              [`&.${toggleButtonClasses.selected}`]: {
                color: 'primary.500',
              },
            },
            (theme) =>
              theme.applyDarkStyles({
                color: '#fff',
                [`&.${toggleButtonClasses.selected}`]: {
                  color: 'primary.300',
                },
              }),
          ]}
        >
          {viewIcons[item]}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
