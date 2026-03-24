import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import {
  List,
  RowComponentProps,
  useListRef,
  ListImperativeAPI,
} from 'react-window';
import Typography from '@mui/material/Typography';

const LISTBOX_PADDING = 8; // px

type OptionRow = React.ReactElement<{
  option: string;
  index: number;
  style?: React.CSSProperties;
}>;

type ItemData = Array<
  | {
      key: number;
      group: string;
      children: OptionRow[];
    }
  | OptionRow
>;

function RowComponent({
  index,
  itemData,
  style,
}: RowComponentProps & {
  itemData: ItemData;
}) {
  const dataSet = itemData[index];
  const inlineStyle = {
    ...style,
    top: ((style.top as number) ?? 0) + LISTBOX_PADDING,
  };

  if ('group' in dataSet) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return React.cloneElement(dataSet, {
    style: { ...dataSet.props.style, ...inlineStyle },
  });
}

// Adapter for react-window v2
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement> & {
    internalListRef: React.Ref<ListImperativeAPI>;
    onItemsBuilt: (optionIndexMap: Map<string, number>) => void;
  }
>(function ListboxComponent(props, ref) {
  const { children, internalListRef, onItemsBuilt, ...other } = props;
  const itemData: ItemData = [];
  const optionIndexMap = React.useMemo(() => new Map<string, number>(), []);

  const childItems = (Array.isArray(children) ? children : [children]).filter(
    Boolean,
  ) as ItemData;

  childItems.forEach((item) => {
    itemData.push(item);
    if ('children' in item && Array.isArray(item.children)) {
      itemData.push(...item.children);
    }
  });

  // Map option values to their indices in the flattened array
  itemData.forEach((item, index) => {
    if (React.isValidElement(item)) {
      optionIndexMap.set(item.props.option, index);
    }
  });

  React.useEffect(() => {
    if (onItemsBuilt) {
      onItemsBuilt(optionIndexMap);
    }
  }, [onItemsBuilt, optionIndexMap]);

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: ItemData[number]) => {
    if (child.hasOwnProperty('group')) {
      return 48;
    }
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  // Separate className for List, other props for wrapper div (ARIA, handlers)
  const { className, style, ...otherProps } = other;

  return (
    <div ref={ref} {...otherProps}>
      <List
        className={className}
        listRef={internalListRef}
        key={itemCount}
        rowCount={itemCount}
        rowHeight={(index) => getChildSize(itemData[index])}
        rowComponent={RowComponent}
        rowProps={{ itemData }}
        style={{
          height: getHeight() + 2 * LISTBOX_PADDING,
          width: '100%',
        }}
        overscanCount={5}
        tagName="ul"
      />
    </div>
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

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const OPTIONS = Array.from(new Array(10000))
  .map(() => random(10 + Math.ceil(Math.random() * 20)))
  .sort((a: string, b: string) => a.toUpperCase().localeCompare(b.toUpperCase()));

export default function Virtualize() {
  // Use react-window v2's useListRef hook for imperative API access
  const internalListRef = useListRef(null);
  const optionIndexMapRef = React.useRef<Map<string, number>>(new Map());

  const handleItemsBuilt = React.useCallback(
    (optionIndexMap: Map<string, number>) => {
      optionIndexMapRef.current = optionIndexMap;
    },
    [],
  );

  // Handle keyboard navigation by scrolling to highlighted option
  const handleHighlightChange = (
    event: React.SyntheticEvent,
    option: string | null,
  ) => {
    if (option && internalListRef.current) {
      const index = optionIndexMapRef.current.get(option);
      if (index !== undefined) {
        internalListRef.current.scrollToRow({ index, align: 'auto' });
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: 300 }}
      disableListWrap
      options={OPTIONS}
      groupBy={(option) => option[0].toUpperCase()}
      renderInput={(params) => <TextField {...params} label="10,000 options" />}
      renderOption={(props, option, state) => (
        <Typography component="li" {...props} noWrap>
          {`#${state.index + 1} - ${option}`}
        </Typography>
      )}
      renderGroup={(params) => params as any}
      onHighlightChange={handleHighlightChange}
      slots={{
        popper: StyledPopper,
      }}
      slotProps={{
        listbox: {
          component: ListboxComponent,
          virtualized: true,
          internalListRef,
          onItemsBuilt: handleItemsBuilt,
        } as any,
      }}
    />
  );
}
