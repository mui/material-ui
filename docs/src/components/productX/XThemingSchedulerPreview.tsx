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

const customThemeTokens = {
  ink: '#101322',
  canvas: '#F8FAFF',
  surfaceTint: '#F2F6FF',
  accent: 'hsl(210, 100%, 45%)',
  accentLight: 'hsl(210, 100%, 90%)',
  accentBright: 'hsl(210, 100%, 60%)',
  accentDark: 'hsl(210, 100%, 30%)',
  violet: '#7C3AED',
  violetLight: '#EDE9FE',
};

const customGlassPanelSx = {
  position: 'relative',
  borderRadius: '16px',
  borderColor: alpha(customThemeTokens.accentBright, 0.3),
  background: `linear-gradient(135deg, ${alpha('#FFFFFF', 0.9)} 0%, ${alpha(
    '#FFFFFF',
    0.62,
  )} 100%), linear-gradient(145deg, ${alpha(customThemeTokens.accentLight, 0.56)} 0%, ${alpha(
    customThemeTokens.violetLight,
    0.48,
  )} 100%)`,
  backdropFilter: 'blur(18px) saturate(180%)',
  boxShadow: `0 0 0 1px ${alpha(customThemeTokens.accentBright, 0.14)}, 0 18px 44px ${alpha(
    customThemeTokens.accentDark,
    0.08,
  )}, 0 1px 0 ${alpha('#FFFFFF', 0.88)} inset, inset 0 0 0 1px ${alpha('#FFFFFF', 0.5)}`,
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -1,
    zIndex: 1,
    border: '1px solid transparent',
    borderRadius: 'inherit',
    pointerEvents: 'none',
    background: `linear-gradient(135deg, ${alpha(customThemeTokens.accentBright, 0.92)} 0%, ${alpha(
      '#FFFFFF',
      0.72,
    )} 28%, ${alpha(customThemeTokens.violet, 0.38)} 68%, ${alpha(
      customThemeTokens.accentBright,
      0.2,
    )} 100%) border-box`,
    WebkitMask: 'linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    boxShadow: `inset 0 0 22px ${alpha(customThemeTokens.accentBright, 0.1)}`,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
  '[data-mui-color-scheme="dark"] &': {
    color: '#F8FBFF',
    borderColor: alpha(customThemeTokens.accentBright, 0.72),
    background: `linear-gradient(135deg, ${alpha('#07122E', 0.86)} 0%, ${alpha(
      '#030712',
      0.76,
    )} 100%), radial-gradient(circle at 12% 0%, ${alpha(
      customThemeTokens.accentBright,
      0.28,
    )} 0, transparent 34%), radial-gradient(circle at 92% 12%, ${alpha(
      customThemeTokens.violet,
      0.24,
    )} 0, transparent 38%)`,
    boxShadow: `0 0 0 1px ${alpha(customThemeTokens.accentBright, 0.48)}, 0 0 24px ${alpha(
      customThemeTokens.accentBright,
      0.54,
    )}, 0 0 58px ${alpha(customThemeTokens.accent, 0.34)}, 0 26px 70px ${alpha(
      '#000000',
      0.52,
    )}, inset 0 1px 0 ${alpha('#FFFFFF', 0.18)}`,
    '&::before': {
      background: `linear-gradient(135deg, ${alpha(
        customThemeTokens.accentBright,
        1,
      )} 0%, ${alpha('#FFFFFF', 0.72)} 22%, ${alpha(customThemeTokens.violet, 0.58)} 62%, ${alpha(
        customThemeTokens.accentBright,
        0.28,
      )} 100%) border-box`,
    },
    '&::after': {
      boxShadow: `inset 0 0 34px ${alpha(customThemeTokens.accentBright, 0.24)}`,
    },
    '& .MuiTypography-root': {
      color: '#F8FBFF',
    },
    '& .MuiTypography-subtitle2': {
      color: '#F8FBFF',
    },
    '& .MuiTypography-body2': {
      color: alpha('#DDEBFF', 0.74),
    },
  },
};

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
        custom && customGlassPanelSx,
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
            background: `linear-gradient(90deg, ${alpha(
              customThemeTokens.accentLight,
              0.46,
            )} 0%, ${alpha('#FFFFFF', 0.42)} 52%, ${alpha(
              customThemeTokens.violetLight,
              0.4,
            )} 100%)`,
            '[data-mui-color-scheme="dark"] &': {
              borderColor: alpha(customThemeTokens.accentBright, 0.18),
              background: `linear-gradient(90deg, ${alpha(
                customThemeTokens.accent,
                0.16,
              )} 0%, ${alpha('#FFFFFF', 0.04)} 52%, ${alpha(customThemeTokens.violet, 0.12)} 100%)`,
            },
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
            background: `linear-gradient(145deg, ${alpha(
              customThemeTokens.surfaceTint,
              0.56,
            )} 0%, ${alpha('#FFFFFF', 0.88)} 58%, ${alpha(
              customThemeTokens.violetLight,
              0.38,
            )} 100%)`,
            '[data-mui-color-scheme="dark"] &': {
              background: `linear-gradient(145deg, ${alpha(
                '#081733',
                0.44,
              )} 0%, ${alpha('#020817', 0.42)} 58%, ${alpha(customThemeTokens.violet, 0.12)} 100%)`,
            },
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
              borderColor: alpha(customThemeTokens.accent, 0.14),
              borderRadius: 3,
              background: alpha('#FFFFFF', 0.62),
              backdropFilter: 'blur(14px) saturate(170%)',
              boxShadow: `0 16px 34px ${alpha(
                customThemeTokens.accentDark,
                0.08,
              )}, inset 0 1px 0 ${alpha('#FFFFFF', 0.9)}`,
              '& .MuiEventCalendar-dayTimeGridHeader': {
                background: `linear-gradient(180deg, ${alpha('#FFFFFF', 0.96)} 0%, ${alpha(
                  customThemeTokens.surfaceTint,
                  0.72,
                )} 100%)`,
              },
              '& .MuiEventCalendar-dayTimeGridHeaderCell, & .MuiEventCalendar-dayTimeGridTimeAxisCell, & .MuiEventCalendar-dayTimeGridColumn':
                {
                  borderColor: alpha(customThemeTokens.accent, 0.08),
                },
              '& .MuiEventCalendar-timeGridEvent': {
                borderRadius: '10px',
                boxShadow: `0 8px 18px ${alpha(
                  customThemeTokens.ink,
                  0.14,
                )}, inset 0 1px 0 ${alpha('#FFFFFF', 0.32)}`,
              },
              '[data-mui-color-scheme="dark"] &': {
                color: '#F8FBFF',
                borderColor: alpha(customThemeTokens.accentBright, 0.26),
                background: alpha('#07122E', 0.58),
                boxShadow: `0 0 22px ${alpha(
                  customThemeTokens.accentBright,
                  0.18,
                )}, inset 0 1px 0 ${alpha('#FFFFFF', 0.14)}`,
                '& .MuiEventCalendar-dayTimeGridHeader': {
                  background: `linear-gradient(180deg, ${alpha(
                    customThemeTokens.accent,
                    0.18,
                  )} 0%, ${alpha('#061226', 0.62)} 100%)`,
                  borderColor: alpha(customThemeTokens.accentBright, 0.1),
                },
                '& .MuiEventCalendar-dayTimeGridHeaderDayName, & .MuiEventCalendar-dayTimeGridTimeAxisText':
                  {
                    color: alpha('#DDEBFF', 0.72),
                  },
                '& .MuiEventCalendar-dayTimeGridHeaderDayNumber': {
                  color: '#F8FBFF',
                },
                '& .MuiEventCalendar-dayTimeGridHeaderCell, & .MuiEventCalendar-dayTimeGridTimeAxisCell, & .MuiEventCalendar-dayTimeGridColumn':
                  {
                    borderColor: alpha(customThemeTokens.accentBright, 0.09),
                  },
                '& .MuiEventCalendar-dayTimeGridAllDayEventsGrid': {
                  borderBlockEnd: `1px solid ${alpha(customThemeTokens.accentBright, 0.1)}`,
                },
                '& .MuiEventCalendar-dayTimeGridAllDayEventsRow > *': {
                  borderInlineStart: `1px solid ${alpha(customThemeTokens.accentBright, 0.09)}`,
                },
                '& .MuiEventCalendar-dayTimeGridAllDayEventsCell': {
                  color: '#F8FBFF',
                  borderColor: alpha(customThemeTokens.accentBright, 0.09),
                  background: `linear-gradient(180deg, ${alpha(
                    '#071D46',
                    0.74,
                  )} 0%, ${alpha('#061226', 0.62)} 100%)`,
                },
                '& .MuiEventCalendar-dayTimeGridColumn': {
                  background: alpha('#061226', 0.26),
                },
                '& .MuiEventCalendar-dayTimeGridTimeAxisCell:not(:first-of-type)::after': {
                  borderBlockEnd: `1px solid ${alpha(customThemeTokens.accentBright, 0.12)}`,
                },
                '& .MuiEventCalendar-timeGridEvent': {
                  color: '#F8FBFF',
                  borderColor: alpha('#FFFFFF', 0.28),
                  boxShadow: `0 0 18px ${alpha(
                    customThemeTokens.accentBright,
                    0.2,
                  )}, inset 0 1px 0 ${alpha('#FFFFFF', 0.28)}`,
                },
                '& .MuiEventCalendar-timeGridEvent[data-palette="blue"]': {
                  background: `linear-gradient(135deg, ${alpha(
                    customThemeTokens.accentBright,
                    0.58,
                  )} 0%, ${alpha(customThemeTokens.accent, 0.52)} 44%, ${alpha(
                    '#07122E',
                    0.94,
                  )} 100%)`,
                },
                '& .MuiEventCalendar-timeGridEvent[data-palette="amber"]': {
                  background: `linear-gradient(135deg, ${alpha('#F59E0B', 0.72)} 0%, ${alpha(
                    customThemeTokens.violet,
                    0.56,
                  )} 48%, ${alpha('#07122E', 0.94)} 100%)`,
                },
                '& .MuiEventCalendar-timeGridEvent[data-palette="teal"]': {
                  background: `linear-gradient(135deg, ${alpha('#22D3EE', 0.58)} 0%, ${alpha(
                    customThemeTokens.accent,
                    0.48,
                  )} 46%, ${alpha('#07122E', 0.94)} 100%)`,
                },
              },
            },
          ]}
        />
      </Box>
    </Paper>
  );
}
