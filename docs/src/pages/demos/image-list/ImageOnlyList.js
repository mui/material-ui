import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListTile from '@material-ui/core/ImageListTile';
import tileData from './tileData';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function ImageOnlyList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <ImageList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map(tile => (
          <ImageListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </ImageListTile>
        ))}
      </ImageList>
    </div>
  );
}

ImageOnlyList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageOnlyList);
