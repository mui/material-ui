import React from 'react';
import GridTileList from 'material-ui/GridTileList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',       
    marginBottom: 24,
  },
};

const tilesData = [
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    url: 'http://www.google.com',
    author: 'jill111',
    id:1,
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    url: 'http://www.google.com',
    author: 'pashminu',
    id:2,
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Camera',
    url: 'http://www.google.com',
    author: 'Danson67',
    id:3,
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Morning',
    url: 'http://www.google.com',
    author: 'fancycrave1',
    id:4,
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'Hats',
    url: 'http://www.google.com',
    author: 'Hans',
    id:5,
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'Honey',
    url: 'http://www.google.com',
    author: 'fancycravel',
    id:6,
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'Vegetables',
    url: 'http://www.google.com',
    author: 'jill111',
    id:7,
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'Water plant',
    url: 'http://www.google.com',
    author: 'BkrmadtyaKarki',
    id:8,
  },
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    url: 'http://www.google.com',
    author: 'jill111',
    id:9,
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    url: 'http://www.google.com',
    author: 'pashminu',
    id:10,
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Camera',
    url: 'http://www.google.com',
    author: 'Danson67',
    id:11,
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Morning',
    url: 'http://www.google.com',
    author: 'fancycrave1',
    id:12,
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'Hats',
    url: 'http://www.google.com',
    author: 'Hans',
    id:13,
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'Honey',
    url: 'http://www.google.com',
    author: 'fancycravel',
    id:14,
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'Vegetables',
    url: 'http://www.google.com',
    author: 'jill111',
    id:15,
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'Water plant',
    url: 'http://www.google.com',
    author: 'BkrmadtyaKarki',
    id:16,
  },
];

const GridListExampleSimple = () => (
  <div style={styles.root}>
    <GridTileList
      style={styles.gridList}
      tilesData={tilesData}>          
    </GridTileList>
  </div>
);

export default GridListExampleSimple;
