import { EventCalendar } from '@mui/x-scheduler/event-calendar';
import type { SchedulerEvent, SchedulerResource } from '@mui/x-scheduler/models';
import { EventTimelinePremium } from '@mui/x-scheduler-premium/event-timeline-premium';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';
import { Frame } from '@mui/internal-core-docs/AppLayout';

const events: SchedulerEvent[] = [
  {
    id: 'launch-plan',
    title: 'Launch plan',
    start: '2026-01-12T08:00:00Z',
    end: '2026-01-12T12:00:00Z',
    resource: 'product',
  },
  {
    id: 'fulfillment-window',
    title: 'Fulfillment window',
    start: '2026-01-12T13:00:00Z',
    end: '2026-01-14T10:00:00Z',
    resource: 'operations',
  },
  {
    id: 'customer-briefings',
    title: 'Customer briefings',
    start: '2026-01-13T09:00:00Z',
    end: '2026-01-15T15:00:00Z',
    resource: 'success',
  },
  {
    id: 'quality-review',
    title: 'Quality review',
    start: '2026-01-15T08:00:00Z',
    end: '2026-01-15T14:00:00Z',
    resource: 'operations',
  },
];

const resources: SchedulerResource[] = [
  { id: 'product', title: 'Product', eventColor: 'blue' },
  { id: 'operations', title: 'Operations', eventColor: 'teal' },
  { id: 'success', title: 'Success', eventColor: 'amber' },
];

const frameDemoSx = { p: 2, overflow: 'auto' };

const schedulerSx = {
  height: 360,
  minWidth: 520,
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 1,
  bgcolor: 'background.paper',
  overflow: 'hidden',
};

const eventCalendarCode = `
<EventCalendar
  events={events}
  resources={resources}
  defaultView="week"
  defaultVisibleDate={new Date('2026-01-12T00:00:00Z')}
  defaultPreferences={{ isSidePanelOpen: false }}
  displayTimezone="UTC"
  readOnly
/>`;

const eventTimelineCode = `
<EventTimelinePremium
  events={events}
  resources={resources}
  preset="dayAndWeek"
  defaultVisibleDate={new Date('2026-01-12T00:00:00Z')}
  displayTimezone="UTC"
  resourceColumnLabel="Team"
  readOnly
/>`;

export default function XEventCalendarDemo() {
  return (
    <Frame sx={{ height: '100%' }}>
      <Frame.Demo sx={frameDemoSx}>
        <EventCalendar
          events={events}
          resources={resources}
          defaultView="week"
          defaultVisibleDate={new Date('2026-01-12T00:00:00Z')}
          defaultPreferences={{ isSidePanelOpen: false }}
          displayTimezone="UTC"
          showCurrentTimeIndicator={false}
          readOnly
          sx={schedulerSx}
        />
      </Frame.Demo>
      <Frame.Info data-mui-color-scheme="dark" sx={{ maxHeight: 300, overflow: 'auto' }}>
        <HighlightedCode copyButtonHidden plainStyle code={eventCalendarCode} language="jsx" />
      </Frame.Info>
    </Frame>
  );
}

export function XEventTimelineDemo() {
  return (
    <Frame sx={{ height: '100%' }}>
      <Frame.Demo sx={frameDemoSx}>
        <EventTimelinePremium
          events={events}
          resources={resources}
          preset="dayAndWeek"
          defaultVisibleDate={new Date('2026-01-12T00:00:00Z')}
          displayTimezone="UTC"
          showCurrentTimeIndicator={false}
          resourceColumnLabel="Team"
          readOnly
          sx={schedulerSx}
        />
      </Frame.Demo>
      <Frame.Info data-mui-color-scheme="dark" sx={{ maxHeight: 300, overflow: 'auto' }}>
        <HighlightedCode copyButtonHidden plainStyle code={eventTimelineCode} language="jsx" />
      </Frame.Info>
    </Frame>
  );
}
