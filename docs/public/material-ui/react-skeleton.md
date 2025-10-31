---
productId: material-ui
title: React Skeleton component
components: Skeleton
githubLabel: 'scope: skeleton'
githubSource: packages/mui-material/src/Skeleton
---

# Skeleton

Display a placeholder preview of your content before the data gets loaded to reduce load-time frustration.

The data for your components might not be immediately available. You can improve the perceived responsiveness of the page by using skeletons. It feels like things are happening immediately, then the information is incrementally displayed on the screen (Cf. [Avoid The Spinner](https://www.lukew.com/ff/entry.asp?1797)).

## Usage

The component is designed to be used **directly in your components**.
For instance:

```jsx
{
  item ? (
    <img
      style={{
        width: 210,
        height: 118,
      }}
      alt={item.title}
      src={item.src}
    />
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
}
```

## Variants

The component supports 4 shape variants:

- `text` (default): represents a single line of text (you can adjust the height via font size).
- `circular`, `rectangular`, and `rounded`: come with different border radius to let you take control of the size.

```tsx
import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants() {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  );
}
```

## Animations

By default, the skeleton pulsates, but you can change the animation to a wave or disable it entirely.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
  return (
    <Box sx={{ width: 300 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
```

### Pulsate example

```tsx
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const data = [
  {
    src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
    title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
    channel: 'Don Diablo',
    views: '396k views',
    createdAt: 'a week ago',
  },
  {
    src: 'https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA',
    title: 'Queen - Greatest Hits',
    channel: 'Queen Official',
    views: '40M views',
    createdAt: '3 years ago',
  },
  {
    src: 'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
    title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
    channel: 'Calvin Harris',
    views: '130M views',
    createdAt: '10 months ago',
  },
];

interface MediaProps {
  loading?: boolean;
}

function Media(props: MediaProps) {
  const { loading = false } = props;

  return (
    <Grid container wrap="nowrap">
      {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          {item ? (
            <img
              style={{ width: 210, height: 118 }}
              alt={item.title}
              src={item.src}
            />
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
          {item ? (
            <Box sx={{ pr: 2 }}>
              <Typography gutterBottom variant="body2">
                {item.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: 'block', color: 'text.secondary' }}
              >
                {item.channel}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {`${item.views} • ${item.createdAt}`}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

export default function YouTube() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Media loading />
      <Media />
    </Box>
  );
}
```

### Wave example

```tsx
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

interface MediaProps {
  loading?: boolean;
}

function Media(props: MediaProps) {
  const { loading = false } = props;

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          ) : (
            <Avatar
              alt="Ted talk"
              src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            'Ted'
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            '5 hours ago'
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="140"
          image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
          alt="Nicola Sturgeon on a TED talk stage"
        />
      )}
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }}>
            {
              "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
            }
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default function Facebook() {
  return (
    <div>
      <Media loading />
      <Media />
    </div>
  );
}
```

## Inferring dimensions

In addition to accepting `width` and `height` props, the component can also infer the dimensions.

It works well when it comes to typography as its height is set using `em` units.

```jsx
<Typography variant="h1">{loading ? <Skeleton /> : 'h1'}</Typography>
```

```tsx
import * as React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const variants = [
  'h1',
  'h3',
  'body1',
  'caption',
] as readonly TypographyProps['variant'][];

function TypographyDemo(props: { loading?: boolean }) {
  const { loading = false } = props;

  return (
    <div>
      {variants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          {loading ? <Skeleton /> : variant}
        </Typography>
      ))}
    </div>
  );
}

export default function SkeletonTypography() {
  return (
    <Grid container spacing={8}>
      <Grid size="grow">
        <TypographyDemo loading />
      </Grid>
      <Grid size="grow">
        <TypographyDemo />
      </Grid>
    </Grid>
  );
}
```

But when it comes to other components, you may not want to repeat the width and
height. In these instances, you can pass `children` and it will
infer its width and height from them.

```jsx
loading ? (
  <Skeleton variant="circular">
    <Avatar />
  </Skeleton>
) : (
  <Avatar src={data.avatar} />
);
```

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const Image = styled('img')({
  width: '100%',
});

function SkeletonChildrenDemo(props: { loading?: boolean }) {
  const { loading = false } = props;

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ margin: 1 }}>
          {loading ? (
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          ) : (
            <Avatar src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
          )}
        </Box>
        <Box sx={{ width: '100%' }}>
          {loading ? (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            <Typography>Ted</Typography>
          )}
        </Box>
      </Box>
      {loading ? (
        <Skeleton variant="rectangular" width="100%">
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>
      ) : (
        <Image
          src="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
          alt=""
        />
      )}
    </div>
  );
}

export default function SkeletonChildren() {
  return (
    <Grid container spacing={8}>
      <Grid size="grow">
        <SkeletonChildrenDemo loading />
      </Grid>
      <Grid size="grow">
        <SkeletonChildrenDemo />
      </Grid>
    </Grid>
  );
}
```

## Color

The color of the component can be customized by changing its `background-color` CSS property.
This is especially useful when on a black background (as the skeleton will otherwise be invisible).

```tsx
import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function SkeletonColor() {
  return (
    <Box
      sx={{
        bgcolor: '#121212',
        p: 8,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={210}
        height={118}
      />
    </Box>
  );
}
```

## Accessibility

Skeleton screens provide an alternative to the traditional spinner method.
Rather than showing an abstract widget, skeleton screens create anticipation of what is to come and reduce cognitive load.

The background color of the skeleton uses the least amount of luminance to be visible in good conditions (good ambient light, good screen, no visual impairments).

### ARIA

None.

### Keyboard

The skeleton is not focusable.

# Skeleton API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Skeleton](https://mui.com/material-ui/react-skeleton/)

## Import

```jsx
import Skeleton from '@mui/material/Skeleton';
// or
import { Skeleton } from '@mui/material';
```

## Props

| Name      | Type                                                           | Default   | Required | Description                                                                             |
| --------- | -------------------------------------------------------------- | --------- | -------- | --------------------------------------------------------------------------------------- |
| animation | `'pulse' \| 'wave' \| false`                                   | `'pulse'` | No       |                                                                                         |
| children  | `node`                                                         | -         | No       |                                                                                         |
| classes   | `object`                                                       | -         | No       | Override or extend the styles applied to the component.                                 |
| component | `elementType`                                                  | -         | No       |                                                                                         |
| height    | `number \| string`                                             | -         | No       |                                                                                         |
| sx        | `Array<func \| object \| bool> \| func \| object`              | -         | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| variant   | `'circular' \| 'rectangular' \| 'rounded' \| 'text' \| string` | `'text'`  | No       |                                                                                         |
| width     | `number \| string`                                             | -         | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLSpanElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiSkeleton` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name    | Description                                                         |
| ------------ | ------------ | ------------------------------------------------------------------- |
| -            | circular     | Styles applied to the root element if `variant="circular"`.         |
| -            | fitContent   | Styles applied when the component is passed children and no width.  |
| -            | heightAuto   | Styles applied when the component is passed children and no height. |
| -            | pulse        | Styles applied to the root element if `animation="pulse"`.          |
| -            | rectangular  | Styles applied to the root element if `variant="rectangular"`.      |
| -            | root         | Styles applied to the root element.                                 |
| -            | rounded      | Styles applied to the root element if `variant="rounded"`.          |
| -            | text         | Styles applied to the root element if `variant="text"`.             |
| -            | wave         | Styles applied to the root element if `animation="wave"`.           |
| -            | withChildren | Styles applied when the component is passed children.               |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Skeleton/Skeleton.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Skeleton/Skeleton.js)
