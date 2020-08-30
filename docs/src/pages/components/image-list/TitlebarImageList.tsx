import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import itemData from './itemData';

const useStyles = makeStyles({
  root: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *      img: 'image-path',
 *      title: 'text',
 *      author: 'name',
 *      rows: 2,
 *      cols: 2,
 *   },
 *   { etc... },
 * ];
 */
export default function TitlebarImageList() {
  const classes = useStyles();

  return (
    <ImageList className={classes.root}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">December</ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img src={item.img} alt={item.title} />
          <ImageListItemBar
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
            actionIcon={
              <IconButton
                aria-label={`info about ${item.title}`}
                className={classes.icon}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
