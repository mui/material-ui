# Composition

Material-UI tries to make composition as easy as possible.

## Wrapping components

In order to provide the maximum flexibility and performance,
we need a way to know the nature of the child elements a component receives.
To solve this problem we tag some of our components when needed
with a `muiName` static property.

However, users like to wrap components in order to enhance them.
That can conflict with our `muiName` solution.
If you encounter this issue, you need to:
1. Forward the properties.
2. Use the same tag for your wrapping component that is used with the wrapped component.

Let's see an example:
```jsx
import React from 'react';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

const WrappedIcon = (props) => <Icon {...props} />;
WrappedIcon.muiName = 'Icon';

export default function HelloWorld(props) {
  return (
    <div>
      <IconButton>
        <Icon>alarm</Icon>
      </IconButton>
      <IconButton>
        <WrappedIcon>alarm</WrappedIcon>
      </IconButton>
    </div>
  );
}
```

## API consistency

You may have noticed some inconsistency in our API regarding composting components.
To provide some transparency, we have been using the following rules when designing the API:

1. Using the `children` property is the idiomatic way to do composition with React.
2. Something, we only need a limited children composition.
For instance, when we don't need to allow children order permutation.
Under this condition, providing explicit properties is making the implementation simpler and more performant.
For example, the `<Tab />` takes an `icon` and a `label` property.
3. API consistency matters.
