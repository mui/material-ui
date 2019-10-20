import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Theme } from '@material-ui/core/styles';

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;

  return React.cloneElement(data[index], {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block',
      ...style,
    },
  });
}

// Adapter for react-window
function ListboxComponent(props: React.HTMLAttributes<HTMLElement>) {
  const { children, ...other } = props;
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const itemCount = Array.isArray(children) ? children.length : 0;
  const itemSize = smUp ? 36 : 48;

  return (
    <div {...other}>
      <FixedSizeList
        style={{ padding: 0, height: Math.min(8, itemCount) * itemSize, maxHeight: 'auto' }}
        itemData={children}
        height={250}
        width="100%"
        outerElementType="ul"
        itemSize={itemSize}
        overscanCount={5}
        itemCount={itemCount}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
}

function random(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export default function Virtualize() {
  return (
    <Autocomplete
      style={{ width: 300 }}
      disableListWrap
      ListboxComponent={ListboxComponent}
      TextFieldProps={{ label: '10,000 options', variant: 'outlined', fullWidth: true }}
      options={Array.from(new Array(10000)).map(() => random(Math.ceil(Math.random() * 18)))}
    />
  );
}
