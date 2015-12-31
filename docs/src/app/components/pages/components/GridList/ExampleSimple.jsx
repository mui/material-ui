import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';

const tilesData = [
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

const tileElements = tilesData.map(tile => <GridTile
  key={tile.img}
  title={tile.title}
  subtitle={<span>by <b>{tile.author}</b></span>}
  actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
  ><img src={tile.img} /></GridTile>);
const gridListStyle = {width: 500, height: 400, overflowY: 'auto', marginBottom: 24};

const GridListExampleSimple = () => (
  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
    {/* Basic grid list with mostly default options */}
    <GridList
      cellHeight={200}
      style={gridListStyle}
      >
      {tileElements}
    </GridList>
  </div>
);

export default GridListExampleSimple;
