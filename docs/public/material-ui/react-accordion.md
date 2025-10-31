---
productId: material-ui
title: React Accordion component
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
githubLabel: 'scope: accordion'
materialDesign: https://m1.material.io/components/expansion-panels.html
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
githubSource: packages/mui-material/src/Accordion
---

# Accordion

The Accordion component lets users show and hide sections of related content on a page.

## Introduction

The Material UI Accordion component includes several complementary utility components to handle various use cases:

- Accordion: the wrapper for grouping related components.
- Accordion Summary: the wrapper for the Accordion header, which expands or collapses the content when clicked.
- Accordion Details: the wrapper for the Accordion content.
- Accordion Actions: an optional wrapper that groups a set of buttons.

```tsx
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function AccordionUsage() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">Accordion Actions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
```

:::info
This component is no longer documented in the [Material Design guidelines](https://m2.material.io/), but Material UI will continue to support it.
:::

## Basics

```jsx
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
```

### Expand icon

Use the `expandIcon` prop on the Accordion Summary component to change the expand indicator icon.
The component handles the turning upside-down transition automatically.

```tsx
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function AccordionExpandIcon() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
```

### Expanded by default

Use the `defaultExpanded` prop on the Accordion component to have it opened by default.

```tsx
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionExpandDefault() {
  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Expanded by default</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Header</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
```

### Transition

Use the `slots.transition` and `slotProps.transition` props to change the Accordion's default transition.

```tsx
import * as React from 'react';
import Accordion, {
  AccordionSlots,
  accordionClasses,
} from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

export default function AccordionTransition() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade as AccordionSlots['transition'] }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded
            ? {
                [`& .${accordionClasses.region}`]: {
                  height: 'auto',
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: 'block',
                },
              }
            : {
                [`& .${accordionClasses.region}`]: {
                  height: 0,
                },
                [`& .${accordionDetailsClasses.root}`]: {
                  display: 'none',
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Custom transition using Fade</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Default transition using Collapse</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
```

### Disabled item

Use the `disabled` prop on the Accordion component to disable interaction and focus.

```tsx
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function DisabledAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}
```

### Controlled Accordion

The Accordion component can be controlled or uncontrolled.

```tsx
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
            I am an accordion
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Users
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
            laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Personal data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
```

:::info

- A component is **controlled** when it's managed by its parent using props.
- A component is **uncontrolled** when it's managed by its own local state.

Learn more about controlled and uncontrolled components in the [React documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).
:::

## Customization

### Only one expanded at a time

Use the `expanded` prop with React's `useState` hook to allow only one Accordion item to be expanded at a time.
The demo below also shows a bit of visual customization.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: 'rotate(90deg)',
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography component="span">Collapsible Group Item #1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography component="span">Collapsible Group Item #2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography component="span">Collapsible Group Item #3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
```

### Changing heading level

By default, the Accordion uses an `h3` element for the heading. You can change the heading element using the `slotProps.heading.component` prop to ensure the correct heading hierarchy in your document.

```jsx
<Accordion slotProps={{ heading: { component: 'h4' } }}>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1-content"
    id="panel1-header"
  >
    Accordion
  </AccordionSummary>
  <AccordionDetails>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
    lacus ex, sit amet blandit leo lobortis eget.
  </AccordionDetails>
</Accordion>
```

## Performance

The Accordion content is mounted by default even if it's not expanded.
This default behavior has server-side rendering and SEO in mind.

If you render the Accordion Details with a big component tree nested inside, or if you have many Accordions, you may want to change this behavior by setting `unmountOnExit` to `true` inside the `slotProps.transition` prop to improve performance:

```jsx
<Accordion slotProps={{ transition: { unmountOnExit: true } }} />
```

## Accessibility

The [WAI-ARIA guidelines for accordions](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) recommend setting an `id` and `aria-controls`, which in this case would apply to the Accordion Summary component.
The Accordion component then derives the necessary `aria-labelledby` and `id` from its content.

```jsx
<Accordion>
  <AccordionSummary id="panel-header" aria-controls="panel-content">
    Header
  </AccordionSummary>
  <AccordionDetails>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </AccordionDetails>
</Accordion>
```

## Anatomy

The Accordion component consists of a root `<div>` that contains the Accordion Summary, Accordion Details, and optional Accordion Actions for action buttons.

```jsx
<div class="MuiAccordion-root">
  <h3 class="MuiAccordion-heading">
    <button class="MuiButtonBase-root MuiAccordionSummary-root" aria-expanded="">
      <!-- Accordion summary goes here -->
    </button>
  </h3>
  <div class="MuiAccordion-region" role="region">
    <div class="MuiAccordionDetails-root">
      <!-- Accordion content goes here -->
    </div>
  </div>
</div>
```

# Accordion API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Accordion](https://mui.com/material-ui/react-accordion/)

## Import

```jsx
import Accordion from '@mui/material/Accordion';
// or
import { Accordion } from '@mui/material';
```

## Props

| Name                             | Type                                                                                                        | Default | Required | Description                                                                                                                                                                                                               |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children                         | `node`                                                                                                      | -       | Yes      |                                                                                                                                                                                                                           |
| classes                          | `object`                                                                                                    | -       | No       | Override or extend the styles applied to the component.                                                                                                                                                                   |
| defaultExpanded                  | `bool`                                                                                                      | `false` | No       |                                                                                                                                                                                                                           |
| disabled                         | `bool`                                                                                                      | `false` | No       |                                                                                                                                                                                                                           |
| disableGutters                   | `bool`                                                                                                      | `false` | No       |                                                                                                                                                                                                                           |
| expanded                         | `bool`                                                                                                      | -       | No       |                                                                                                                                                                                                                           |
| onChange                         | `function(event: React.SyntheticEvent, expanded: boolean) => void`                                          | -       | No       |                                                                                                                                                                                                                           |
| slotProps                        | `{ heading?: func \| object, region?: func \| object, root?: func \| object, transition?: func \| object }` | `{}`    | No       |                                                                                                                                                                                                                           |
| slots                            | `{ heading?: elementType, region?: elementType, root?: elementType, transition?: elementType }`             | `{}`    | No       |                                                                                                                                                                                                                           |
| square                           | `bool`                                                                                                      | `false` | No       |                                                                                                                                                                                                                           |
| sx                               | `Array<func \| object \| bool> \| func \| object`                                                           | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                                   |
| TransitionComponent (deprecated) | `elementType`                                                                                               | -       | No       | ⚠️ Use `slots.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.     |
| TransitionProps (deprecated)     | `object`                                                                                                    | -       | No       | ⚠️ Use `slotProps.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element ([Paper](https://mui.com/material-ui/api/paper/)).

## Inheritance

While not explicitly documented above, the props of the [Paper](https://mui.com/material-ui/api/paper/) component are also available on Accordion.

## Theme default props

You can use `MuiAccordion` to change the default props of this component with the theme.

## Slots

| Name                                                                                                                                            | Default    | Class                   | Description                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----------------------- | ------------------------------------------ |
| root                                                                                                                                            | `Paper`    | `.MuiAccordion-root`    | The component that renders the root.       |
| heading                                                                                                                                         | `'h3'`     | `.MuiAccordion-heading` | The component that renders the heading.    |
| transition                                                                                                                                      | `Collapse` | -                       | The component that renders the transition. |
| [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component. |
| region                                                                                                                                          | `'div'`    | `.MuiAccordion-region`  | The component that renders the region.     |

## CSS

### Rule name

| Global class    | Rule name | Description                                                        |
| --------------- | --------- | ------------------------------------------------------------------ |
| `.Mui-disabled` | -         | State class applied to the root element if `disabled={true}`.      |
| `.Mui-expanded` | -         | State class applied to the root element if `expanded={true}`.      |
| -               | gutters   | Styles applied to the root element unless `disableGutters={true}`. |
| -               | rounded   | Styles applied to the root element unless `square={true}`.         |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Accordion/Accordion.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Accordion/Accordion.js)

# AccordionActions API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Accordion](https://mui.com/material-ui/react-accordion/)

## Import

```jsx
import AccordionActions from '@mui/material/AccordionActions';
// or
import { AccordionActions } from '@mui/material';
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

You can use `MuiAccordionActions` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                                                        |
| ------------ | --------- | ------------------------------------------------------------------ |
| -            | root      | Styles applied to the root element.                                |
| -            | spacing   | Styles applied to the root element unless `disableSpacing={true}`. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/AccordionActions/AccordionActions.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/AccordionActions/AccordionActions.js)

# AccordionDetails API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Accordion](https://mui.com/material-ui/react-accordion/)

## Import

```jsx
import AccordionDetails from '@mui/material/AccordionDetails';
// or
import { AccordionDetails } from '@mui/material';
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

You can use `MuiAccordionDetails` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                         |
| ------------ | --------- | ----------------------------------- |
| -            | root      | Styles applied to the root element. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/AccordionDetails/AccordionDetails.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/AccordionDetails/AccordionDetails.js)

# AccordionSummary API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Accordion](https://mui.com/material-ui/react-accordion/)

## Import

```jsx
import AccordionSummary from '@mui/material/AccordionSummary';
// or
import { AccordionSummary } from '@mui/material';
```

## Props

| Name                  | Type                                                                                      | Default | Required | Description                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| children              | `node`                                                                                    | -       | No       |                                                                                         |
| classes               | `object`                                                                                  | -       | No       | Override or extend the styles applied to the component.                                 |
| expandIcon            | `node`                                                                                    | -       | No       |                                                                                         |
| focusVisibleClassName | `string`                                                                                  | -       | No       |                                                                                         |
| slotProps             | `{ content?: func \| object, expandIconWrapper?: func \| object, root?: func \| object }` | `{}`    | No       |                                                                                         |
| slots                 | `{ content?: elementType, expandIconWrapper?: elementType, root?: elementType }`          | `{}`    | No       |                                                                                         |
| sx                    | `Array<func \| object \| bool> \| func \| object`                                         | -       | No       | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLButtonElement).

> Any other props supplied will be provided to the root element ([ButtonBase](https://mui.com/material-ui/api/button-base/)).

## Inheritance

While not explicitly documented above, the props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available on AccordionSummary.

## Theme default props

You can use `MuiAccordionSummary` to change the default props of this component with the theme.

## Slots

| Name              | Default      | Class                                    | Description                                              |
| ----------------- | ------------ | ---------------------------------------- | -------------------------------------------------------- |
| root              | `ButtonBase` | `.MuiAccordionSummary-root`              | The component that renders the root slot.                |
| content           | `div`        | `.MuiAccordionSummary-content`           | The component that renders the content slot.             |
| expandIconWrapper | `div`        | `.MuiAccordionSummary-expandIconWrapper` | The component that renders the expand icon wrapper slot. |

## CSS

### Rule name

| Global class        | Rule name      | Description                                                                                                        |
| ------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------ |
| -                   | contentGutters | Styles applied to the children wrapper element unless `disableGutters={true}`.                                     |
| `.Mui-disabled`     | -              | State class applied to the root element if `disabled={true}`.                                                      |
| `.Mui-expanded`     | -              | State class applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`. |
| `.Mui-focusVisible` | -              | State class applied to the ButtonBase root element if the button is keyboard focused.                              |
| -                   | gutters        | Styles applied to the root element unless `disableGutters={true}`.                                                 |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/AccordionSummary/AccordionSummary.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/AccordionSummary/AccordionSummary.js)
