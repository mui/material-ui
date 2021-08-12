import * as React from 'react';
import ThemeProvider from 'docs/src/modules/ThemeContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import Stack from '@material-ui/core/Stack';
import PlayerCard from 'docs/src/pages/components/cards/PlayerCard';
import TaskCard from 'docs/src/pages/components/cards/TaskCard';
import NotificationCard from 'docs/src/pages/components/cards/NotificationCard';
import ThemeChip from 'docs/src/pages/components/chips/ThemeChip';
import ThemeDatePicker from 'docs/src/pages/components/date-picker/ThemeDatePicker';
import ThemeSlider from 'docs/src/pages/components/slider/ThemeSlider';
import FolderTable from 'docs/src/pages/components/tables/FolderTable';
import ThemeTabs from 'docs/src/pages/components/tabs/ThemeTabs';
import ThemeTimeline from 'docs/src/pages/components/timeline/ThemeTimeline';
import ThemeToggleButton from 'docs/src/pages/components/toggle-button/ThemeToggleButton';
import ViewToggleButton from 'docs/src/pages/components/toggle-button/ViewToggleButton';
import ThemeSwitch from 'docs/src/pages/components/switches/ThemeSwitch';
import ThemeAccordion from 'docs/src/pages/components/accordion/ThemeAccordion';
import AppHeader from 'docs/src/layouts/AppHeader';

export default function ComponentsPage() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AppHeader />
      <Stack
        spacing={4}
        sx={{
          maxWidth: 500,
          mx: 'auto',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : '#fff'),
          p: 2,
        }}
      >
        <ThemeAccordion />
        <ThemeToggleButton />
        <ThemeSwitch />
        <TaskCard />
        <PlayerCard />
        <NotificationCard />
        <ThemeChip />
        <ThemeDatePicker />
        <ThemeSlider />
        <FolderTable />
        <ThemeTabs />
        <ThemeTimeline />
        <ViewToggleButton />
      </Stack>
    </ThemeProvider>
  );
}
