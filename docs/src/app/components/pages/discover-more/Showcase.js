import React from 'react';
import Title from 'react-title-component';

import {GridList, GridTile} from 'material-ui/GridList';

import MarkdownElement from '../../MarkdownElement';
import showcaseText from './showcase.md';

const styles = {
  gridList: {
    margin: 10,
  },
  gridTile: {
    cursor: 'pointer',
  },
};

const appList = [
  // Under development
  // {
  //   title: 'Call-Em-All',
  //   author: 'Call-Em-All',
  //   img: 'images/showcase/callemall.png',
  //   link: '',
  // },
  {
    title: 'SplitMe',
    author: 'Olivier Tassinari',
    img: 'images/showcase/splitme.png',
    link: 'https://splitme.net/',
  },
  {
    title: 'Syncano',
    author: 'Syncano',
    img: 'images/showcase/syncano.png',
    link: 'https://syncano.io/',
  },
  {
    title: 'Cloudcraft',
    author: 'Cloudcraft',
    img: 'images/showcase/cloudcraft.png',
    link: 'https://cloudcraft.co/',
  },
  {
    title: 'It\'s quiz',
    author: 'It\'s quiz',
    img: 'images/showcase/itsquiz.png',
    link: 'http://itsquiz.com/',
  },
  {
    title: 'ArcChat.com',
    author: 'Lukas Liesis',
    img: 'images/showcase/arcchat.png',
    link: 'http://ArcChat.com/',
  },
  {
    title: 'SmafTV - A toolset for TV apps',
    author: 'Infamous Labs',
    img: 'images/showcase/smaftv.png',
    link: 'http://www.smaf.tv/',
  },
  {
    title: 'Spouti - An events search engine',
    author: 'Magino Marveaux-Cochet',
    img: 'images/showcase/spouti.png',
    link: 'https://www.spouti.com/',
  },
  {
    title: 'Dearborn Denim - American made jeans',
    author: 'Alexander Tanton',
    img: 'images/showcase/dearborn-denim.png',
    link: 'http://dearborndenim.us/get-my-size',
  },
];

const Showcase = () => (
  <div>
    <Title render={(previousTitle) => `Showcase - ${previousTitle}`} />
    <MarkdownElement text={showcaseText} />
    <GridList
      cols={3}
      cellHeight={200}
      style={styles.gridList}
    >
      {appList.map((app) => (
        <GridTile
          key={app.title}
          containerElement="a"
          href={app.link}
          target="_blank"
          title={app.title}
          subtitle={<span>{'by '}<b>{app.author}</b></span>}
          style={styles.gridTile}
        >
          <img src={app.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default Showcase;
