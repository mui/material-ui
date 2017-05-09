// @flow weak

import React from 'react';
import { createStyleSheet } from 'material-ui/styles';
import customPropTypes from 'material-ui/utils/customPropTypes';
import { GridList, GridTile, GridTileTitlebar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import tileData from './tileData';

const styleSheet = createStyleSheet('SingleLineGridList', (theme) => ({
  root: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 30,
  },
  gridList: {
    flexWrap: 'nowrap',
  },
  title: {
    color: theme.palette.primary[200],
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
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
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function SingleLineGridList(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3.5}>
        {tileData.map((tile) => (
          <GridTile
            key={tile.img}
          >
            <img src={tile.img} alt={tile.title} />
            <GridTileTitlebar
              className={classes.titleBar}
              title={tile.title}
              titleClassName={classes.title}
              actionIcon={<IconButton><StarBorderIcon className={classes.title} /></IconButton>}
            />
          </GridTile>
        ))}
      </GridList>
    </div>
  );
}

SingleLineGridList.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
