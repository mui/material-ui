const React = require('react');
const Button = require('@mui/material/Button').default;
const Collapse = require('@mui/material/Collapse').default;
const CssBaseline = require('@mui/material/CssBaseline').default;
const List = require('@mui/material/List').default;
const ListItem = require('@mui/material/ListItem').default;
const ListItemText = require('@mui/material/ListItemText').default;
const Stack = require('@mui/material/Stack').default;
const Typography = require('@mui/material/Typography').default;
const { TransitionGroup } = require('react-transition-group');

const h = React.createElement;

function ListWithTransitions() {
  const [items, setItems] = React.useState([
    { id: 1, label: 'Initial item' },
    { id: 2, label: 'Second item' },
  ]);
  const [lastIsAppearing, setLastIsAppearing] = React.useState('pending');

  const handleAdd = () => {
    setItems((currentItems) => [
      ...currentItems,
      { id: currentItems.length + 1, label: `Added item ${currentItems.length + 1}` },
    ]);
  };

  const handleEntered = React.useCallback((node, isAppearing) => {
    window.__MUI_WEBPACK_CJS_BROWSER_SMOKE__ = { lastIsAppearing: isAppearing };
    setLastIsAppearing(String(isAppearing));
  }, []);

  return h(
    React.Fragment,
    null,
    h(CssBaseline),
    h(
      'main',
      {
        style: {
          maxWidth: 640,
          margin: '0 auto',
          padding: 32,
          fontFamily: 'system-ui, sans-serif',
        },
      },
      h(
        Stack,
        { spacing: 2 },
        h(Typography, { component: 'h1', variant: 'h4' }, 'Webpack CJS browser smoke test'),
        h(
          Typography,
          { color: 'text.secondary' },
          'This app uses CommonJS require() calls and is bundled for the browser.',
        ),
        h(Button, { onClick: handleAdd, variant: 'contained' }, 'Add item'),
        h(Typography, { component: 'p' }, `Last isAppearing: ${lastIsAppearing}`),
        h(
          List,
          {
            dense: true,
            sx: { border: '1px solid', borderColor: 'divider', borderRadius: 1 },
          },
          h(
            TransitionGroup,
            null,
            items.map((item) =>
              h(
                Collapse,
                { key: item.id, timeout: 0, onEntered: handleEntered },
                h(ListItem, null, h(ListItemText, { primary: item.label })),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

module.exports = { ListWithTransitions };
