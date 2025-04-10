import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import { useVirtualizer } from '@tanstack/react-virtual';

const createVirtualizedAutocompleteListboxComponent = (options) =>
  function Listbox({ ref, children, role, ...props }) {
    const items = React.Children.toArray(children);
    const parentRef = React.useRef(null);
    const rowVirtualizer = useVirtualizer({
      count: items.length,
      getScrollElement: () => parentRef.current,
      ...options,
    });

    return (
      <div ref={ref}>
        <div ref={parentRef} role={role} style={{ overflowY: 'auto' }} {...props}>
          <List
            sx={{
              height: rowVirtualizer.getTotalSize(),
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map(({ index, size, start }) => {
              const item = items[index];
              return React.cloneElement(item, {
                sx: {
                  ...item.props.sx,
                  height: size,
                  left: 0,
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${start}px)`,
                },
              });
            })}
          </List>
        </div>
      </div>
    );
  };

function random(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const OPTIONS = Array.from(new Array(10000))
  .map(() => random(10 + Math.ceil(Math.random() * 20)))
  .sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));

const ListboxComponent = createVirtualizedAutocompleteListboxComponent({
  estimateSize: () => 48,
  overscan: 5,
});

export default function VirtualizeWithTanstackVirtual() {
  return (
    <Autocomplete
      sx={{ width: 300 }}
      disableCloseOnSelect
      disableListWrap
      options={OPTIONS}
      renderInput={(params) => <TextField {...params} label="10,000 options" />}
      multiple
      renderOption={({ key, ...props }, option, optionState, _ownerState) => (
        <ListItem {...props} key={key}>
          <Checkbox checked={optionState.selected} edge="start" />
          <ListItemText primary={option} />
        </ListItem>
      )}
      slotProps={{
        listbox: {
          component: ListboxComponent,
        },
      }}
    />
  );
}
