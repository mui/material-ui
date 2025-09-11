import * as React from 'react';
import { List, RowComponentProps } from 'react-window';
import { Popper } from '@mui/base/Popper';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import ListSubheader from '@mui/joy/ListSubheader';

const LISTBOX_PADDING = 6; // px

type DOMProps = {
  [key: string]: any; // Accept arbitrary props
};

function applyPropsToNode(outernode: HTMLElement | null, props: DOMProps): void {
  if (!outernode || typeof props !== 'object') {
    return;
  }

  Object.entries(props).forEach(([key, value]) => {
    if (key === 'className') {
      outernode.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(outernode.style, value);
    } else if (key.startsWith('aria-') || key === 'role' || key === 'id') {
      outernode.setAttribute(key, String(value));
    } else if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.toLowerCase() as keyof HTMLElementEventMap;
      (outernode as any)[eventName] = value;
    } else {
      outernode.setAttribute(key, String(value));
    }
  });
}

function renderRow(props: RowComponentProps & { data: any }) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
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
  } & React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, anchorEl, open, modifiers, ...other } = props;
  const itemData: Array<any> = [];
  (
    children as [Array<{ children: Array<React.ReactElement<any>> | undefined }>]
  )[0].forEach((item) => {
    if (item) {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  });

  const itemCount = itemData.length;
  const itemSize = 40;

  return (
    <Popper ref={ref} anchorEl={anchorEl} open={open} modifiers={modifiers}>
      <List
        rowCount={itemCount}
        rowHeight={itemSize}
        rowComponent={renderRow}
        rowProps={{ data: itemData }}
        style={{
          height: itemSize * 8,
          width: '100%',
          margin: 0,
        }}
        listRef={(outerNode) => {
          const domElement = outerNode?.element;

          if (domElement instanceof HTMLElement) {
            applyPropsToNode(domElement, other);
          }
        }}
        overscanCount={5}
        tagName="ul"
      />
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
        options={OPTIONS}
        groupBy={(option) => option[0].toUpperCase()}
        renderOption={(props, option) => [props, option] as React.ReactNode}
        // TODO: Post React 18 update - validate this conversion, look like a hidden bug
        renderGroup={(params) => params as unknown as React.ReactNode}
      />
    </FormControl>
  );
}
