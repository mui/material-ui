# Themeable Component

<p class="description">Create your own themeable component with Material UI theming feature.</p>

## Introduction

Material UI provides a powerful theming feature that lets you to add your own component to the theme as if it's one of the built-in components.

If you are building a component library on top of Material UI, you can follow the step-by-step guide below on how to create a custom component that is themeable across multiple projects.

Otherwise, you can skip the step-by-step guide and use the [template](#template) as a starting point for your component.

:::info
You don't need to connect your component to the theme if you are only using it in a single project.
:::

## Step-by-step guide

We are going to build a statistics component that looks like this:

{{"demo": "StatComponent.js", "hideToolbar": true}}

### 1. Create the component slots

The slots let your users customize each part of the component by targeting the slot's name in [theme's styleOverrides](/material-ui/customization/theme-components/#theme-style-overrides) and [theme's variants](/material-ui/customization/theme-components/#creating-new-component-variants).

In this example, we are going to create 3 slots for the statistics component:

- `root`: the container of the component
- `value`: the number of the statistics
- `unit`: the unit or description of the statistics

:::success
We recommend to use `root` as the name of the slot that is the outermost container of the component to follow Material UI consistency.
:::

{{"demo": "StatSlots.js", "hideToolbar": true}}

Use `styled` API with `name`, `slot`, and `overridesResolver` parameters to create the slots.

```js
import * as React from 'react';
import { styled } from '@mui/material/styles';

const StatRoot = styled('div', {
  name: 'MuiStat', // The component name
  slot: 'root', // The slot name
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(3, 4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  letterSpacing: '-0.025em',
  fontWeight: 600,
}));

const StatValue = styled('div', {
  name: 'MuiStat',
  slot: 'value',
  overridesResolver: (props, styles) => styles.value,
})(({ theme }) => ({
  ...theme.typography.h3,
}));

const StatUnit = styled('div', {
  name: 'MuiStat',
  slot: 'unit',
  overridesResolver: (props, styles) => styles.unit,
})(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));
```

### 2. Create the component

Now we can create the component by using the slots in the previous step.

```js
// /path/to/Stat.js
import * as React from 'react';

const StatRoot = styled('div', {
  name: 'MuiStat',
  slot: 'root',
})(…);

const StatValue = styled('div', {
  name: 'MuiStat',
  slot: 'value',
})(…);

const StatUnit = styled('div', {
  name: 'MuiStat',
  slot: 'unit',
})(…);

const Stat = React.forwardRef(function Stat(props, ref) {
  const { value, unit, ...other } = props;

  return (
    <StatRoot ref={ref} {...other}>
      <StatValue>{value}</StatValue>
      <StatUnit>{unit}</StatUnit>
    </StatRoot>
  );
});

export default Stat;
```

At this point, your users will be able to theme the `Stat` component like this:

```js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    // the component name defined in the `name` parameter
    // of the `styled` API
    MuiStat: {
      styleOverrides: {
        // the slot name defined in the `slot` and `overridesResolver` parameters
        // of the `styled` API
        root: {
          backgroundColor: '#121212',
        },
        value: {
          color: '#fff',
        },
        unit: {
          color: '#888',
        },
      },
    },
  },
});
```

### 3. Style the slot with ownerState

When you need to style the slot based props or internal state, wrap them in `ownerState` object and pass to each slot as a prop. The `ownerState` is a special name that will not spread to DOM by the `styled` API.

In this example, we are going to add a `variant` prop to the `Stat` component and use it to style the `root` slot.

```diff
  const Stat = React.forwardRef(function Stat(props, ref) {
+   const { value, unit, variant, ...other } = props;
+
+   const ownerState = { ...props, variant };

    return (
-      <StatRoot ref={ref} {...other}>
-        <StatValue>{value}</StatValue>
-        <StatUnit>{unit}</StatUnit>
-      </StatRoot>
+      <StatRoot ref={ref} ownerState={ownerState} {...other}>
+        <StatValue ownerState={ownerState}>{value}</StatValue>
+        <StatUnit ownerState={ownerState}>{unit}</StatUnit>
+      </StatRoot>
    );
  });
```

Then you can read `ownerState` in the slot to style it based on the `variant` prop.

```diff
  const StatRoot = styled('div', {
    name: 'MuiStat',
    slot: 'root',
-  })(({ theme }) => ({
+  })(({ theme, ownerState }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
    padding: theme.spacing(3, 4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    letterSpacing: '-0.025em',
    fontWeight: 600,
+   ...ownerState.variant === 'outlined' && {
+    border: `2px solid ${theme.palette.divider}`,
+   },
  }));
```

### 4. Support theme default props

To let your users customize the default props of your component for different projects, you need to use the `useThemeProps` API.

```diff
+ import { useThemeProps } from '@mui/material/styles';

- const Stat = React.forwardRef(function Stat(props, ref) {
+ const Stat = React.forwardRef(function Stat(inProps, ref) {
+   const props = useThemeProps({ props: inProps, name: 'MuiStat' });
    const { value, unit, ...other } = props;

    return (
      <StatRoot ref={ref} {...other}>
        <StatValue>{value}</StatValue>
        <StatUnit>{unit}</StatUnit>
      </StatRoot>
    );
  });
```

Then your users can customize the default props of your component like this:

```js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiStat: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});
```

## TypeScript

If you use TypeScript, you should create interfaces for the component props and ownerState.

```js
interface StatProps {
  value: number | string;
  unit: string;
  variant?: 'outlined';
}

interface StatOwnerState extends StatProps {
  // …key value pairs for the internal state that you want to style the slot
  // but don't want to expose to the users
}
```

Then you can use them in the component and slots.

```js
const StatRoot = styled('div', {
  name: 'MuiStat',
  slot: 'root',
})<{ ownerState: StatOwnerState }>(({ theme, ownerState }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(3, 4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  letterSpacing: '-0.025em',
  fontWeight: 600,
  // typed-safe access to the `variant` prop
  ...(ownerState.variant === 'outlined' && {
    border: `2px solid ${theme.palette.divider}`,
    boxShadow: 'none',
  }),
}));

// …do the same for other slots

const Stat = React.forwardRef<HTMLDivElement, StatProps>(function Stat(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiStat' });
  const { value, unit, variant, ...other } = props;

  const ownerState = { ...props, variant };

  return (
    <StatRoot ref={ref} ownerState={ownerState} {...other}>
      <StatValue ownerState={ownerState}>{value}</StatValue>
      <StatUnit ownerState={ownerState}>{unit}</StatUnit>
    </StatRoot>
  );
});
```

Finally, you have to add the Stat component the theme types.

```ts
import {
  ComponentsOverrides,
  ComponentsVariants,
  Theme as MuiTheme,
} from '@mui/material/styles';
import { StatProps } from 'path/to/Stat';

type Theme = Omit<MuiTheme, 'components'>;

declare module '@mui/material/styles' {
  interface ComponentNameToClassKey {
    MuiStat: 'root' | 'value' | 'unit';
  }

  interface ComponentsPropsList {
    MuiStat: Partial<StatProps>;
  }

  interface Components {
    MuiStat?: {
      defaultProps?: ComponentsPropsList['MuiStat'];
      styleOverrides?: ComponentsOverrides<Theme>['MuiStat'];
      variants?: ComponentsVariants['MuiStat'];
    };
  }
}
```

:::success
🍾 Congratulations! You have successfully built a themeable component!.
:::

---

## Template

You can use the following template to create your own component. It is the full code of the `Stat` component in this guide.

{{"demo": "StatFullTemplate.js"}}
