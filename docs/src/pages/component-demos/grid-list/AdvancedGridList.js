// @flow weak

import React from 'react';
import { createStyleSheet } from 'material-ui/styles';
import customPropTypes from 'material-ui/utils/customPropTypes';
import { GridList, GridTile, GridTileTitlebar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import tileData from './tileData';

const styleSheet = createStyleSheet('AdvancedGridList', () => ({
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
  titleBar: {
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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
 *     featured: true,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function AdvancedGridList(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.container}>
      <GridList
        cellHeight={200}
        padding={1}
        className={classes.gridList}
      >
        {tileData.map((tile) => (
          <GridTile
            key={tile.img}
            cols={tile.featured ? 2 : 1}
            rows={tile.featured ? 2 : 1}
          >
            <img src={tile.img} alt={tile.title} />
            <GridTileTitlebar
              title={tile.title}
              titlePosition="top"
              actionIcon={<IconButton><StarBorderIcon color="white" /></IconButton>}
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridTile>
        ))}
      </GridList>
    </div>
  );
}

AdvancedGridList.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
