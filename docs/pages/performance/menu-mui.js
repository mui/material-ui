import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import NoSsr from '@material-ui/core/NoSsr';

const data = { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 };
const rows = Array.from(new Array(1000)).map(() => data);

export default function MenuMui() {
  return (
    <NoSsr defer>
      <MenuList id="menu-list-grow">
        {rows.map((row, index) => (
          <MenuItem key={index}>{index}</MenuItem>
        ))}
      </MenuList>
    </NoSsr>
  );
}
