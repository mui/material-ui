import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles({
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
  const [width, setWidth] = useState(columns[0].width);

  const dragging = useRef(false);
  const xOffset = useRef();
  const originalWidth = useRef();
  const thRef = useRef();

  const handleMouseDown = e => {
    e.preventDefault();
    console.log('down:', e.pageX);
    xOffset.current = e.pageX;
    dragging.current = true;
    originalWidth.current = width;
    thRef.current.style.cursor = 'col-resize';
  }

  useEffect(() => {
    window.onmousemove = (e) => {
      if (!dragging.current) {return;}

      const diffX = e.pageX - xOffset.current;
      console.log('move, new width:', diffX, originalWidth.current + diffX);
      setWidth(originalWidth.current + diffX);
    }
  });

  useEffect(() => {
    window.onmouseup = () => {
      if (!dragging.current) {return;}

      console.log('up');
      dragging.current = false;
      thRef.current.style.cursor = 'auto';
    }
  }, []);

  return (
    <TableHead ref={thRef}>
      <TableRow>
        {columns.map((column, index) => (
          <TableCell
            key={column.label}
            align={index === 0 ? "left" : "right"}
            style={{width: index === 0 ? width : column.width, position: 'relative'}}
          >
            {column.label}
            {index === 0 && (<div
              tabIndex={0}
              className={classes.resizableBar}
              onMouseDown={handleMouseDown}
            />)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
