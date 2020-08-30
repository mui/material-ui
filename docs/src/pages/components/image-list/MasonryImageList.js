import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import itemData from './peerItemData';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    height: 450,
    overflowY: 'scroll',
  },
}));

/**
 * The example data is structured as follows:
 *
 * const itemData = [
 *   { img: 'image-path', title: 'text' },
 *   { etc... },
 * ];
 *
 */
export default function MasonryImageList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList variant="masonry" cols={3} spacing={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.img} alt={item.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
