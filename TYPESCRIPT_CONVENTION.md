# Typescript Convention

## Component

> **Public components** are considered all components exported from `@material-ui/core` or `@material-ui/lab`.
> 
> **Internal components** are considered all components that are not exported from the packages, but only used in some public component. There is no need to have `sx` prop on these components

### `Props Interface`

- naming as `{ComponentName}Props`
- always export props interface (use `interface` over `type`) from the component file
- provide `classes` and comment for generating api docs (for internal components, may or may not expose classes but don't need comment)
- provide `sx` only for public component

<details>
  <summary>Public component</summary>

  ```ts
// Foo.tsx

export interface FooProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
  };
  // ...other props
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}
```
</details>
<details>
  <summary>internal component</summary>

  ```ts
// Bar.tsx

export interface BarProps {
  classes?: { // optional, depends on the component
    root?: string;
  };
}
```
</details>

### `ClassKey`

- naming as `{ComponentName}ClassKey`
- export if `classes` exists in props interface

```ts
// Foo.tsx
export interface FooProps { ... }

export type FooClassKey = keyof NonNullable<FooProps['classes']>
// verify that FooClassKey is union of string literal
```

### `Classes generator & Utility`

- export if `classes` exist in props interface from the component file
- use `ClassKey` as argument in generic (this could help preventing typo)
- use `Private` prefix for internal component

<details>
  <summary>Public component</summary>

```ts
// Foo.tsx
export function getFooUtilityClass(slot: string) {
  return generateUtilityClass('MuiFoo', slot);
}

// make sure it has ClassKey as arg in generic
export const fooClasses = generateUtilityClasses<FooClassKey>('MuiFoo', [
  'root',
  'bar',
  'disabled',
]);

const useUtilityClasses = (styleProps: FooProps & { extraProp: boolean }) => {
  // extraProp might be the key/value from react context that this component access
  const {
    bar,
    disabled,
    classes,
  } = styleProps;

  const slots = {
    root: [ 'root', bar && 'bar', disabled && 'disabled' ],
  };

  return composeClasses(slots, getFooUtilityClass, classes);
};
```
</details>
<details>
  <summary>internal component</summary>

```ts
// Bar.tsx
// in case that classes is not exposed.
// `classes` is used internally in this component
const classes = generateUtilityClasses('PrivateBar', [
  'root',
  'bar',
]);
```
</details>

### `StyledComponent`
- naming using slot `{ComponentName}{Slot}`
- use `skipSx` for internal component without specifying `name`, `slot` and `overridesResolver`
- to extend interface of the styled component, pass argument to generic

<details>
  <summary>public component</summary>

```ts
const FooRoot = styled(
  Typography,
  {},
  {
    name: 'MuiFoo',
    slot: 'Root',
    overridesResolver: (props, styles) => styles.root,
  },
)({
  // styling
});
```
</details>
<details>
  <summary>internal component</summary>

```ts
const BarRoot = styled(
  Typography,
  {},
  { skipSx: true },
)({
  // styling
});
```
</details>
<details>
  <summary>extends interface</summary>

```ts
const BarRoot = styled(
  Typography,
  {},
  { skipSx: true },
)<{ component?: React.ElementType }>({
  // styling
});
// passing `component` to BarRoot is safe
// <BarRoot component="span" />
```
</details>

### `Component declaration`

- prefer `function Component() {}` over `React.FC`
- naming the render function in `React.forwardRef` (for devtools)
- `useThemeProps` is needed only for public component
- pass `styleProps` to StyledComponent if it requires for styling

<details>
  <summary>public component</summary>

```ts
const Foo = React.forwardRef<HTMLSpanElement, FooProps>(function Foo(inProps, ref) => {
  // pass args like this, otherwise will get error about theme at return section
  const props = useThemeProps<Theme, FooProps, 'MuiFoo'>({
    props: inProps,
    name: 'MuiFoo',
  });
  const { children, className, ...other } = props

  // ...implementation

  const styleProps = { ...props, ...otherValue }

  const classes = useUtilityClasses(styleProps);

  return (
    <FooRoot
      ref={ref}
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      {...other}
    >
      {children}
    </FooRoot>
  )
})
```
</details>
<details>
  <summary>internal component</summary>

```ts
const classes = generateUtilityClasses('PrivateBar', [
  'selected',
]);

const BarRoot = styled('div', {}, { skipSx: true })(
  ({ theme }) => ({
    [`&.${classes.selected}`]: {
      color: theme.palette.text.primary,
    }
  })
)

// if this component does not need React.forwardRef, don't use React.FC
const Bar = (props: BarProps) => {
  const { className, selected, ...other } = props
  return (
    <BarRoot
      className={clsx({ [classes.selected]: selected })}
      {...other}
    />
  )
}
```
</details>



