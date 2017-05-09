// @flow weak

import React from 'react';
import { createStyleSheet } from 'material-ui/styles';
import customPropTypes from 'material-ui/utils/customPropTypes';
import { GridList, GridTile, GridTileTitlebar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import tileData from './tileData';

const styleSheet = createStyleSheet('TitlebarGridList', () => ({
  gridList: {
    backgroundColor: 'white',
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
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarGridList(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <GridList
      cellHeight={180}
      className={classes.gridList}
    >
      <Subheader className={classes.subheader}>December</Subheader>
      {tileData.map((tile) => (
        <GridTile
          key={tile.img}
        >
          <img src={tile.img} alt={tile.title} />
          <GridTileTitlebar
            title={tile.title}
            subtitle={<span>by: {tile.author}</span>}
            actionIcon={
              <IconButton><InfoIcon color="rgba(255, 255, 255, 0.54)" /></IconButton>
            }
          />
        </GridTile>
      ))}
    </GridList>
  );
}

TitlebarGridList.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
