import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import itemData from './peerItemData';

const useStyles = makeStyles({
  root: {
    width: 500,
    height: 450,
    overflowY: 'scroll',
  },
});

/**
 * The example data is structured as follows:
 *
 * const itemData = [
 *   {
 *     img: 'image-path',
 *     title: 'text',
 *     author: 'name'
 *   },
 *   { etc... },
 * ];
 *
 */
export default function TitlebarBelowMasonryImageList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.img} alt={item.title} />
            <ImageListItemBar position="below" title={item.author} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
