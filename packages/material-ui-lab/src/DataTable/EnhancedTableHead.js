import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles({
  cell: {
    position: 'realative',
  },
  resizableBar: {
    width: '3px',
    height: '100%',
    position: 'absolute',
    top: '0px',
    right: '0px',
    backgroundColor: 'black',
    '&:hover': {
      cursor: 'col-resize',
    }
  },
});

const EnhancedTableHead = ({columns}) => {
  const classes = useStyles();
  const [widths, setWidths] = useState(columns.map(column => column.width));

  const targetColumnIndex = useRef(undefined);
  const originalxOffset = useRef();
  const originalWidth = useRef();
  const thRef = useRef();

  const handleDragStart = (e, index) => {
    console.log('dragStart:', e.pageX, index);

    originalWidth.current = widths[index];
    targetColumnIndex.current = index;
    originalxOffset.current = e.pageX;
    /* having 'col-resize' hover only on resizableBar is not enough because:
    1. bar position can lag behind mouse
    2. bar position can be fixed while the cell resizes on the other end
    So entire th is set with 'col-resize' style */
    thRef.current.style.cursor = 'col-resize';
  }

  const handleDrag = e => {
    const diffX = e.pageX - originalxOffset.current;
    console.log('move, new width:', diffX, originalWidth.current + diffX);
    setWidths(Object.assign([], widths, {[targetColumnIndex.current]: originalWidth.current + diffX}));
  }

  const handleDragEnd = (e) => {
    console.log('dragEnd');
    if (targetColumnIndex.current === undefined) {return;}
    targetColumnIndex.current = undefined;
    thRef.current.style.cursor = 'auto';
  }

  return (
    <TableHead ref={thRef}>
      <TableRow>
        {columns.map((column, index) => (
          <TableCell
            className={classes.cell}
            key={column.label}
            align={index === 0 ? "left" : "right"}
            style={{width: widths[index]}}
          >
            {column.label}
            {column.resizable && (<div
              draggable="true"
              onDragStart={e => handleDragStart(e, index)}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              tabIndex={0}
              className={classes.resizableBar}
            />)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
