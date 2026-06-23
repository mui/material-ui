import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';
import { Frame } from '@mui/internal-core-docs/AppLayout';

const days = ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15'];
const times = ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM'];

const events = [
  { day: 0, row: 1, span: 2, title: 'Design review', detail: 'Room 204', color: 'primary' },
  { day: 1, row: 2, span: 2, title: 'Dispatch shift', detail: 'Ops team', color: 'success' },
  { day: 2, row: 1, span: 1, title: 'Client sync', detail: 'Video call', color: 'warning' },
  { day: 3, row: 3, span: 2, title: 'Maintenance', detail: 'Bay 4', color: 'info' },
] as const;

const code = `
<EventCalendar
  events={events}
  resources={resources}
  initialView="week"
  timezone="system"
/>`;

export default function XSchedulerDemo() {
  return (
    <Frame sx={{ height: '100%' }}>
      <Frame.Demo sx={{ p: 2 }}>
        <Paper
          variant="outlined"
          sx={(theme) => ({
            borderRadius: '8px',
            overflow: 'hidden',
            bgcolor: '#FFF',
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.900',
            }),
          })}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <div>
              <Typography variant="body2" sx={{ fontWeight: 'semiBold', color: 'text.primary' }}>
                Team schedule
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Resource planning
              </Typography>
            </div>
            <Chip label="Week" size="small" color="primary" variant="outlined" />
          </Box>
          <Box sx={{ overflow: 'auto' }}>
            <Box
              sx={{
                minWidth: 520,
                display: 'grid',
                gridTemplateColumns: '56px repeat(4, minmax(96px, 1fr))',
                gridTemplateRows: '36px repeat(5, 48px)',
              }}
            >
              <div />
              {days.map((day) => (
                <Box
                  key={day}
                  sx={{
                    px: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {day}
                  </Typography>
                </Box>
              ))}
              {times.map((time) => (
                <Box
                  key={time}
                  sx={{
                    px: 1,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="caption" sx={{ color: 'text.secondary', mt: -0.5 }}>
                    {time}
                  </Typography>
                </Box>
              ))}
              {times.flatMap((time, rowIndex) =>
                days.map((day, dayIndex) => (
                  <Box
                    key={`${day}-${time}`}
                    sx={{
                      gridColumn: dayIndex + 2,
                      gridRow: rowIndex + 2,
                      borderTop: '1px solid',
                      borderLeft: '1px solid',
                      borderColor: 'divider',
                    }}
                  />
                )),
              )}
              {events.map((event) => (
                <Box
                  key={event.title}
                  sx={(theme) => ({
                    gridColumn: event.day + 2,
                    gridRow: `${event.row + 2} / span ${event.span}`,
                    zIndex: 1,
                    m: 0.5,
                    p: 1,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: alpha(theme.palette[event.color].main, 0.28),
                    bgcolor: alpha(theme.palette[event.color].main, 0.12),
                    color: theme.palette[event.color].dark,
                    overflow: 'hidden',
                    ...theme.applyDarkStyles({
                      borderColor: alpha(theme.palette[event.color].light, 0.35),
                      bgcolor: alpha(theme.palette[event.color].main, 0.2),
                      color: theme.palette[event.color].light,
                    }),
                  })}
                >
                  <Typography variant="caption" sx={{ display: 'block', fontWeight: 'semiBold' }}>
                    {event.title}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>
                    {event.detail}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Frame.Demo>
      <Frame.Info data-mui-color-scheme="dark" sx={{ maxHeight: 300, overflow: 'auto' }}>
        <HighlightedCode copyButtonHidden plainStyle code={code} language="jsx" />
      </Frame.Info>
    </Frame>
  );
}
