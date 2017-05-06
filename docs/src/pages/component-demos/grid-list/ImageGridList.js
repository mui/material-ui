// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';

import customPropTypes from 'material-ui/utils/customPropTypes';
import { GridList, GridTile } from 'material-ui/GridList';

import breakfastImage from 'docs/src/assets/images/grid-list/00-52-29-429_640.jpg';
import burgerImage from 'docs/src/assets/images/grid-list/burgers-1976198_640.jpg';
import cameraImage from 'docs/src/assets/images/grid-list/camera-813814_640.jpg';
import morningImage from 'docs/src/assets/images/grid-list/morning-819362_640.jpg';
import hatsImage from 'docs/src/assets/images/grid-list/hats-829509_640.jpg';
import honeyImage from 'docs/src/assets/images/grid-list/honey-823614_640.jpg';
import vegetableImage from 'docs/src/assets/images/grid-list/vegetables-790022_640.jpg';
import plantImage from 'docs/src/assets/images/grid-list/water-plant-821293_640.jpg';
import mushroomImage from 'docs/src/assets/images/grid-list/fly-21685_640.jpg';
import oilImage from 'docs/src/assets/images/grid-list/olive-oil-1412361_640.jpg';
import seastarImage from 'docs/src/assets/images/grid-list/sea-star-1501698_640.jpg';
import bikeImage from 'docs/src/assets/images/grid-list/bike-190483_640.jpg';

const styleSheet = createStyleSheet('ImageGridList', () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
  subheader: {
    width: '100%',
  },
}));

const tilesData = [
  {
    img: breakfastImage,
    title: 'Breakfast',
    cols: 2,
  },
  {
    img: burgerImage,
    title: 'Tasty burger',
  },
  {
    img: cameraImage,
    title: 'Camera',
  },
  {
    img: morningImage,
    title: 'Morning',
    featured: true,
  },
  {
    img: hatsImage,
    title: 'Hats',
  },
  {
    img: honeyImage,
    title: 'Honey',
  },
  {
    img: vegetableImage,
    title: 'Vegetables',
    cols: 2,
  },
  {
    img: plantImage,
    title: 'Water plant',
  },
  {
    img: mushroomImage,
    title: 'Mushroom',
  },
  {
    img: oilImage,
    title: 'Olive oil',
  },
  {
    img: seastarImage,
    title: 'Sea star',
    cols: 2,
  },
  {
    img: bikeImage,
    title: 'Bike',
  },
];

export default function ImageGridList(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.root}>
      <GridList
        cellHeight={160}
        className={classes.gridList}
        cols={3}
      >
        {tilesData.map((tile) => (
          <GridTile
            key={tile.img}
            cols={tile.cols || 1}
          >
            <img src={tile.img} alt={tile.title} />
          </GridTile>
        ))}
      </GridList>
    </div>
  );
}

ImageGridList.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
