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

const img = new Image();
img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

const EnhancedTableHead = ({columns}) => {
  const classes = useStyles();
  const [widths, setWidths] = useState(columns.map(column => column.width));

  const targetColumnIndex = useRef();
  const originalxOffset = useRef();
  const originalWidth = useRef();
  const thRef = useRef();

  const handleDragStart = (e, columnIndex) => {
    console.log('dragStart [e.pageX, columnIndex]:', e.pageX, columnIndex);
    /* remove drag preview image */
    e.dataTransfer.setDragImage(img, 0, 0);

    originalWidth.current = widths[columnIndex];
    targetColumnIndex.current = columnIndex;
    originalxOffset.current = e.pageX;

    /* don't know how to set cursor to "col-resize" when dragging
    /* one of the options is to add an overlay with that when dragging
    */
  }

  const handleDrag = e => {
    if(e.pageX === 0) {return; /* hack */}
    const diffX = e.pageX - originalxOffset.current;
    const newWidth = originalWidth.current + diffX;
    if (newWidth <= 0) {return;}
    console.log('drag [e.pageX, originalOffset, diffX, newWidth]:', e.pageX, originalxOffset.current, diffX, newWidth);
    setWidths(Object.assign([], widths, {[targetColumnIndex.current]: newWidth}));
  }

  const handleDragEnd = (e) => {
    console.log('dragEnd');
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
