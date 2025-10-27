import * as React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-window';
import { Popper } from '@mui/base/Popper';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import ListSubheader from '@mui/joy/ListSubheader';
import AutocompleteListbox from '@mui/joy/AutocompleteListbox';

const LISTBOX_PADDING = 6; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top ?? 0) + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="li" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <AutocompleteOption {...dataSet[0]} style={inlineStyle}>
      {dataSet[1]}
    </AutocompleteOption>
  );
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, anchorEl, open, modifiers, internalListRef, ...other } = props;
  const itemData = [];
  const optionIndexMap = new Map();

  if (children && Array.isArray(children) && children[0]) {
    children[0].forEach((item) => {
      if (item) {
        itemData.push(item);
        itemData.push(...(item.children || []));
      }
    });
  }

  // Build the index map after flattening
  itemData.forEach((item, index) => {
    if (Array.isArray(item) && item[1]) {
      // Option item: [props, optionValue]
      optionIndexMap.set(item[1], index);
    }
  });

  const itemCount = itemData.length;
  const itemSize = 40;

  return (
    <Popper ref={ref} anchorEl={anchorEl} open={open} modifiers={modifiers}>
      <AutocompleteListbox
        {...other}
        component="div"
        sx={{
          '& ul': {
            padding: 0,
            margin: 0,
            flexShrink: 0,
          },
          maxHeight: '100%',
        }}
      >
        <List
          listRef={(api) => {
            // Store both the API and the map in the ref
            if (internalListRef) {
              internalListRef.current = { api, optionIndexMap };
            }
          }}
          rowCount={itemCount}
          rowHeight={itemSize}
          rowComponent={renderRow}
          rowProps={{ data: itemData }}
          style={{
            height: itemSize * 8,
            width: '100%',
          }}
          overscanCount={5}
          tagName="ul"
        />
      </AutocompleteListbox>
    </Popper>
  );
});

ListboxComponent.propTypes = {
  anchorEl: PropTypes.any.isRequired,
  children: PropTypes.node,
  internalListRef: PropTypes.shape({
    current: PropTypes.shape({
      api: PropTypes.shape({
        element: PropTypes.object,
        scrollToRow: PropTypes.func.isRequired,
      }),
      optionIndexMap: PropTypes /* @typescript-to-proptypes-ignore */.shape({
        '__@iterator@76': PropTypes.func.isRequired,
        '__@toStringTag@1117': PropTypes.string.isRequired,
        clear: PropTypes.func.isRequired,
        delete: PropTypes.func.isRequired,
        entries: PropTypes.func.isRequired,
        forEach: PropTypes.func.isRequired,
        get: PropTypes.func.isRequired,
        has: PropTypes.func.isRequired,
        keys: PropTypes.func.isRequired,
        set: PropTypes.func.isRequired,
        size: PropTypes.number.isRequired,
        values: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  modifiers: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
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

export default function Virtualize() {
  // Ref to store both the List API and the option index map
  const internalListRef = React.useRef({
    api: null,
    optionIndexMap: new Map(),
  });

  // Handle keyboard navigation by scrolling to highlighted option
  const handleHighlightChange = (event, option) => {
    if (option && internalListRef.current) {
      const { api, optionIndexMap } = internalListRef.current;
      const index = optionIndexMap.get(option);
      if (index !== undefined && api) {
        api.scrollToRow({ index, align: 'auto' });
      }
    }
  };

  return (
    <FormControl id="virtualize-demo">
      <FormLabel>10,000 options</FormLabel>
      <Autocomplete
        sx={{ width: 300 }}
        disableListWrap
        placeholder="Type to search"
        slots={{
          listbox: ListboxComponent,
        }}
        slotProps={{
          listbox: {
            internalListRef,
          },
        }}
        options={OPTIONS}
        groupBy={(option) => option[0].toUpperCase()}
        renderOption={(props, option) => [props, option]}
        // TODO: Post React 18 update - validate this conversion, look like a hidden bug
        renderGroup={(params) => params}
        onHighlightChange={handleHighlightChange}
      />
    </FormControl>
  );
}
