---
title: Migrating MUI X to React 19
description: How we migrated to React 19 while maintaining backward compatibility.
date: 2025-02-18
authors: ['arminmeh', 'alexfauquette']
tags: ['MUI X']
---

[React 19 is out](https://react.dev/blog/2024/12/05/react-19) for some time now and we have finished migrating our codebase to it. If you are still having this migration in your backlog or you are interested in the details of our migration, read on.

## The migration strategy

It was crucial for us to keep supporting older React versions, so we approached the migration in two phases:

1. First, we added React 19 compatibility while keeping the codebase on React 18
2. Then we moved the entire codebase to React 19 while maintaining compatibility with previous React versions

This approach allowed early adopters of React 19 to use our packages while we were still finishing our own migration.

### Phase 1: Adding React 19 compatibility

Our first step was checking the [list of breaking changes](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#breaking-changes).

We were lucky that we didn't have to change much in the source code, but a lot of changes had to be made to our tests because of the modifications related to [strict mode](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#strict-mode-improvements) and [error reporting](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#errors-in-render-are-not-re-thrown).
These changes caused a different call count for our spies and different console outputs, so we had to expect different values based on the React major.

`@mui/internal-test-utils` provides an export `reactMajor` that extracts the major version of the React version used in the test.
We are using that to conditionally set the test expectations.

```ts
const errorMessage1 = 'MUI X: Could not find the animation ref context.';
const errorMessage2 =
  'It looks like you rendered your component outside of a ChartsContainer parent component.';
const errorMessage3 =
  'The above error occurred in the <UseSkipAnimation> component:';
const expextedError =
  reactMajor < 19
    ? [errorMessage1, errorMessage2, errorMessage3]
    : `${errorMessage1}\n${errorMessage2}`;
```

```ts
// Spy call count
//   1x during state initialization
// + 1x during state initialization (StrictMode)
// + 1x when sortedRowsSet is fired
// + 1x when sortedRowsSet is fired (StrictMode) = 4x

// Because of https://react.dev/blog/2024/04/25/react-19-upgrade-guide#strict-mode-improvements
// from React 19 it is:
//   1x during state initialization
// + 1x when sortedRowsSet is fired
const expectedCallCount = reactMajor >= 19 ? 2 : 4;
```

### Performance issue

In React 19, you can access `ref` as a prop for function components. `forwardRef` is no longer needed.

This created an [issue](https://github.com/mui/mui-x/issues/15770) for us, which was spotted by one of our community members.

Because `ref` is now also a prop, spreading props after the ref prop could potentially override the ref.

The existence of the `ref` prop on a `ForwardRef` component, even if `undefined`, makes the component props referentially unstable, breaking the downstream memoizations.

To address this, a `forwardRef` shim was added that enforces correct prop ordering at the type level.

```tsx
// Compatibility shim that ensures stable props object for forwardRef components
// Fixes https://github.com/facebook/react/issues/31613
// We ensure that the ref is always present in the props object (even if that's not the case for older versions of React) to avoid the footgun of spreading props over the ref in the newer versions of React.
export const forwardRef = <T, P = {}>(
  render: React.ForwardRefRenderFunction<T, P & { ref: React.Ref<T> }>,
) => {
  if (reactMajor >= 19) {
    const Component = (props: any) => render(props, props.ref ?? null);
    Component.displayName = render.displayName ?? render.name;
    return Component as React.ForwardRefExoticComponent<P>;
  }
  return React.forwardRef(
    render as React.ForwardRefRenderFunction<T, React.PropsWithoutRef<P>>,
  );
};
```

The shim provides two key benefits:

1. Type safety - TypeScript will warn if props are spread incorrectly
2. Forward compatibility - Components using the shim will work correctly in all supported React versions

The code update was:

```tsx
// Before
const GridRoot = forwardRef((props, ref) => {
  const state = useGridState();
  return <div ref={ref} {...props} {...state} />;
});

// After
const GridRoot = forwardRefShim((props, ref) => {
  const state = useGridState();
  return <div {...props} {...state} ref={ref} />;
});
```

## Phase 2: Moving to React 19

After ensuring compatibility, we started working on migrating the codebase to React 19. This involved:

1. Updating all package dependencies to their React 19 compatible versions
2. Migrating test utilities to work with React 19
3. Ensuring all components work with the new React 19 features
4. Updating CI to run tests with React 18
5. Type references with `RefObject` for React 19 and with `MutableRefObject` for earlier versions.

The biggest change in this phase was around the `useRef()` hook [update](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#useref-requires-argument) and the fact that `apiRef` in the DataGrid component had to be updated from `MutableRefObject` to `RefObject` for React 19 only, in order to avoid type errors for users (and their CI) that did not migrate yet.

As part of the migration we also moved to NextJS 15 for our documentation website.

### Our own `RefObject`

To have different types for `apiRef` in the DataGrid component for different React versions, we created our own `RefObject` type.

We used the fact that `useRef()` requires a param for React 19 to have `RefObject` evaluated to `MutableRefObject` for React < 19 and to `RefObject` otherwise.

```ts
// in React 19 useRef requires a parameter, so `() => any` will not match anymore
export type RefObject<T> = typeof React.useRef extends () => any
  ? React.MutableRefObject<T>
  : React.RefObject<T>;
```

## Conclusion

The migration to React 19 was a significant undertaking that required careful planning and execution. By breaking it down into two phases we were able to quickly provide React 19 compatibility for our users while we worked on our own migration.

The migration has also helped us identify areas where we can further improve our components' type safety and performance.

It is worth noting that a big chunk of our own migration was done by the MUI Core team as they added support for React 19 to both `@mui/material` v5 and v6. Additionally, they provided the necessary updates to the internal tools that both of our repositories use for building and testing our components.

We hope our experience can be useful and shorten the time needed for your own React 19 migration!
