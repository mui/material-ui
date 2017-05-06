// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';

import customPropTypes from 'material-ui/utils/customPropTypes';
import { GridList, GridTile, GridTileTitlebar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/Info';

import breakfastImage from 'docs/src/assets/images/grid-list/00-52-29-429_640.jpg';
import burgerImage from 'docs/src/assets/images/grid-list/burgers-1976198_640.jpg';
import cameraImage from 'docs/src/assets/images/grid-list/camera-813814_640.jpg';
import morningImage from 'docs/src/assets/images/grid-list/morning-819362_640.jpg';
import hatsImage from 'docs/src/assets/images/grid-list/hats-829509_640.jpg';
import honeyImage from 'docs/src/assets/images/grid-list/honey-823614_640.jpg';
import vegetableImage from 'docs/src/assets/images/grid-list/vegetables-790022_640.jpg';
import plantImage from 'docs/src/assets/images/grid-list/water-plant-821293_640.jpg';

const styleSheet = createStyleSheet('TitlebarGridList', () => ({
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

export default function TitlebarGridList(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.root}>
      <GridList
        cellHeight={180}
        className={classes.gridList}
      >
        <Subheader className={classes.subheader}>December</Subheader>
        {tilesData.map((tile) => (
          <GridTile
            key={tile.img}
          >
            <img src={tile.img} alt={tile.title} />
            <GridTileTitlebar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton><StarBorderIcon color="rgba(255, 255, 255, 0.54)" /></IconButton>
              }
            />
          </GridTile>
        ))}
      </GridList>
    </div>
  );
}

TitlebarGridList.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
