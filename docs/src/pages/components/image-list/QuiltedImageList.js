import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import itemData from './itemData';

const useStyles = makeStyles({
  root: {
    width: 500,
    height: 450,
  },
});

/**
 * The example data is structured as follows:
 *
 * const itemData = [
 *   {
 *      img: 'image-path',
 *      title: 'text',
 *      rows: 2,
 *      cols: 2,
 *   },
 *   { etc... },
 * ];
 *
 */
export default function QuiltedImageList() {
  const classes = useStyles();

  return (
    <ImageList
      variant="quilted"
      cols={4}
      rowHeight={121}
      className={classes.root}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img src={item.img} alt={item.title} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
