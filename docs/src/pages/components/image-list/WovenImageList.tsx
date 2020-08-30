import * as React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import itemData from './peerItemData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
      height: 450,
    },
  }),
);

/**
 * The example data is structured as follows:
 *
 * const itemData = [
 *   { img: 'image-path', title: 'text' },
 *   { etc... },
 * ];
 *
 */
export default function WovenImageList() {
  const classes = useStyles();

  return (
    <ImageList variant="woven" cols={3} spacing={8} className={classes.root}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img src={item.img} alt={item.title} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
