import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function not(a, b) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
  return a.filter((value) => b.includes(value));
}

const CustomList = React.forwardRef(function CustomList(props, ref) {
  const { items, checked, handleToggle } = props;

  return (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
      <MenuList dense component="div" ref={ref}>
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;
          const isChecked = checked.includes(value);
          const SelectionIcon = isChecked ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

          return (
            <MenuItem
              component="div"
              key={value}
              role="menuitemcheckbox"
              aria-checked={isChecked}
              aria-labelledby={labelId}
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <SelectionIcon
                  sx={{
                    color: isChecked ? 'primary.main' : 'text.secondary',
                    padding: '9px',
                    boxSizing: 'content-box',
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </MenuItem>
          );
        })}
      </MenuList>
    </Paper>
  );
});

CustomList.propTypes = {
  checked: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleToggle: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default function TransferList() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const leftListRef = React.useRef(null);
  const rightListRef = React.useRef(null);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
    setChecked(not(checked, left));
    rightListRef.current?.focus();
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    rightListRef.current?.focus();
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    leftListRef.current?.focus();
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    setChecked(not(checked, right));
    leftListRef.current?.focus();
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <CustomList
        ref={leftListRef}
        items={left}
        checked={checked}
        handleToggle={handleToggle}
      />
      <Stack>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleAllRight}
          disabled={left.length === 0}
          aria-label="move all right"
        >
          ≫
        </Button>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0}
          aria-label="move selected right"
        >
          &gt;
        </Button>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleCheckedLeft}
          disabled={rightChecked.length === 0}
          aria-label="move selected left"
        >
          &lt;
        </Button>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleAllLeft}
          disabled={right.length === 0}
          aria-label="move all left"
        >
          ≪
        </Button>
      </Stack>
      <CustomList
        ref={rightListRef}
        items={right}
        checked={checked}
        handleToggle={handleToggle}
      />
    </Grid>
  );
}
