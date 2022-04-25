# Callouts

<p class="description">Type of callouts.</p>

```jsx
const GridToolbarContainerStyled = styled(GridToolbarContainer)({
  padding: 40,
});

function MyCustomToolbar() {
  return (
    <GridToolbarContainerStyled>
      My custom toolbar
    </GridToolbarContainer>
  );
};

export default function App() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid components={{ Toolbar: MyCustomToolbar }} />
    </div>
  );
}
```

:::error
This is an error alert — check it out!
:::

:::info
This is an info alert — check it out!
:::

:::warning
This is an warning alert — check it out!
:::

:::success
This is an success alert — check it out!
:::

:::info

**Title**

Some description

- list item 1
- list item 2
  ```js
  <div>Test</div>
  ```
- list item 3
  ```js
  <div>Test</div>
  ```

:::
