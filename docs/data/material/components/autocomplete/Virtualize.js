import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { List } from 'react-window';
import Typography from '@mui/material/Typography';

const LISTBOX_PADDING = 8; // px

function RowComponent({ index, itemData, style }) {
  const dataSet = itemData[index];
  const inlineStyle = {
    ...style,
    top: (style.top ?? 0) + LISTBOX_PADDING,
  };

  if ('group' in dataSet) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

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
    PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.element, PropTypes.number, PropTypes.string])
          .isRequired,
      ),
      PropTypes.shape({
        childern: PropTypes.node,
        group: PropTypes.string.isRequired,
        key: PropTypes.number.isRequired,
      }),
    ]).isRequired,
  ).isRequired,
  style: PropTypes.object.isRequired,
};

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.useMemo(() => [], []);
  children.forEach((item) => {
    itemData.push(item);
    itemData.push(...(item.children || []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
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

  return (
    <div ref={ref} {...other} style={{ ...other.style, maxHeight: '100%' }}>
      <List
        key={itemCount}
        rowCount={itemCount}
        rowHeight={(index) => getChildSize(itemData[index])}
        rowComponent={RowComponent}
        rowProps={{ itemData }}
        style={{
          height: getHeight() + 2 * LISTBOX_PADDING,
          width: '100%',
          margin: 0,
        }}
        overscanCount={5}
        tagName="ul"
      />
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
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
  return (
    <Autocomplete
      sx={{ width: 300 }}
      disableListWrap
      options={OPTIONS}
      groupBy={(option) => option[0].toUpperCase()}
      renderInput={(params) => <TextField {...params} label="10,000 options" />}
      renderOption={(props, option, state) => [props, option, state.index]}
      renderGroup={(params) => params}
      slots={{
        popper: StyledPopper,
      }}
      slotProps={{
        listbox: {
          component: ListboxComponent,
        },
      }}
    />
  );
}
