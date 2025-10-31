---
productId: material-ui
title: React Card component
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
githubLabel: 'scope: card'
materialDesign: https://m2.material.io/components/cards
githubSource: packages/mui-material/src/Card
---

# Card

Cards contain content and actions about a single subject.

## Introduction

Cards are surfaces that display content and actions on a single topic.
The Material UI Card component includes several complementary utility components to handle various use cases:

- Card: a surface-level container for grouping related components.
- Card Content: the wrapper for the Card content.
- Card Header: an optional wrapper for the Card header.
- Card Media: an optional container for displaying images, videos, etc.
- Card Actions: an optional wrapper that groups a set of buttons.
- Card Action Area: an optional wrapper that allows users to interact with the specified area of the Card.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
```

## Basics

```jsx
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
```

:::success
Although cards can support multiple actions, UI controls, and an overflow menu, use restraint and remember that cards are meant to be entry points to more complex and detailed information.
:::

### Outlined Card

Set `variant="outlined"` to render an outlined card.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
```

## Complex Interaction

On desktop, card content can expand. (Click the downward chevron to view the recipe.)

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
```

## Media

Example of a card using an image to reinforce the content.

```tsx
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
```

By default, we use the combination of a `<div>` element and a _background image_ to display the media. It can be problematic in some situations, for example, you might want to display a video or a responsive image. Use the `component` prop for these use cases:

```tsx
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
```

## Primary action

Often a card allow users to interact with the entirety of its surface to trigger its main action, be it an expansion, a link to another screen or some other behavior. The action area of the card can be specified by wrapping its contents in a `CardActionArea` component.

```tsx
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
```

A card can also offer supplemental actions which should stand detached from the main action area in order to avoid event overlap.

```tsx
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
```

## UI Controls

Supplemental actions within the card are explicitly called out using icons, text, and UI controls, typically placed at the bottom of the card.

Here's an example of a media control card.

```tsx
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}
```

## Active state styles

To customize a Card's styles when it's in an active state, you can attach a `data-active` attribute to the Card Action Area component and apply styles with the `&[data-active]` selector, as shown below:

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const cards = [
  {
    id: 1,
    title: 'Plants',
    description: 'Plants are essential for all life.',
  },
  {
    id: 2,
    title: 'Animals',
    description: 'Animals are a part of nature.',
  },
  {
    id: 3,
    title: 'Humans',
    description: 'Humans depend on plants and animals for survival.',
  },
];

function SelectActionCard() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default SelectActionCard;
```

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/?path=/docs/card-introduction--docs).

# Card API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Card](https://mui.com/material-ui/react-card/)

## Import

```jsx
import Card from '@mui/material/Card';
// or
import { Card } from '@mui/material';
```

## Props

| Name     | Type                                              | Default | Required | Description                                                                             |
| -------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children | `node`                                            | -       | No       |                                                                                         |
| classes  | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| raised   | `bool`                                            | `false` | No       |                                                                                         |
| sx       | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Paper](https://mui.com/material-ui/api/paper/)).

## Inheritance

While not explicitly documented above, the props of the [Paper](https://mui.com/material-ui/api/paper/) component are also available on Card.

## Theme default props

You can use `MuiCard` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                         |
| ------------ | --------- | ----------------------------------- |
| -            | root      | Styles applied to the root element. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Card/Card.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Card/Card.js)

# CardActionArea API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Card](https://mui.com/material-ui/react-card/)

## Import

```jsx
import CardActionArea from '@mui/material/CardActionArea';
// or
import { CardActionArea } from '@mui/material';
```

## Props

| Name      | Type                                                         | Default | Required | Description                                                                             |
| --------- | ------------------------------------------------------------ | ------- | -------- | --------------------------------------------------------------------------------------- |
| children  | `node`                                                       | -       | No       |                                                                                         |
| classes   | `object`                                                     | -       | No       | Override or extend the styles applied to the component.                                 |
| slotProps | `{ focusHighlight?: func \| object, root?: func \| object }` | `{}`    | No       |                                                                                         |
| slots     | `{ focusHighlight?: elementType, root?: elementType }`       | `{}`    | No       |                                                                                         |
| sx        | `Array<func \| object \| bool> \| func \| object`            | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLButtonElement).

> Any other props supplied will be provided to the root element ([ButtonBase](https://mui.com/material-ui/api/button-base/)).

## Inheritance

While not explicitly documented above, the props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available on CardActionArea.

## Theme default props

You can use `MuiCardActionArea` to change the default props of this component with the theme.

## Slots

| Name           | Default      | Class                               | Description                                    |
| -------------- | ------------ | ----------------------------------- | ---------------------------------------------- |
| root           | `ButtonBase` | `.MuiCardActionArea-root`           | The component that renders the root.           |
| focusHighlight | `span`       | `.MuiCardActionArea-focusHighlight` | The component that renders the focusHighlight. |

## CSS

### Rule name

| Global class        | Rule name | Description                                                                                |
| ------------------- | --------- | ------------------------------------------------------------------------------------------ |
| `.Mui-focusVisible` | -         | State class applied to the ButtonBase root element if the action area is keyboard focused. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/CardActionArea/CardActionArea.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/CardActionArea/CardActionArea.js)

# CardActions API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Card](https://mui.com/material-ui/react-card/)

## Import

```jsx
import CardActions from '@mui/material/CardActions';
// or
import { CardActions } from '@mui/material';
```

## Props

| Name           | Type                                              | Default | Required | Description                                                                             |
| -------------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children       | `node`                                            | -       | No       |                                                                                         |
| classes        | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| disableSpacing | `bool`                                            | `false` | No       |                                                                                         |
| sx             | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiCardActions` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                                                        |
| ------------ | --------- | ------------------------------------------------------------------ |
| -            | root      | Styles applied to the root element.                                |
| -            | spacing   | Styles applied to the root element unless `disableSpacing={true}`. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/CardActions/CardActions.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/CardActions/CardActions.js)

# CardContent API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Card](https://mui.com/material-ui/react-card/)

## Import

```jsx
import CardContent from '@mui/material/CardContent';
// or
import { CardContent } from '@mui/material';
```

## Props

| Name      | Type                                              | Default | Required | Description                                                                             |
| --------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children  | `node`                                            | -       | No       |                                                                                         |
| classes   | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| component | `elementType`                                     | -       | No       |                                                                                         |
| sx        | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiCardContent` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                         |
| ------------ | --------- | ----------------------------------- |
| -            | root      | Styles applied to the root element. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/CardContent/CardContent.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/CardContent/CardContent.js)

# CardHeader API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Card](https://mui.com/material-ui/react-card/)

## Import

```jsx
import CardHeader from '@mui/material/CardHeader';
// or
import { CardHeader } from '@mui/material';
```

## Props

| Name                                  | Type                                                                                                                                                        | Default | Required | Description                                                                                                                                                                                                              |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| action                                | `node`                                                                                                                                                      | -       | No       |                                                                                                                                                                                                                          |
| avatar                                | `node`                                                                                                                                                      | -       | No       |                                                                                                                                                                                                                          |
| classes                               | `object`                                                                                                                                                    | -       | No       | Override or extend the styles applied to the component.                                                                                                                                                                  |
| component                             | `elementType`                                                                                                                                               | -       | No       |                                                                                                                                                                                                                          |
| disableTypography                     | `bool`                                                                                                                                                      | `false` | No       |                                                                                                                                                                                                                          |
| slotProps                             | `{ action?: func \| object, avatar?: func \| object, content?: func \| object, root?: func \| object, subheader?: func \| object, title?: func \| object }` | `{}`    | No       |                                                                                                                                                                                                                          |
| slots                                 | `{ action?: elementType, avatar?: elementType, content?: elementType, root?: elementType, subheader?: elementType, title?: elementType }`                   | `{}`    | No       |                                                                                                                                                                                                                          |
| subheader                             | `node`                                                                                                                                                      | -       | No       |                                                                                                                                                                                                                          |
| subheaderTypographyProps (deprecated) | `object`                                                                                                                                                    | -       | No       | ⚠️ Use `slotProps.subheader` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| sx                                    | `Array<func \| object \| bool> \| func \| object`                                                                                                           | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                  |
| title                                 | `node`                                                                                                                                                      | -       | No       |                                                                                                                                                                                                                          |
| titleTypographyProps (deprecated)     | `object`                                                                                                                                                    | -       | No       | ⚠️ Use `slotProps.title` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.     |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiCardHeader` to change the default props of this component with the theme.

## Slots

| Name                                                                                                                            | Default      | Class                      | Description                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------------------------- | ------------------------------------------------------------------------------------------- |
| root                                                                                                                            | `'div'`      | `.MuiCardHeader-root`      | The component that renders the root slot.                                                   |
| avatar                                                                                                                          | `'div'`      | `.MuiCardHeader-avatar`    | The component that renders the avatar slot.                                                 |
| action                                                                                                                          | `'div'`      | `.MuiCardHeader-action`    | The component that renders the action slot.                                                 |
| content                                                                                                                         | `'div'`      | `.MuiCardHeader-content`   | The component that renders the content slot.                                                |
| title                                                                                                                           | `Typography` | `.MuiCardHeader-title`     | The component that renders the title slot (as long as disableTypography is not `true`).     |
| [Follow this guide](https://mui.com/material-ui/api/typography/#props) to learn more about the requirements for this component. |
| subheader                                                                                                                       | `Typography` | `.MuiCardHeader-subheader` | The component that renders the subheader slot (as long as disableTypography is not `true`). |
| [Follow this guide](https://mui.com/material-ui/api/typography/#props) to learn more about the requirements for this component. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/CardHeader/CardHeader.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/CardHeader/CardHeader.js)

# CardMedia API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Card](https://mui.com/material-ui/react-card/)

## Import

```jsx
import CardMedia from '@mui/material/CardMedia';
// or
import { CardMedia } from '@mui/material';
```

## Props

| Name      | Type                                              | Default | Required | Description                                                                             |
| --------- | ------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children  | `node`                                            | -       | No       |                                                                                         |
| classes   | `object`                                          | -       | No       | Override or extend the styles applied to the component.                                 |
| component | `elementType`                                     | -       | No       |                                                                                         |
| image     | `string`                                          | -       | No       |                                                                                         |
| src       | `string`                                          | -       | No       |                                                                                         |
| sx        | `Array<func \| object \| bool> \| func \| object` | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiCardMedia` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                                                                                |
| ------------ | --------- | ------------------------------------------------------------------------------------------ |
| -            | img       | Styles applied to the root element if `component="picture or img"`.                        |
| -            | media     | Styles applied to the root element if `component="video, audio, picture, iframe, or img"`. |
| -            | root      | Styles applied to the root element.                                                        |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/CardMedia/CardMedia.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/CardMedia/CardMedia.js)

# Collapse API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Card](https://mui.com/material-ui/react-card/)
- [Lists](https://mui.com/material-ui/react-list/)
- [Transitions](https://mui.com/material-ui/transitions/)

## Import

```jsx
import Collapse from '@mui/material/Collapse';
// or
import { Collapse } from '@mui/material';
```

## Props

| Name           | Type                                                                     | Default             | Required | Description                                                                             |
| -------------- | ------------------------------------------------------------------------ | ------------------- | -------- | --------------------------------------------------------------------------------------- |
| addEndListener | `func`                                                                   | -                   | No       |                                                                                         |
| children       | `node`                                                                   | -                   | No       |                                                                                         |
| classes        | `object`                                                                 | -                   | No       | Override or extend the styles applied to the component.                                 |
| collapsedSize  | `number \| string`                                                       | `'0px'`             | No       |                                                                                         |
| component      | `element type`                                                           | -                   | No       |                                                                                         |
| easing         | `{ enter?: string, exit?: string } \| string`                            | -                   | No       |                                                                                         |
| in             | `bool`                                                                   | -                   | No       |                                                                                         |
| orientation    | `'horizontal' \| 'vertical'`                                             | `'vertical'`        | No       |                                                                                         |
| sx             | `Array<func \| object \| bool> \| func \| object`                        | -                   | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| timeout        | `'auto' \| number \| { appear?: number, enter?: number, exit?: number }` | `duration.standard` | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props)).

## Inheritance

While not explicitly documented above, the props of the [Transition](https://reactcommunity.org/react-transition-group/transition/#Transition-props) component are also available on Collapse. A subset of components support [react-transition-group](https://reactcommunity.org/react-transition-group/transition/) out of the box.

## Theme default props

You can use `MuiCollapse` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name    | Description                                                                                  |
| ------------ | ------------ | -------------------------------------------------------------------------------------------- |
| -            | entered      | Styles applied to the root element when the transition has entered.                          |
| -            | hidden       | Styles applied to the root element when the transition has exited and `collapsedSize` = 0px. |
| -            | horizontal   | State class applied to the root element if `orientation="horizontal"`.                       |
| -            | root         | Styles applied to the root element.                                                          |
| -            | wrapper      | Styles applied to the outer wrapper element.                                                 |
| -            | wrapperInner | Styles applied to the inner wrapper element.                                                 |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Collapse/Collapse.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Collapse/Collapse.js)

# Paper API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Card](https://mui.com/material-ui/react-card/)
- [Paper](https://mui.com/material-ui/react-paper/)

## Import

```jsx
import Paper from '@mui/material/Paper';
// or
import { Paper } from '@mui/material';
```

## Props

| Name      | Type                                              | Default       | Required | Description                                                                             |
| --------- | ------------------------------------------------- | ------------- | -------- | --------------------------------------------------------------------------------------- |
| children  | `node`                                            | -             | No       |                                                                                         |
| classes   | `object`                                          | -             | No       | Override or extend the styles applied to the component.                                 |
| component | `elementType`                                     | -             | No       |                                                                                         |
| elevation | `integer`                                         | `1`           | No       |                                                                                         |
| square    | `bool`                                            | `false`       | No       |                                                                                         |
| sx        | `Array<func \| object \| bool> \| func \| object` | -             | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| variant   | `'elevation' \| 'outlined' \| string`             | `'elevation'` | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiPaper` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name   | Description                                                  |
| ------------ | ----------- | ------------------------------------------------------------ |
| -            | elevation   | Styles applied to the root element if `variant="elevation"`. |
| -            | elevation0  | Styles applied to the root element if `elevation={0}`.       |
| -            | elevation1  | Styles applied to the root element if `elevation={1}`.       |
| -            | elevation10 | Styles applied to the root element if `elevation={10}`.      |
| -            | elevation11 | Styles applied to the root element if `elevation={11}`.      |
| -            | elevation12 | Styles applied to the root element if `elevation={12}`.      |
| -            | elevation13 | Styles applied to the root element if `elevation={13}`.      |
| -            | elevation14 | Styles applied to the root element if `elevation={14}`.      |
| -            | elevation15 | Styles applied to the root element if `elevation={15}`.      |
| -            | elevation16 | Styles applied to the root element if `elevation={16}`.      |
| -            | elevation17 | Styles applied to the root element if `elevation={17}`.      |
| -            | elevation18 | Styles applied to the root element if `elevation={18}`.      |
| -            | elevation19 | Styles applied to the root element if `elevation={19}`.      |
| -            | elevation2  | Styles applied to the root element if `elevation={2}`.       |
| -            | elevation20 | Styles applied to the root element if `elevation={20}`.      |
| -            | elevation21 | Styles applied to the root element if `elevation={21}`.      |
| -            | elevation22 | Styles applied to the root element if `elevation={22}`.      |
| -            | elevation23 | Styles applied to the root element if `elevation={23}`.      |
| -            | elevation24 | Styles applied to the root element if `elevation={24}`.      |
| -            | elevation3  | Styles applied to the root element if `elevation={3}`.       |
| -            | elevation4  | Styles applied to the root element if `elevation={4}`.       |
| -            | elevation5  | Styles applied to the root element if `elevation={5}`.       |
| -            | elevation6  | Styles applied to the root element if `elevation={6}`.       |
| -            | elevation7  | Styles applied to the root element if `elevation={7}`.       |
| -            | elevation8  | Styles applied to the root element if `elevation={8}`.       |
| -            | elevation9  | Styles applied to the root element if `elevation={9}`.       |
| -            | outlined    | Styles applied to the root element if `variant="outlined"`.  |
| -            | root        | Styles applied to the root element.                          |
| -            | rounded     | Styles applied to the root element unless `square={true}`.   |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Paper/Paper.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Paper/Paper.js)
