// @flow weak

import React from 'react';
import { createStyleSheet } from 'material-ui/styles';
import customPropTypes from 'material-ui/utils/customPropTypes';
import { GridList, GridTile } from 'material-ui/GridList';
import tileData from './tileData';

const styleSheet = createStyleSheet('ImageGridList', () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  gridList: {
    width: 500,
    height: 450,
  },
  subheader: {
    width: '100%',
  },
}));

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
export default function ImageGridList(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.container}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map(tile =>
          <GridTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridTile>,
        )}
      </GridList>
    </div>
  );
}

ImageGridList.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
