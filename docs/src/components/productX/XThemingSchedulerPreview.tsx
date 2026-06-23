import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import { StandaloneCompactWeekView } from '@mui/x-scheduler/compact-week-view';
import type { SchedulerEvent, SchedulerResource } from '@mui/x-scheduler/models';

interface XThemingSchedulerPreviewProps {
  custom: boolean;
}

const schedulerPreviewEvents: SchedulerEvent[] = [
  {
    id: 'design-review',
    title: 'Design review',
    start: '2026-01-12T01:00:00Z',
    end: '2026-01-12T02:45:00Z',
    resource: 'design',
  },
  {
    id: 'pricing-sync',
    title: 'Pricing sync',
    start: '2026-01-13T02:00:00Z',
    end: '2026-01-13T03:30:00Z',
    resource: 'growth',
  },
  {
    id: 'migration-window',
    title: 'Migration window',
    start: '2026-01-14T01:30:00Z',
    end: '2026-01-14T04:00:00Z',
    resource: 'platform',
  },
  {
    id: 'launch-readout',
    title: 'Launch readout',
    start: '2026-01-15T02:30:00Z',
    end: '2026-01-15T04:30:00Z',
    resource: 'growth',
  },
];

const schedulerPreviewResources: SchedulerResource[] = [
  { id: 'design', title: 'Design', eventColor: 'blue' },
  { id: 'growth', title: 'Growth', eventColor: 'amber' },
  { id: 'platform', title: 'Platform', eventColor: 'teal' },
];

export default function XThemingSchedulerPreview({ custom }: XThemingSchedulerPreviewProps) {
  return (
    <Paper
      variant="outlined"
      sx={[
        {
          height: 418,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          borderColor: 'divider',
        },
        custom && {
          borderRadius: '16px',
          borderColor: alpha('#2563EB', 0.14),
          background: `linear-gradient(180deg, #FFFFFF 0%, ${alpha('#F8FAFC', 0.98)} 100%)`,
          boxShadow: `0 20px 44px ${alpha('#111827', 0.08)}, 0 1px 0 ${alpha(
            '#FFFFFF',
            0.86,
          )} inset`,
        },
      ]}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={[
          {
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            px: 2,
            py: 1.75,
            borderBottom: '1px solid',
            borderColor: 'divider',
          },
          custom && {
            py: 2,
            background: `linear-gradient(90deg, ${alpha('#EFF6FF', 0.78)} 0%, ${alpha(
              '#FFF7ED',
              0.6,
            )} 100%)`,
          },
        ]}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h3" variant="subtitle2" gutterBottom>
            Team schedule
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
            A compact Scheduler preview using the selected theme.
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={[
          {
            minHeight: 0,
            flex: 1,
            p: 2,
            bgcolor: 'background.default',
          },
          custom && {
            background: `radial-gradient(circle at 18% 10%, ${alpha(
              '#DBEAFE',
              0.9,
            )} 0, transparent 34%), linear-gradient(145deg, ${alpha(
              '#F8FAFC',
              0.96,
            )} 0%, ${alpha('#FFF7ED', 0.54)} 100%)`,
          },
        ]}
      >
        <StandaloneCompactWeekView
          events={schedulerPreviewEvents}
          resources={schedulerPreviewResources}
          defaultVisibleDate={new Date('2026-01-12T00:00:00Z')}
          defaultPreferences={{ ampm: false }}
          displayTimezone="UTC"
          showCurrentTimeIndicator={false}
          readOnly
          sx={[
            {
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              bgcolor: 'background.paper',
              overflow: 'hidden',
              '& .MuiEventCalendar-dayTimeGridHeaderCell': {
                minWidth: 58,
              },
              '& .MuiEventCalendar-dayTimeGridHeaderDayName': {
                color: 'text.secondary',
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
              },
              '& .MuiEventCalendar-dayTimeGridHeaderDayNumber': {
                fontWeight: 700,
              },
              '& .MuiEventCalendar-dayTimeGridTimeAxisText': {
                color: 'text.secondary',
                fontSize: 11,
              },
              '& .MuiEventCalendar-timeGridEventTitle': {
                fontWeight: 700,
              },
            },
            custom && {
              borderColor: alpha('#2563EB', 0.12),
              borderRadius: 3,
              background: alpha('#FFFFFF', 0.82),
              boxShadow: `0 16px 36px ${alpha('#0F172A', 0.08)}, inset 0 1px 0 ${alpha(
                '#FFFFFF',
                0.9,
              )}`,
              '& .MuiEventCalendar-dayTimeGridHeader': {
                background: `linear-gradient(180deg, ${alpha('#FFFFFF', 0.96)} 0%, ${alpha(
                  '#EFF6FF',
                  0.72,
                )} 100%)`,
              },
              '& .MuiEventCalendar-dayTimeGridHeaderCell, & .MuiEventCalendar-dayTimeGridTimeAxisCell, & .MuiEventCalendar-dayTimeGridColumn':
                {
                  borderColor: alpha('#2563EB', 0.08),
                },
              '& .MuiEventCalendar-timeGridEvent': {
                borderRadius: '10px',
                boxShadow: `0 8px 18px ${alpha('#0F172A', 0.16)}, inset 0 1px 0 ${alpha(
                  '#FFFFFF',
                  0.32,
                )}`,
              },
            },
          ]}
        />
      </Box>
    </Paper>
  );
}
