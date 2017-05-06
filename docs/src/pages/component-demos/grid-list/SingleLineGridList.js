// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';

import customPropTypes from 'material-ui/utils/customPropTypes';
import { GridList, GridTile, GridTileTitlebar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';

import breakfastImage from 'docs/src/assets/images/grid-list/00-52-29-429_640.jpg';
import burgerImage from 'docs/src/assets/images/grid-list/burgers-1976198_640.jpg';
import cameraImage from 'docs/src/assets/images/grid-list/camera-813814_640.jpg';
import morningImage from 'docs/src/assets/images/grid-list/morning-819362_640.jpg';
import hatsImage from 'docs/src/assets/images/grid-list/hats-829509_640.jpg';
import honeyImage from 'docs/src/assets/images/grid-list/honey-823614_640.jpg';
import vegetableImage from 'docs/src/assets/images/grid-list/vegetables-790022_640.jpg';
import plantImage from 'docs/src/assets/images/grid-list/water-plant-821293_640.jpg';

const styleSheet = createStyleSheet('SingleLineGridList', (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'white',
    marginTop: 30,
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  title: {
    color: theme.palette.primary[200],
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const tilesData = [
  {
    img: breakfastImage,
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: burgerImage,
    title: 'Tasty burger',
    author: 'director90',
  },
  {
    img: cameraImage,
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: morningImage,
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: hatsImage,
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: honeyImage,
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: vegetableImage,
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: plantImage,
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

export default function SingleLineGridList(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3.5}>
        {tilesData.map((tile) => (
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
