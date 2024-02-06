# Contributing

## Creating a new hook

### File structure

When creating a new hook, follow the file structure found in other hooks' directories:

Taking the imaginary `useAwesomeControl` as an example:

- 📂 `useAwesomeControl`
  - 📄 `index.ts` - aggregates the public exports from all the other files in the directory
  - 📄 `useAwesomeControl.test.tsx` - unit tests
  - 📄 `useAwesomeControl.spec.tsx` - (optional) type tests
  - 📄 `useAwesomeControl.ts` - the implementation of the hook
  - 📄 `useAwesomeControl.types.ts` - type definitions

### Implementation

Most Base UI hooks have a similar structure:

1. [Parameters destructuring](#parameters-destructuring)
2. Hook-specific logic
3. [Event handler factory functions](#event-handler-factory-functions)
4. [Slot props resolvers](#slot-props-resolvers)

#### Parameters destructuring

The parameters type must be called `[HookName]Parameters`.
There are docs generation scripts that require this pattern.

```ts
function useAwesomeControl(parameters: UseAwesomeControlParameters) {
  const { disabled, readOnly } = parameters;

  // the rest of the hook's logic...
}
```

#### Event handler factory functions

We don't define event handlers directly as functions because they must be able to access and call other handlers provided by developers in slot props resolvers.

In other words, instead of defining the `handleClick(event: React.MouseEvent) => void` function, we define the `createHandleClick(otherHandlers: EventHandlers) => (event: React.MouseEvent) => void`. The `otherHandlers` parameter contains external handlers provided by developers.

By convention, we call them `createHandle[EventName]`.

If we allow a developer to skip running our logic for a given handler, we check the `event.defaultMuiPrevented` field. It's an equivalent of the native `defaultPrevented` that works just for Base UI code:

```tsx
const createHandleKeyDown = (otherHandlers: EventHandlers) => (event: React.KeyboardEvent & MuiCancellableEvent) => {
  // Run the external handler first.
  // It can potentially set the defaultMuiPrevented field.
  otherHandlers.onKeyDown?.(event);

  // If the field is set, do not execute the usual handler logic.
  if (event.defaultMuiPrevented) {
    return;
  }

  // handler-specific logic...
```

#### Slot props resolvers

These are functions called `get[SlotName]Props` that accept additional (optional) props and return props to be placed on slots of a component.
Many components have just one slot (that we call "root"), but more complex components can have more.

The order of merging props for the resulting object is important so that users can override the build-in props when necessary:

1. built-in props
2. external props
3. ref
4. event handlers

Refs and event handlers can be placed in any order.
They just have to be after external props.

Example:

```tsx
const getRootProps = <OtherHandlers extends EventHandlers>(
  otherHandlers: OtherHandlers = {} as OtherHandlers,
): UseAwesomeControlRootSlotProps<OtherHandlers> => {
  return {
    id,
    disabled,
    role: 'button' as const,
    ...otherHandlers, // if `id`, `disabled`, or `role` is provided here, they will override the default values set by us.
    ref: handleListboxRef, // refs mustn't be overridden, so they come after `...otherHandlers`
    onMouseDown: createHandleMouseDown(otherHandlers), // here we execute the event handler factory supplying it with external props
  };
};
```

It's common that a hook uses other hooks and combines their `get*Props` with its own.
To handle these cases, we have the `combineHooksSlotProps` utility.
It creates a function that merges two other slot resolver functions:

```tsx
const createHandleClick = (otherHandlers: EventHandlers) => (event: React.KeyboardEvent) => {
  /* ... */
}

const { getRootProps as getListRootProps } = useList(/* ... */);
const getOwnRootEventHandlers = (otherHandlers: EventHandlers = {}) => ({
  onClick: createHandleClick(otherHandlers),
});

const getRootProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseAwesomeControlRootSlotProps => {
    const getCombinedRootProps = combineHooksSlotProps(getOwnRootEventHandlers, getListRootProps);
    return {
      ...getCombinedRootProps(otherHandlers),
      role: 'combobox'
    }
  }

```

#### Ref handling

When a hook needs to access the DOM node it operates on, it should create a ref and return it in the `get*Props` function.
However, since the user of the hook may already have a ref to the element, we accept the refs in parameters and merge them with our refs using the `useForkRef` function, so the callers of the hook don't have to do it.

Since hooks can operate on many elements (when dealing with multiple slots), we call refs in input parameters `[slotName]Ref`.

Example:

```ts

interface AwesomeControlHookParameters {
  rootRef?: React.Ref<Element>;
  // ...
}

const useAwesomeControlHook = (parameters: AwesomeControlHookParameters) {
  const { rootRef: externalRef } = parameters;
  const innerRef = React.useRef<HTMLDivElement | null>(null);

  const handleRef = useForkRef(externalRef, innerRef);

  return {
    // parameters omitted for the sake of brevity
    getRootProps: () => {
      ref: handleRef
    },
    rootRef: handleRef
  }
}
```

Note that the merged ref (`handleRef`) is not only returned as a part of root props but also as a field of the hook's return object.
This is helpful in situations where the ref needs to be merged with yet another ref.

### Types

Defining proper types can tremendously help developers use the hooks.
The following types are required for each hook:

- [HookName]Parameters - input parameters
- [HookName]ReturnValue - the shape of the object returned by the hook
- [HookName][SlotName]SlotProps - return values of slot props resolvers

The parameters and return value types are usually straightforward.
The definition of slot props, however, is more complex as it must take into consideration the object passed as an argument to the props resolver function:

```ts
export interface UseMenuReturnValue {
  getListboxProps: <TOther extends EventHandlers>(
    otherHandlers?: TOther,
  ) => UseMenuListboxSlotProps;
  // ...
}

interface UseMenuListboxSlotEventHandlers {
  onBlur: React.FocusEventHandler;
  onKeyDown: React.KeyboardEventHandler;
}

export type UseMenuListboxSlotProps<TOther = {}> = UseListRootSlotProps<
  Omit<TOther, keyof UseMenuListboxSlotEventHandlers> & UseMenuListboxSlotEventHandlers
> & {
  ref: React.RefCallback<Element> | null;
  role: React.AriaRole;
};
```
