import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { List, useListRef } from 'react-window';
import Typography from '@mui/material/Typography';

const LISTBOX_PADDING = 8; // px

function RowComponent({ index, itemData, style }) {
  const dataSet = itemData[index];
  const inlineStyle = {
    ...style,
    top: (style.top ?? 0) + LISTBOX_PADDING,
  };

  const { key, ...optionProps } = dataSet[0];

  return (
    <Typography key={key} component="li" {...optionProps} noWrap style={inlineStyle}>
      {`#${dataSet[2] + 1} - ${dataSet[1]}`}
    </Typography>
  );
}

// Adapter for react-window v2

RowComponent.propTypes = {
  index: PropTypes.number.isRequired,
  itemData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.string])
        .isRequired,
    ),
  ).isRequired,
  style: PropTypes.object.isRequired,
};

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, internalListRef, onItemsBuilt, ...other } = props;
  const itemData = children;

  const optionIndexMap = React.useMemo(() => {
    const map = new Map();

    itemData.forEach((item, index) => {
      map.set(item[1], index);
    });

    return map;
  }, [itemData]);

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

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemCount * itemSize;
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
        rowHeight={itemSize}
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

ListboxComponent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  internalListRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        element: PropTypes.object,
        scrollToRow: PropTypes.func.isRequired,
      }),
    }),
  ]),
  onItemsBuilt: PropTypes.func.isRequired,
  style: PropTypes.object,
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
  .sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));

export default function Virtualize() {
  // Use react-window v2's useListRef hook for imperative API access
  const internalListRef = useListRef(null);
  const optionIndexMapRef = React.useRef(new Map());

  const handleItemsBuilt = React.useCallback((optionIndexMap) => {
    optionIndexMapRef.current = optionIndexMap;
  }, []);

  // Handle keyboard navigation by scrolling to highlighted option
  const handleHighlightChange = (_event, option) => {
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
      renderInput={(params) => <TextField {...params} label="10,000 options" />}
      renderOption={(props, option, state) => [props, option, state.index]}
      onHighlightChange={handleHighlightChange}
      slots={{
        popper: StyledPopper,
      }}
      slotProps={{
        listbox: {
          component: ListboxComponent,
          internalListRef,
          onItemsBuilt: handleItemsBuilt,
        },
      }}
    />
  );
}
