# Container queries

Material UI provides a utility function for creating CSS container queries based on theme breakpoints.

## Usage

To create [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries), use `theme.containerQueries` with any method available in the [`theme.breakpoints`](/material-ui/customization/breakpoints/#api).
The value can be unitless (in which case it'll be rendered in pixels), a string, or a breakpoint key. For example:

```js
theme.containerQueries.up('sm'); // => '@container (min-width: 600px)'
```

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ResizableDemo from './ResizableDemo';

const DynamicCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.containerQueries.up(350)]: {
    flexDirection: 'row',
  },
}));

const Image = styled('img')(({ theme }) => ({
  alignSelf: 'stretch',
  aspectRatio: '16 / 9',
  objectFit: 'cover',
  width: '100%',
  maxHeight: 160,
  transition: '0.4s',
  [theme.containerQueries.up(350)]: {
    maxWidth: '36%',
    maxHeight: 'initial',
  },
  [theme.containerQueries.up(500)]: {
    maxWidth: 240,
  },
}));

const Content = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  flex: 'auto',
  transition: 'padding 0.4s',
  [theme.containerQueries.up(500)]: {
    padding: theme.spacing(3),
  },
}));

export default function BasicContainerQueries() {
  return (
    <ResizableDemo>
      <Box
        sx={{
          overflow: 'auto',
          resize: 'horizontal',
          width: 400,
          maxWidth: 'min(80vw, 600px)',
          containerType: 'inline-size', // required for container queries
        }}
      >
        <DynamicCard variant="outlined">
          <Image
            alt="The house from the offer."
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
          />
          <Content>
            <div>
              <Typography
                component="div"
                sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
              >
                123 Main St, Phoenix AZ
              </Typography>
              <Typography
                component="div"
                sx={{
                  color: 'primary.main',
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                }}
              >
                $280,000 — $310,000
              </Typography>
            </div>
            <Chip
              size="small"
              label="Confidence score: 85%"
              sx={{ p: 0, width: 'fit-content' }}
            />
          </Content>
        </DynamicCard>
      </Box>
    </ResizableDemo>
  );
}
```

:::info
One of the ancestors must have the CSS container type specified.
:::

### Named containment contexts

To refer to a [containment context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries#naming_containment_contexts), call the `containerQueries` method with the name of the container for access to all breakpoint methods:

```js
theme.containerQueries('sidebar').up('500px'); // => '@container sidebar (min-width: 500px)'
```

## Shorthand syntax

When adding styles using the `sx` prop, use the `@<size>` or `@<size>/<name>` notation to apply container queries without referring to the theme.

- `<size>`: a width or a breakpoint key.
- `<name>` (optional): a named containment context.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ResizableDemo from './ResizableDemo';

export default function SxPropContainerQueries() {
  return (
    <ResizableDemo>
      <Box
        sx={{
          overflow: 'auto',
          resize: 'horizontal',
          width: 400,
          maxWidth: 'min(80vw, 600px)',
          containerType: 'inline-size', // required for container queries
        }}
      >
        <Card
          variant="outlined"
          sx={{
            display: 'flex',
            flexDirection: {
              '@': 'column',
              '@350': 'row',
            },
          }}
        >
          <Box
            component="img"
            alt="The house from the offer."
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            sx={{
              alignSelf: 'stretch',
              aspectRatio: '16 / 9',
              objectFit: 'cover',
              width: '100%',
              maxHeight: {
                '@': 160,
                '@350': 'initial',
              },
              maxWidth: {
                '@350': '36%',
                '@500': 240,
              },
              transition: '0.4s',
            }}
          />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              padding: {
                '@': 2,
                '@500': 3,
              },
              flex: 'auto',
              transition: 'padding 0.4s',
            }}
          >
            <div>
              <Typography
                component="div"
                sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
              >
                123 Main St, Phoenix AZ
              </Typography>
              <Typography
                component="div"
                sx={{
                  color: 'primary.main',
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                }}
              >
                $280,000 — $310,000
              </Typography>
            </div>
            <Chip
              size="small"
              label="Confidence score: 85%"
              sx={{ p: 0, width: 'fit-content' }}
            />
          </CardContent>
        </Card>
      </Box>
    </ResizableDemo>
  );
}
```

### Caveats

- The `@` prefix with a unitless value renders as `px`, so `@500` is equivalent to `500px`—but `@500px` is incorrect syntax and won't render correctly.
- `@` with no number renders as `0px`.
- Container queries must share the same units (the sizes can be defined in any order), as shown below:

  ```js
  // ✅ These container queries will be sorted correctly.
  padding: {
    '@40em': 4,
    '@20em': 2,
    '@': 0,
  }

  // ❌ These container queries won't be sorted correctly
  //    because 40em is typically greater than 50px
  //    and the units don't match.
  padding: {
    '@40em': 4,
    '@50': 2,
    '@': 0,
  }
  ```

## API

CSS container queries support all the methods available in [the breakpoints API](/material-ui/customization/breakpoints/#api).

```js
// For default breakpoints
theme.containerQueries.up('sm'); // => '@container (min-width: 600px)'
theme.containerQueries.down('md'); // => '@container (max-width: 900px)'
theme.containerQueries.only('md'); // => '@container (min-width: 600px) and (max-width: 900px)'
theme.containerQueries.between('sm', 'lg'); // => '@container (min-width: 600px) and (max-width: 1200px)'
theme.containerQueries.not('sm'); // => '@container (max-width: 600px)'
```
