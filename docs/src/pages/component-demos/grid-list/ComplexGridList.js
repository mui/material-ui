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

const styleSheet = createStyleSheet('ComplexGridList', () => ({
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
  titleBar: {
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const tilesData = [
  {
    img: breakfastImage,
    title: 'Breakfast',
    featured: true,
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
  },
  {
    img: plantImage,
    title: 'Water plant',
  },
];

export default function ComplexGridList(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.root}>
      <GridList
        cellHeight={200}
        padding={1}
        className={classes.gridList}
      >
        {tilesData.map((tile) => (
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

ComplexGridList.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
