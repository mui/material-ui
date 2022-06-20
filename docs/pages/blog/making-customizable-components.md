---
title: 'Making customizable components'
description: The use case of of data grid
date: 2022-06-23T00:00:00.000Z
authors: ['alexfauquette']
tags: ['MUI X']
---

At MUI, our goal is to empower as many people as possible to build great UIs.
To do so, we build React components and documentation used by hundreds of thousands of developers on everything from minor side projects to massive company websites.

This variety of users presents a dilemma: hobbyists working on side projects want fully built components that work right out of the box, so they can focus on the application logic; many larger companies, by contrast, want to be able to fully customize components to respect their brand design.
Managing these contradictory needs becomes harder as component complexity increases.

This article reviews several different approaches to customizing components, as well as the various tradeoffs associated with each method.
Along the way, we’ll explore how these tradeoffs ultimately led to the solution that we’ve settled on for customizing MUI components.

## Style modification

If you already use a styling library, don’t hesitate to skip this part.
See you back in Logic modification section

### Good old CSS

Let's start with the easiest part: modifying the style.
This will necessarily involve CSS.
Especially the notion of [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity), which says that if an element is targeted by two CSS selectors, the browser will apply the more specific one.
Most of the time it is the selector using more classes.

For example, if we look at a switch component, we have multiple subcomponents that we could expect to modify.
For each of them, we assign a specific CSS class:

<img src="/static/blog/making-customizable-components/switchHighlighted.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Switch component with highlighted sub components" />

Notice that each element is styled using only one CSS class— the thumb style, for example, is applied with the `css-jsexje-MuiSwitch-thumb` class.
So any CSS selector that includes more than one class will override its style.

I’m not a designer, so I made an ugly switch example using only CSS.
You can play with those examples in a [codesandbox](https://codesandbox.io/s/fast-http-kv85p5?file=/src/App.js)

<img src="/static/blog/making-customizable-components/uglySwitches.png" style="width: 200px; margin-top: 16px; margin-bottom: 8px;" alt="Switch customized with CSS" />

```jsx
<Switch className="uglySwitch" />

// two classes are more specific than the default single class selector
.uglySwitch .MuiSwitch-thumb {
 background-color: 'green';
}
.uglySwitch .MuiTouchRipple-root {
 border: 'solid red 2px';
}
.uglySwitch .MuiSwitch-track {
 background-color: 'orange';
 opacity: 1;
}
```

### Let JS generate the CSS

Maybe you don’t want to invest too much time digging through long and cluttered stylesheets just to find the single instance where this padding or that margin is defined.
Maybe you’re sick of mindlessly adjusting hex values in a hundred different places because the designer decided that “blue” should be #29b6f6 instead of #4fc3f7.

You maybe be don’t want to spend time writing long CSS files, spending time saying “In which file is define this f\*\*\*ing 5px padding?” or modifying all your files, because a designer decided that blue should be #29b6f6 instead of #4fc3f7.

Over time, MUI has added multiple ways to customize components.
If you want more information on this topic, you can have a look at the [documentation](https://mui.com/material-ui/customization/how-to-customize/)

## Logic modification

Styling is not the only thing you need to customize.
You may have to modify the logic, which will have to be handled by the component itself.

### Add a prop

Consider a component that lets users rate a product..
Going from 1 to 5 stars is good.
But maybe you need to go up to 10.
To do so we can add a `max` prop and render as many stars as the value of `max`.

That works well enough for a simple UI element, but what happens when the component in question has many more moving parts?

End of the article, you now know how to customize component

### It’s never that simple

Let’s play with a slightly more complex component: the [`DataGrid`](link to data grid docs).
This component allows you to manage data by applying sorting, filtering, editing, exporting, and many other -INGs.

Consider the following feature request: And together we will try to answer an open issue I get.

:::info
[DataGrid] Sorting column options by alphabetical order

When I open the filterPanel, the input listing the names of the columns is sorted according to column position.
I would like to sort it by alphabetical order.
<img src="/static/blog/making-customizable-components/issueScreenshot.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Screen shot of the filter panel with column selector un sorted" />
:::

This request makes sense.
When you have a lot of columns, sorting them can make it easier to browse the list.
But how should we implement this kind of customization?

Adding a prop called `filterPanelColumnInputSortingStrategy` could work, but please don’t do that.
It just doesn’t scale.
There are too many different properties that developers might need to modify.
You will end up with API documentation so long that it will take an eternity to scroll to the end—so nobody will read it.

<img src="/static/blog/making-customizable-components/bruce.gif" style="width: 500px; margin-top: 16px; margin-bottom: 8px;" alt="Your user opening the list of props" />

Here are a few better solutions that can scale more efficiently with complex components.

### Other solutions

#### Don’t bother with components

Passing all the parameters as props of a single component does not work.
So just don’t create components.

It’s not a joke—that’s the approach of headless libraries such as react-table.
Instead of providing working components, they only provide hooks for managing the features, and let developers build their components on top of that.

If you’re willing to start from scratch, that's a nice approach.
Use one hook to manage filtering, another one to manage the sorting, and then build your UI using returned values.

This approach can scale because you can scope parameters to individual features.
The filtering hooks will only take into account parameters impacting the filtering, and so on—so you can split your code feature by feature.

But because this is a fully custom approach, it will take the most amount of work relative to all other options to construct a functional UI.
If your main priority is to get up and running quickly, then this may not be a viable solution.

#### Subdivide your components

Another approach I like is to provide subcomponents.
This is what we do for MUI Core components such as the [Menu](https://mui.com/material-ui/react-menu/).

This is also the approach used by [react-admin](https://marmelab.com/react-admin/) to provide a customizable administration interface.
Here is their quick start example.
The idea is to put the `Admin` component at the root level of the app.
It is a provider that’s responsible for managing all data fetching and passing that data back to components.

The second important component is `ListGuesser` which defines how the data should be displayed.

```jsx
import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider = simpleRestProvider('https://domain.tld/api');

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={ListGuesser} />
  </Admin>
);
export default App;
```

If you’re unhappy with the rendering of the `ListGuesser`, then you can define your own components by reusing smaller components.
If you’re unhappy with the smaller components, you can replace them with custom ones, and so on.

So you start with a component that’s fully functional right out of the box, and you can rewrite any of its constituent elements as needed.

This approach has **one major advantage**: it gives you a lot of flexibility.
For example, you can easily modify the order of the components and their parent/children relationships.

This approach has also **one major drawback**:it gives you a lot of flexibility.
For example, you can easily modify the order of components in a bad way.
_The more freedom, the more bugs_.

##### Drawback example

To show you how easy it is to make a mistake using this technique, here is a personal example involving Material UI components.

I recently tried to wrap a `TextField` component in a `FormControl`, and was frustrated when it didn’t work.
But the reason why is quite simple: the `TextField` component is itself composed of an input wrapped inside of a `FormControl`, and neither TypeScript nor `console.error` messages could warn me that my rendered markup was redundant and broken.

```jsx
<FormControl>
  <TextField>
</FormControl>

// Equivalent to

<FormControl>
  <FormControl>
    <Label />
    <Input />
    <HelperText />
  </FormControl>
</FormControl>
```

This trade-off makes sense for react-admin, which is used for building complete websites.
Their users need complete freedom when it comes to rearranging components and introducing new components anywhere.

But MUI’s products exist at a lower level.
We focus on the building blocks, not the entire website (but we do have templates for that 😉).
So that’s not the approach we took for the `DataGrid`.

#### Keep a single component

On our side, we wanted to make it as simple as possible to add the DataGrid to your application, so we stuck with the individual component structure — e.g., to create a new data grid, all you need is `<DataGrid rows={...} columns={...} />`.

To customize this single component, we use what we call the slot strategy.

## The slot solution

Now we are back to the original problem—let’s look at how we use slots to balance the freedom to customize with the need to avoid building from scratch.

### Overriding default components

First let’s modify the appearance of the grid.
For color, spacing, and other basic properties you have CSS, but not everything is style related.

Here is a view of the grid with the filter panel open.
There’s an x icon on the left side of the panel for deleting the current filter.

Say you want to replace this x with a trash icon.
You can’t do it with CSS—you need DOM modification to replace the SVG icon.

<img src="/static/blog/making-customizable-components/FilterPanel.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Default view of filter panel" />

To manage such a scenario, the `<DataGrid />` has a prop called `components`.
This prop lets you replace some internal grid components with your custom ones.
In this case, the component to replace is the `FilterPanelDeleteIcon`, which becomes `DeleteIcon`.

```jsx
<DataGrid {...data} components={{ FilterPanelDeleteIcon: DeleteIcon }} />
```

That’s all it takes.
For every icon, there is a corresponding key in `components` that we call a slot.
If you provide a component to a slot, your component will be used instead of the default one.

### Passing props

Slots make it simple to override small components.
But our initial goal was to modify the order of the column selector.
We can’t provide a slot to override this selector alone, or else we would need to provide one for all of the inputs and buttons, which are too numerous to keep track of.

We could use a slot to override the all filter panel.
We provide this slot just in case you need a fully customized panel.
But honestly, who wants to rewrite an entire component for a simple sorting options?

What would be nice is to have a prop called `columnsSort` that lets you apply ascending and descending order on the column selector.
By adding this prop to the default filter panel, we can derive a customized filter panel from the default like this:

```jsx
import { GridFilterPanel } from '@mui/x-data-grid';

const CustomFilterPanel = (props) => (
  <GridFilterPanel {...props} columnsSort="asc" />
);
```

But this strategy of adding props to customize components is a bit verbose.
So we added a way to pass props to an existing component using `componentsProps`.
You can pass props to every slot on `components` using `componentsProps`.
Here’s how to to pass `columnsSort='asc'` to the filter panel slot:

```jsx
<DataGrid
  componentsProps={{
    filterPanel: {
      columnsSort: 'asc',
    },
  }}
/>
```

This way of passing props is nice, because it scopes them.
Props for the filter panel are together in `componentProps.filterPanel`.
And the same goes for the toolbar, the column menu, and all other components.

It also works pretty well with TypeScript autocomplete, because none of the slots have very many props.
So as soon as you’ve specified which slot you want to pass props to, your IDE will make good recommendations.

## What should I use?

If your goal is to customize the style, please don’t start from scratch—use libraries to manage your CSS.
By using good standards on class management, you should be able to provide style which is easy to override.

You should add props to the component if they impact the entire component.
For example disabling filtering will impact the all grid.

You should add slots to override icons, because it is frequent to want to replace them by another ones, so it should be easy to do.

Slots should also be added when your component is somewhat independent from the main one.
For example a grid can exist without its filter panel, or without its toolbar.
