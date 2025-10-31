---
productId: material-ui
title: React Pagination component
components: Pagination, PaginationItem, TablePagination, TablePaginationActions
githubLabel: 'scope: pagination'
githubSource: packages/mui-material/src/Pagination
---

# Pagination

The Pagination component enables the user to select a specific page from a range of pages.

## Basic pagination

```tsx
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} />
      <Pagination count={10} color="primary" />
      <Pagination count={10} color="secondary" />
      <Pagination count={10} disabled />
    </Stack>
  );
}
```

## Outlined pagination

```tsx
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationOutlined() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} variant="outlined" />
      <Pagination count={10} variant="outlined" color="primary" />
      <Pagination count={10} variant="outlined" color="secondary" />
      <Pagination count={10} variant="outlined" disabled />
    </Stack>
  );
}
```

## Rounded pagination

```tsx
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} shape="rounded" />
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
  );
}
```

## Pagination size

```tsx
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationSize() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} size="small" />
      <Pagination count={10} />
      <Pagination count={10} size="large" />
    </Stack>
  );
}
```

## Buttons

You can optionally enable first-page and last-page buttons, or disable the previous-page and next-page buttons.

```tsx
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationButtons() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} showFirstButton showLastButton />
      <Pagination count={10} hidePrevButton hideNextButton />
    </Stack>
  );
}
```

## Custom icons

It's possible to customize the control icons.

```tsx
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function CustomIcons() {
  return (
    <Stack spacing={2}>
      <Pagination
        count={10}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
```

## Pagination ranges

You can specify how many digits to display either side of current page with the `siblingCount` prop, and adjacent to the start and end page number with the `boundaryCount` prop.

```tsx
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRanges() {
  return (
    <Stack spacing={2}>
      <Pagination count={11} defaultPage={6} siblingCount={0} />
      <Pagination count={11} defaultPage={6} /> {/* Default ranges */}
      <Pagination count={11} defaultPage={6} siblingCount={0} boundaryCount={2} />
      <Pagination count={11} defaultPage={6} boundaryCount={2} />
    </Stack>
  );
}
```

## Controlled pagination

```tsx
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
  );
}
```

## Router integration

```tsx
import * as React from 'react';
import { Link, MemoryRouter, Route, Routes, useLocation } from 'react-router';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

function Content() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  return (
    <Pagination
      page={page}
      count={10}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
}

export default function PaginationLink() {
  return (
    <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
      <Routes>
        <Route path="*" element={<Content />} />
      </Routes>
    </MemoryRouter>
  );
}
```

## `usePagination`

For advanced customization use cases, a headless `usePagination()` hook is exposed.
It accepts almost the same options as the Pagination component minus all the props
related to the rendering of JSX.
The Pagination component is built on this hook.

```jsx
import usePagination from '@mui/material/usePagination';
```

```tsx
import * as React from 'react';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
});

export default function UsePagination() {
  const { items } = usePagination({
    count: 10,
  });

  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'page') {
            children = (
              <button
                type="button"
                style={{
                  fontWeight: selected ? 'bold' : undefined,
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button type="button" {...item}>
                {type}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
}
```

## Table pagination

The `Pagination` component was designed to paginate a list of arbitrary items when infinite loading isn't used.
It's preferred in contexts where SEO is important, for instance, a blog.

For the pagination of a large set of tabular data, you should use the `TablePagination` component.

```tsx
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function TablePaginationDemo() {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
```

:::warning
Note that the `Pagination` page prop starts at 1 to match the requirement of including the value in the URL, while the `TablePagination` page prop starts at 0 to match the requirement of zero-based JavaScript arrays that come with rendering a lot of tabular data.
:::

You can learn more about this use case in the [table section](/material-ui/react-table/#custom-pagination-options) of the documentation.

## Accessibility

### ARIA

The root node has a role of "navigation" and aria-label "pagination navigation" by default. The page items have an aria-label that identifies the purpose of the item ("go to first page", "go to previous page", "go to page 1" etc.).
You can override these using the `getItemAriaLabel` prop.

### Keyboard

The pagination items are in tab order, with a tabindex of "0".

# Pagination API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Pagination](https://mui.com/material-ui/react-pagination/)

## Import

```jsx
import Pagination from '@mui/material/Pagination';
// or
import { Pagination } from '@mui/material';
```

## Props

| Name             | Type                                                                        | Default                                  | Required | Description                                                                             |
| ---------------- | --------------------------------------------------------------------------- | ---------------------------------------- | -------- | --------------------------------------------------------------------------------------- |
| boundaryCount    | `integer`                                                                   | `1`                                      | No       |                                                                                         |
| classes          | `object`                                                                    | -                                        | No       | Override or extend the styles applied to the component.                                 |
| color            | `'primary' \| 'secondary' \| 'standard' \| string`                          | `'standard'`                             | No       |                                                                                         |
| count            | `integer`                                                                   | `1`                                      | No       |                                                                                         |
| defaultPage      | `integer`                                                                   | `1`                                      | No       |                                                                                         |
| disabled         | `bool`                                                                      | `false`                                  | No       |                                                                                         |
| getItemAriaLabel | `function(type: string, page: number \| null, selected: boolean) => string` | -                                        | No       |                                                                                         |
| hideNextButton   | `bool`                                                                      | `false`                                  | No       |                                                                                         |
| hidePrevButton   | `bool`                                                                      | `false`                                  | No       |                                                                                         |
| onChange         | `function(event: React.ChangeEvent<unknown>, page: number) => void`         | -                                        | No       |                                                                                         |
| page             | `integer`                                                                   | -                                        | No       |                                                                                         |
| renderItem       | `function(params: PaginationRenderItemParams) => ReactNode`                 | `(item) => <PaginationItem {...item} />` | No       |                                                                                         |
| shape            | `'circular' \| 'rounded'`                                                   | `'circular'`                             | No       |                                                                                         |
| showFirstButton  | `bool`                                                                      | `false`                                  | No       |                                                                                         |
| showLastButton   | `bool`                                                                      | `false`                                  | No       |                                                                                         |
| siblingCount     | `integer`                                                                   | `1`                                      | No       |                                                                                         |
| size             | `'small' \| 'medium' \| 'large' \| string`                                  | `'medium'`                               | No       |                                                                                         |
| sx               | `Array<func \| object \| bool> \| func \| object`                           | -                                        | No       | The system prop that allows defining system overrides as well as additional CSS styles. |
| variant          | `'outlined' \| 'text' \| string`                                            | `'text'`                                 | No       |                                                                                         |

> **Note**: The `ref` is forwarded to the root element (HTMLElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiPagination` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class | Rule name | Description                                                 |
| ------------ | --------- | ----------------------------------------------------------- |
| -            | outlined  | Styles applied to the root element if `variant="outlined"`. |
| -            | root      | Styles applied to the root element.                         |
| -            | text      | Styles applied to the root element if `variant="text"`.     |
| -            | ul        | Styles applied to the ul element.                           |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Pagination/Pagination.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Pagination/Pagination.js)

# PaginationItem API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Pagination](https://mui.com/material-ui/react-pagination/)

## Import

```jsx
import PaginationItem from '@mui/material/PaginationItem';
// or
import { PaginationItem } from '@mui/material';
```

## Props

| Name                    | Type                                                                                                  | Default      | Required | Description                                                                                                                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------- | ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| classes                 | `object`                                                                                              | -            | No       | Override or extend the styles applied to the component.                                                                                                                                                             |
| color                   | `'primary' \| 'secondary' \| 'standard' \| string`                                                    | `'standard'` | No       |                                                                                                                                                                                                                     |
| component               | `elementType`                                                                                         | -            | No       |                                                                                                                                                                                                                     |
| components (deprecated) | `{ first?: elementType, last?: elementType, next?: elementType, previous?: elementType }`             | `{}`         | No       | ⚠️ use the `slots` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| disabled                | `bool`                                                                                                | `false`      | No       |                                                                                                                                                                                                                     |
| page                    | `node`                                                                                                | -            | No       |                                                                                                                                                                                                                     |
| selected                | `bool`                                                                                                | `false`      | No       |                                                                                                                                                                                                                     |
| shape                   | `'circular' \| 'rounded'`                                                                             | `'circular'` | No       |                                                                                                                                                                                                                     |
| size                    | `'small' \| 'medium' \| 'large' \| string`                                                            | `'medium'`   | No       |                                                                                                                                                                                                                     |
| slotProps               | `{ first?: func \| object, last?: func \| object, next?: func \| object, previous?: func \| object }` | `{}`         | No       |                                                                                                                                                                                                                     |
| slots                   | `{ first?: elementType, last?: elementType, next?: elementType, previous?: elementType }`             | `{}`         | No       |                                                                                                                                                                                                                     |
| sx                      | `Array<func \| object \| bool> \| func \| object`                                                     | -            | No       | The system prop that allows defining system overrides as well as additional CSS styles.                                                                                                                             |
| type                    | `'end-ellipsis' \| 'first' \| 'last' \| 'next' \| 'page' \| 'previous' \| 'start-ellipsis'`           | `'page'`     | No       |                                                                                                                                                                                                                     |
| variant                 | `'outlined' \| 'text' \| string`                                                                      | `'text'`     | No       |                                                                                                                                                                                                                     |

> **Note**: The `ref` is forwarded to the root element (HTMLButtonElement).

> Any other props supplied will be provided to the root element ([ButtonBase](https://mui.com/material-ui/api/button-base/)).

## Inheritance

While not explicitly documented above, the props of the [ButtonBase](https://mui.com/material-ui/api/button-base/) component are also available on PaginationItem.

## Theme default props

You can use `MuiPaginationItem` to change the default props of this component with the theme.

## Slots

| Name     | Default              | Class | Description                                        |
| -------- | -------------------- | ----- | -------------------------------------------------- |
| first    | `FirstPageIcon`      | -     | The component that renders the first page slot.    |
| last     | `LastPageIcon`       | -     | The component that renders the last page slot.     |
| next     | `NavigateNextIcon`   | -     | The component that renders the next page slot.     |
| previous | `NavigateBeforeIcon` | -     | The component that renders the previous page slot. |

## CSS

### Rule name

| Global class        | Rule name         | Description                                                                             |
| ------------------- | ----------------- | --------------------------------------------------------------------------------------- |
| -                   | colorPrimary      | Styles applied to the root element if `color="primary"`.                                |
| -                   | colorSecondary    | Styles applied to the root element if `color="secondary"`.                              |
| `.Mui-disabled`     | -                 | State class applied to the root element if `disabled={true}`.                           |
| -                   | ellipsis          | Styles applied to the root element if `type="start-ellipsis"` or `type="end-ellipsis"`. |
| -                   | firstLast         | Styles applied to the root element if `type="first"` or type="last".                    |
| `.Mui-focusVisible` | -                 | State class applied to the root element if keyboard focused.                            |
| -                   | icon              | Styles applied to the icon to display.                                                  |
| -                   | outlined          | Styles applied to the root element if `variant="outlined"`.                             |
| -                   | outlinedPrimary   | Styles applied to the root element if `variant="outlined"` and `color="primary"`.       |
| -                   | outlinedSecondary | Styles applied to the root element if `variant="outlined"` and `color="secondary"`.     |
| -                   | page              | Styles applied to the root element if `type="page"`.                                    |
| -                   | previousNext      | Styles applied to the root element if `type="previous"` or type="next".                 |
| -                   | root              | Styles applied to the root element.                                                     |
| -                   | rounded           | Styles applied to the root element if `rounded="true"`.                                 |
| `.Mui-selected`     | -                 | State class applied to the root element if `selected={true}`.                           |
| -                   | sizeLarge         | Styles applied to the root element if `size="large"`.                                   |
| -                   | sizeSmall         | Styles applied to the root element if `size="small"`.                                   |
| -                   | text              | Styles applied to the root element if `variant="text"`.                                 |
| -                   | textPrimary       | Styles applied to the root element if `variant="text"` and `color="primary"`.           |
| -                   | textSecondary     | Styles applied to the root element if `variant="text"` and `color="secondary"`.         |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/PaginationItem/PaginationItem.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/PaginationItem/PaginationItem.js)

# TablePagination API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Pagination](https://mui.com/material-ui/react-pagination/)
- [Table](https://mui.com/material-ui/react-table/)

## Import

```jsx
import TablePagination from '@mui/material/TablePagination';
// or
import { TablePagination } from '@mui/material';
```

## Props

| Name                             | Type                                                                                 | Default                               | Required | Description                                             |
| -------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------- | -------- | ------------------------------------------------------- |
| count                            | `integer`                                                                            | -                                     | Yes      |                                                         |
| onPageChange                     | `function(event: React.MouseEvent<HTMLButtonElement> \| null, page: number) => void` | -                                     | Yes      |                                                         |
| page                             | `integer`                                                                            | -                                     | Yes      |                                                         |
| rowsPerPage                      | `integer`                                                                            | -                                     | Yes      |                                                         |
| ActionsComponent                 | `elementType`                                                                        | `TablePaginationActions`              | No       |                                                         |
| backIconButtonProps (deprecated) | `object`                                                                             | -                                     | No       | ⚠️ Use `slotProps.actions.previousButton` instead.      |
| classes                          | `object`                                                                             | -                                     | No       | Override or extend the styles applied to the component. |
| component                        | `elementType`                                                                        | -                                     | No       |                                                         |
| disabled                         | `bool`                                                                               | `false`                               | No       |                                                         |
| getItemAriaLabel                 | `function(type: string) => string`                                                   | `function defaultGetAriaLabel(type) { |

return `Go to ${type} page`;
}`| No |  |
| labelDisplayedRows |`func`|`function defaultLabelDisplayedRows({ from, to, count }) {
return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}`| No |  |
| labelRowsPerPage |`node`|`'Rows per page:'`| No |  |
| nextIconButtonProps (deprecated) |`object`| - | No | ⚠️ Use`slotProps.actions.nextButton`instead. |
| onRowsPerPageChange |`function(event: React.ChangeEvent<HTMLTextAreaElement \| HTMLInputElement>) => void`| - | No |  |
| rowsPerPageOptions |`Array<number \| { label: string, value: number }>`|`[10, 25, 50, 100]`| No |  |
| SelectProps (deprecated) |`object`|`{}`| No | ⚠️ Use`slotProps.select`instead. |
| showFirstButton |`bool`|`false`| No |  |
| showLastButton |`bool`|`false`| No |  |
| slotProps |`{ actions?: { firstButton?: object, firstButtonIcon?: object, lastButton?: object, lastButtonIcon?: object, nextButton?: object, nextButtonIcon?: object, previousButton?: object, previousButtonIcon?: object }, displayedRows?: func \| object, menuItem?: func \| object, root?: func \| object, select?: object, selectLabel?: func \| object, spacer?: func \| object, toolbar?: func \| object }`|`{}`| No |  |
| slots |`{ actions?: { firstButton?: elementType, firstButtonIcon?: elementType, lastButton?: elementType, lastButtonIcon?: elementType, nextButton?: elementType, nextButtonIcon?: elementType, previousButton?: elementType, previousButtonIcon?: elementType }, displayedRows?: elementType, menuItem?: elementType, root?: elementType, select?: elementType, selectLabel?: elementType, spacer?: elementType, toolbar?: elementType }`|`{}`| No |  |
| sx |`Array<func \| object \| bool> \| func \| object` | - | No | The system prop that allows defining system overrides as well as additional CSS styles. |

> **Note**: The `ref` is forwarded to the root element (HTMLTableCellElement).

> Any other props supplied will be provided to the root element ([TableCell](https://mui.com/material-ui/api/table-cell/)).

## Inheritance

While not explicitly documented above, the props of the [TableCell](https://mui.com/material-ui/api/table-cell/) component are also available on TablePagination.

## Theme default props

You can use `MuiTablePagination` to change the default props of this component with the theme.

## Slots

| Name                                                                                                                            | Default     | Class                               | Description                                  |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------- | -------------------------------------------- |
| root                                                                                                                            | `TableCell` | `.MuiTablePagination-root`          | The component that renders the root slot.    |
| [Follow this guide](https://mui.com/material-ui/api/table-cell/#props) to learn more about the requirements for this component. |
| toolbar                                                                                                                         | `Toolbar`   | `.MuiTablePagination-toolbar`       | The component that renders the toolbar slot. |
| [Follow this guide](https://mui.com/material-ui/api/toolbar/#props) to learn more about the requirements for this component.    |
| spacer                                                                                                                          | `'div'`     | `.MuiTablePagination-spacer`        | The tag that renders the spacer slot.        |
| selectLabel                                                                                                                     | `'p'`       | `.MuiTablePagination-selectLabel`   | The tag that renders the selectLabel slot.   |
| select                                                                                                                          | `Select`    | `.MuiTablePagination-select`        | The component that renders the select slot.  |
| [Follow this guide](https://mui.com/material-ui/api/select/#props) to learn more about the requirements for this component.     |
| menuItem                                                                                                                        | `MenuItem`  | `.MuiTablePagination-menuItem`      | The component that renders the select slot.  |
| [Follow this guide](https://mui.com/material-ui/api/menu-item/#props) to learn more about the requirements for this component.  |
| displayedRows                                                                                                                   | `'p'`       | `.MuiTablePagination-displayedRows` | The tag that renders the displayedRows slot. |
| actions                                                                                                                         | `undefined` | `.MuiTablePagination-actions`       | The slots that passed to the actions slot.   |

## CSS

### Rule name

| Global class | Rule name  | Description                                            |
| ------------ | ---------- | ------------------------------------------------------ |
| -            | input      | Styles applied to the Select component `root` element. |
| -            | selectIcon | Styles applied to the Select component `icon` class.   |
| -            | selectRoot | Styles applied to the Select component `root` element. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/TablePagination/TablePagination.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/TablePagination/TablePagination.js)

# TablePaginationActions API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Pagination](https://mui.com/material-ui/react-pagination/)

## Import

```jsx
import TablePaginationActions from '@mui/material/TablePaginationActions';
// or
import { TablePaginationActions } from '@mui/material';
```

## Props

| Name                             | Type                               | Default | Required | Description                                             |
| -------------------------------- | ---------------------------------- | ------- | -------- | ------------------------------------------------------- |
| getItemAriaLabel                 | `function(type: string) => string` | -       | Yes      |                                                         |
| backIconButtonProps (deprecated) | `object`                           | -       | No       | ⚠️ Use `slotProps.previousButton` instead.              |
| classes                          | `object`                           | -       | No       | Override or extend the styles applied to the component. |
| disabled                         | `bool`                             | `false` | No       |                                                         |
| nextIconButtonProps (deprecated) | `object`                           | -       | No       | ⚠️ Use `slotProps.nextButton` instead.                  |

> **Note**: The `ref` is forwarded to the root element (HTMLDivElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiTablePaginationActions` to change the default props of this component with the theme.

## Slots

| Name               | Default              | Class | Description                                          |
| ------------------ | -------------------- | ----- | ---------------------------------------------------- |
| firstButton        | `IconButton`         | -     | The component that renders the first button.         |
| lastButton         | `IconButton`         | -     | The component that renders the last button.          |
| nextButton         | `IconButton`         | -     | The component that renders the next button.          |
| previousButton     | `IconButton`         | -     | The component that renders the previous button.      |
| firstButtonIcon    | `FirstPageIcon`      | -     | The component that renders the first button icon.    |
| lastButtonIcon     | `LastPageIcon`       | -     | The component that renders the last button icon.     |
| nextButtonIcon     | `KeyboardArrowRight` | -     | The component that renders the next button icon.     |
| previousButtonIcon | `KeyboardArrowLeft`  | -     | The component that renders the previous button icon. |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/TablePaginationActions/TablePaginationActions.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/TablePaginationActions/TablePaginationActions.js)
