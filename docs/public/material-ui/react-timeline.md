---
productId: material-ui
title: React Timeline component
components: Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent
githubLabel: 'scope: timeline'
packageName: '@mui/lab'
---

# Timeline

The timeline displays a list of events in chronological order.

:::info
This component is not documented in the [Material Design guidelines](https://m2.material.io/), but it is available in Material UI.
:::

## Basic timeline

A basic timeline showing list of events.

```tsx
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function BasicTimeline() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
```

## Left-positioned timeline

The main content of the timeline can be positioned on the left side relative to the time axis.

```tsx
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function LeftPositionedTimeline() {
  return (
    <Timeline position="left">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Repeat</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
```

## Alternating timeline

The timeline can display the events on alternating sides.

```tsx
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function AlternateTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Repeat</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
```

## Reverse Alternating timeline

The timeline can display the events on alternating sides in reverse order.

```tsx
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function AlternateReverseTimeline() {
  return (
    <Timeline position="alternate-reverse">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Repeat</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
```

## Color

The `TimelineDot` can appear in different colors from theme palette.

```tsx
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function ColorsTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Secondary</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="success" />
        </TimelineSeparator>
        <TimelineContent>Success</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
```

## Outlined

```tsx
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function OutlinedTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" />
        </TimelineSeparator>
        <TimelineContent>Repeat</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
```

## Opposite content

The timeline can display content on opposite sides.

```tsx
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export default function OppositeContentTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          09:30 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          12:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          9:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Repeat</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
```

## Customization

Here is an example of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

```tsx
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';

export default function CustomizedTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          9:30 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Eat
          </Typography>
          <Typography>Because you need strength</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Code
          </Typography>
          <Typography>Because it&apos;s awesome!</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            <HotelIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Sleep
          </Typography>
          <Typography>Because you need rest</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          <TimelineDot color="secondary">
            <RepeatIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Repeat
          </Typography>
          <Typography>Because this is the life you love!</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
```

## Alignment

There are different ways in which a Timeline can be placed within the container.

You can do it by overriding the styles.

A Timeline centers itself in the container by default.

The demos below show how to adjust the relative width of the left and right sides of a Timeline:

### Left-aligned

```tsx
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

export default function LeftAlignedTimeline() {
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          09:30 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
```

### Right-aligned

```tsx
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export default function RightAlignedTimeline() {
  return (
    <Timeline
      sx={{
        [`& .${timelineContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          09:30 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
```

### Left-aligned with no opposite content

```tsx
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function NoOppositeContent() {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
```

# Timeline API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Timeline](https://mui.com/material-ui/react-timeline/)

## Import

```jsx
import Timeline from '@mui/lab/Timeline';
// or
import { Timeline } from '@mui/lab';
```

## Props

| Name      | Type                                                      | Default   | Required | Description                                                                             |
| --------- | --------------------------------------------------------- | --------- | -------- | --------------------------------------------------------------------------------------- |
| children  | `node`                                                    | -         | No       |                                                                                         |
| classes   | `object`                                                  | -         | No       | Override or extend the styles applied to the component.                                 |
| className | `string`                                                  | -         | No       |                                                                                         |
| position  | `'alternate-reverse' \| 'alternate' \| 'left' \| 'right'` | `'right'` | No       |                                                                                         |
| sx        | `Array<func \| object \| bool> \| func \| object`         | -         | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLUListElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiTimeline` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name                | Description                                                           |
| ------------ | ------------------------ | --------------------------------------------------------------------- |
| -            | positionAlternate        | Styles applied to the root element if `position="alternate"`.         |
| -            | positionAlternateReverse | Styles applied to the root element if `position="alternate-reverse"`. |
| -            | positionLeft             | Styles applied to the root element if `position="left"`.              |
| -            | positionRight            | Styles applied to the root element if `position="right"`.             |
| -            | root                     | Styles applied to the root element.                                   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-lab/src/Timeline/Timeline.tsx](https://github.com/mui/material-ui/tree/HEAD/packages/mui-lab/src/Timeline/Timeline.tsx)

# TimelineConnector API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Timeline](https://mui.com/material-ui/react-timeline/)

## Import

```jsx
import TimelineConnector from '@mui/lab/TimelineConnector';
// or
import { TimelineConnector } from '@mui/lab';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                            | -       | No       |                                                                                         |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLSpanElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiTimelineConnector` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                         |
| ------------ | --------- | ----------------------------------- |
| -            | root      | Styles applied to the root element. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-lab/src/TimelineConnector/TimelineConnector.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-lab/src/TimelineConnector/TimelineConnector.js)

# TimelineContent API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Timeline](https://mui.com/material-ui/react-timeline/)

## Import

```jsx
import TimelineContent from '@mui/lab/TimelineContent';
// or
import { TimelineContent } from '@mui/lab';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                            | -       | No       |                                                                                         |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Typography](https://mui.com/material-ui/api/typography/)).

## Inheritance

While not explicitly documented above, the props of the [Typography](https://mui.com/material-ui/api/typography/) component are also available on TimelineContent.

## Theme default props

You can use `MuiTimelineContent` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name                | Description                                                           |
| ------------ | ------------------------ | --------------------------------------------------------------------- |
| -            | positionAlternate        | Styles applied to the root element if `position="alternate"`.         |
| -            | positionAlternateReverse | Styles applied to the root element if `position="alternate-reverse"`. |
| -            | positionLeft             | Styles applied to the root element if `position="left"`.              |
| -            | positionRight            | Styles applied to the root element if `position="right"`.             |
| -            | root                     | Styles applied to the root element.                                   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-lab/src/TimelineContent/TimelineContent.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-lab/src/TimelineContent/TimelineContent.js)

# TimelineDot API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Timeline](https://mui.com/material-ui/react-timeline/)

## Import

```jsx
import TimelineDot from '@mui/lab/TimelineDot';
// or
import { TimelineDot } from '@mui/lab';
```

## Props

| Name     | Type                                                                                                       | Default    | Required | Description                                                                             |
| -------- | ---------------------------------------------------------------------------------------------------------- | ---------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                                                                                     | -          | No       |                                                                                         |
| classes  | `object`                                                                                                   | -          | No       | Override or extend the styles applied to the component.                                 |
| color    | `'error' \| 'grey' \| 'info' \| 'inherit' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| string` | `'grey'`   | No       |                                                                                         |
| sx       | `Array<func \| object \| bool> \| func \| object`                                                          | -          | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| variant  | `'filled' \| 'outlined' \| string`                                                                         | `'filled'` | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLSpanElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiTimelineDot` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name         | Description                                                                         |
| ------------ | ----------------- | ----------------------------------------------------------------------------------- |
| -            | filled            | Styles applied to the root element if `variant="filled"`.                           |
| -            | filledGrey        | Styles applied to the root element if `color="grey"` and `variant="filled"`.        |
| -            | filledPrimary     | Styles applied to the root element if `color="primary"` and `variant="filled"`.     |
| -            | filledSecondary   | Styles applied to the root element if `color="secondary"` and `variant="filled"`.   |
| -            | outlined          | Styles applied to the root element if `variant="outlined"`.                         |
| -            | outlinedGrey      | Styles applied to the root element if `color="grey"` and `variant="outlined"`.      |
| -            | outlinedPrimary   | Styles applied to the root element if `color="primary"` and `variant="outlined"`.   |
| -            | outlinedSecondary | Styles applied to the root element if `color="secondary"` and `variant="outlined"`. |
| -            | root              | Styles applied to the root element.                                                 |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-lab/src/TimelineDot/TimelineDot.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-lab/src/TimelineDot/TimelineDot.js)

# TimelineItem API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Timeline](https://mui.com/material-ui/react-timeline/)

## Import

```jsx
import TimelineItem from '@mui/lab/TimelineItem';
// or
import { TimelineItem } from '@mui/lab';
```

## Props

| Name     | Type                                                      | Default | Required | Description                                                                             |
| -------- | --------------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                                    | -       | No       |                                                                                         |
| classes  | `object`                                                  | -       | No       | Override or extend the styles applied to the component.                                 |
| position | `'alternate-reverse' \| 'alternate' \| 'left' \| 'right'` | -       | No       |                                                                                         |
| sx       | `Array<func \| object \| bool> \| func \| object`         | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLLIElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiTimelineItem` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name                | Description                                                                   |
| ------------ | ------------------------ | ----------------------------------------------------------------------------- |
| -            | missingOppositeContent   | Styles applied to the root element if TimelineOppositeContent isn't provided. |
| -            | positionAlternate        | Styles applied to the root element if `position="alternate"`.                 |
| -            | positionAlternateReverse | Styles applied to the root element if `position="alternate-reverse"`.         |
| -            | positionLeft             | Styles applied to the root element if `position="left"`.                      |
| -            | positionRight            | Styles applied to the root element if `position="right"`.                     |
| -            | root                     | Styles applied to the root element.                                           |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-lab/src/TimelineItem/TimelineItem.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-lab/src/TimelineItem/TimelineItem.js)

# TimelineOppositeContent API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Timeline](https://mui.com/material-ui/react-timeline/)

## Import

```jsx
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
// or
import { TimelineOppositeContent } from '@mui/lab';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                            | -       | No       |                                                                                         |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Typography](https://mui.com/material-ui/api/typography/)).

## Inheritance

While not explicitly documented above, the props of the [Typography](https://mui.com/material-ui/api/typography/) component are also available on TimelineOppositeContent.

## Theme default props

You can use `MuiTimelineOppositeContent` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name                | Description                                                           |
| ------------ | ------------------------ | --------------------------------------------------------------------- |
| -            | positionAlternate        | Styles applied to the root element if `position="alternate"`.         |
| -            | positionAlternateReverse | Styles applied to the root element if `position="alternate-reverse"`. |
| -            | positionLeft             | Styles applied to the root element if `position="left"`.              |
| -            | positionRight            | Styles applied to the root element if `position="right"`.             |
| -            | root                     | Styles applied to the root element.                                   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-lab/src/TimelineOppositeContent/TimelineOppositeContent.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-lab/src/TimelineOppositeContent/TimelineOppositeContent.js)

# TimelineSeparator API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Timeline](https://mui.com/material-ui/react-timeline/)

## Import

```jsx
import TimelineSeparator from '@mui/lab/TimelineSeparator';
// or
import { TimelineSeparator } from '@mui/lab';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                            | -       | No       |                                                                                         |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiTimelineSeparator` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                         |
| ------------ | --------- | ----------------------------------- |
| -            | root      | Styles applied to the root element. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-lab/src/TimelineSeparator/TimelineSeparator.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-lab/src/TimelineSeparator/TimelineSeparator.js)
