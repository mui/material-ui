import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { RenderGroupParams } from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import { Typography } from '@material-ui/core';

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], { style });
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement>(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getItemSize = (index: number) => {
    const child = itemData[index];
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const outerElementType = React.useMemo(() => {
    return React.forwardRef<HTMLDivElement>((props2, ref2) => (
      <div ref={ref2} {...props2} {...other} />
    ));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref}>
      <VariableSizeList
        style={{
          padding: 0,
          height: Math.min(8, itemCount) * itemSize,
          maxHeight: "auto"
        }}
        itemData={itemData}
        height={250}
        width="100%"
        outerElementType={outerElementType}
        innerElementType="ul"
        itemSize={getItemSize}
        overscanCount={5}
        itemCount={itemCount}
      >
        {renderRow}
      </VariableSizeList>
    </div>
  );
});

function random(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const useStyles = makeStyles({
  listbox: {
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const OPTIONS = Array.from(new Array(10000))
  .map(() => random(10 + Math.ceil(Math.random() * 20)))
  .sort((a: string, b: string) => a.toUpperCase().localeCompare(b.toUpperCase()));

const renderGroup = (params: RenderGroupParams) => [
  <ListSubheader key={params.key} component="div">
    {params.key}
  </ListSubheader>,
  params.children
];

export default function Virtualize() {
  const classes = useStyles();

  return (
    <Autocomplete
      id="virtualize-demo"
      style={{ width: 300 }}
      disableListWrap
      classes={classes}
      ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
      renderGroup={renderGroup}
      options={OPTIONS}
      groupBy={option => option[0].toUpperCase()}
      renderInput={params => (
        <TextField {...params} variant="outlined" label="10,000 options" fullWidth />
      )}
      renderOption={option => <Typography noWrap>{option}</Typography>}
    />
  );
}
