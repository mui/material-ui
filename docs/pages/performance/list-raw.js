import React from 'react';
import CommentIcon from '@material-ui/icons/Comment';
import NoSsr from '@material-ui/core/NoSsr';

const data = { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 };
const rows = Array.from(new Array(1000)).map(() => data);

export default function ListRaw() {
  return (
    <NoSsr defer>
      <ul>
        {rows.map((row, index) => (
          <li key={index}>
            <span>{row.name}</span>
            <div>
              <CommentIcon />
            </div>
          </li>
        ))}
      </ul>
    </NoSsr>
  );
}
