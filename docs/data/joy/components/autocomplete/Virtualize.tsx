import * as React from 'react';
import { List, RowComponentProps, ListImperativeAPI } from 'react-window';
import { Popper } from '@mui/base/Popper';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import ListSubheader from '@mui/joy/ListSubheader';
import AutocompleteListbox, {
  AutocompleteListboxProps,
} from '@mui/joy/AutocompleteListbox';

const LISTBOX_PADDING = 6; // px

function renderRow(props: RowComponentProps & { data: any }) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: ((style.top as number) ?? 0) + LISTBOX_PADDING,
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
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  {
    anchorEl: any;
    open: boolean;
    modifiers: any[];
    internalListRef: React.MutableRefObject<{
      api: ListImperativeAPI | null;
      optionIndexMap: Record<string, number>;
    }>;
  } & React.HTMLAttributes<HTMLElement> &
    AutocompleteListboxProps
>(function ListboxComponent(props, ref) {
  const { children, anchorEl, open, modifiers, internalListRef, ...other } = props;
  const itemData: Array<any> = [];
  const optionIndexMap: Record<string, number> = {};

  if (children && Array.isArray(children) && children[0]) {
    (
      children as [Array<{ children: Array<React.ReactElement<any>> | undefined }>]
    )[0].forEach((item) => {
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
      optionIndexMap[item[1]] = index;
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

function random(length: number) {
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
  const internalListRef = React.useRef<{
    api: ListImperativeAPI | null;
    optionIndexMap: Record<string, number>;
  }>({
    api: null,
    optionIndexMap: {},
  });

  // Handle keyboard navigation by scrolling to highlighted option
  const handleHighlightChange = (
    event: React.SyntheticEvent,
    option: string | null,
  ) => {
    if (option && internalListRef.current) {
      const { api, optionIndexMap } = internalListRef.current;
      const index = optionIndexMap[option];
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
          } as any,
        }}
        options={OPTIONS}
        groupBy={(option) => option[0].toUpperCase()}
        renderOption={(props, option) => [props, option] as React.ReactNode}
        // TODO: Post React 18 update - validate this conversion, look like a hidden bug
        renderGroup={(params) => params as unknown as React.ReactNode}
        onHighlightChange={handleHighlightChange}
      />
    </FormControl>
  );
}
