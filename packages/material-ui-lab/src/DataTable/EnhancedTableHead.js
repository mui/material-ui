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

  const targetColumnIndex = useRef();
  const originalxOffset = useRef();
  const originalWidth = useRef();
  const thRef = useRef();

  const handleDragStart = (e, columnIndex) => {
    console.log('dragStart [e.pageX, columnIndex]:', e.pageX, columnIndex);

    originalWidth.current = widths[columnIndex];
    targetColumnIndex.current = columnIndex;
    originalxOffset.current = e.pageX;
    /* having 'col-resize' hover only on resizableBar is not enough because:
    1. bar position can lag behind mouse
    2. bar position can be fixed while the cell resizes on the other end
    So entire th is set with 'col-resize' style */
    thRef.current.style.cursor = 'col-resize';
  }

  const handleDrag = e => {
    if(e.pageX === 0) {return; /* hack */}
    const diffX = e.pageX - originalxOffset.current;
    const newWidth = originalWidth.current + diffX;
    console.log('drag [e.pageX, originalOffset, diffX, newWidth]:', e.pageX, originalxOffset.current, diffX, newWidth);
    setWidths(Object.assign([], widths, {[targetColumnIndex.current]: newWidth}));
  }

  const handleDragEnd = (e) => {
    console.log('dragEnd');
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
              /* tabIndex={0} */
              className={classes.resizableBar}
            />)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
