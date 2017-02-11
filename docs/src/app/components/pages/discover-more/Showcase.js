import React from 'react';
import Title from 'react-title-component';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MarkdownElement from '../../MarkdownElement';
import showcaseText from './showcase.md';

const styles = {
  gridList: {
    margin: 10,
  },
  gridImage: {
    height: '100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left: '50%',
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
    title: 'SplitMe - Split expenses with friends',
    author: 'Olivier Tassinari',
    img: 'images/showcase/splitme.png',
    link: 'https://splitme.net/',
    source: 'https://github.com/oliviertassinari/SplitMe',
  },
  {
    title: 'Syncano',
    author: 'Syncano',
    img: 'images/showcase/syncano.png',
    link: 'https://syncano.io/',
    source: 'https://github.com/Syncano/syncano-dashboard',
  },
  {
    title: 'admin-on-rest - A frontend framework for building admin SPAs on top of REST services',
    author: 'marmelab.com',
    img: 'http://static.marmelab.com/admin-on-rest.gif',
    link: 'http://marmelab.com/admin-on-rest/',
    source: 'https://github.com/marmelab/admin-on-rest',
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
    title: 'Dearborn Denim - American made jeans',
    author: 'Alexander Tanton',
    img: 'images/showcase/dearborn-denim.png',
    link: 'http://dearborndenim.us/get-my-size',
  },
  {
    title: 'Casalova - Book your next rental',
    author: 'Casalova',
    img: 'images/showcase/casalova.png',
    link: 'https://www.casalova.com/',
  },
  {
    title: 'LireLactu',
    author: 'miLibris',
    img: 'images/showcase/lirelactu.png',
    link: 'http://lirelactu.fr/',
  },
  {
    title: 'Realty Advisors Elite',
    author: 'Chicago Business Intelligence',
    img: 'images/showcase/realty-advisors-elite.png',
    link: 'https://www.realtyadvisorselite.com/',
  },
  {
    title: 'Humorista Jokes',
    author: 'Minas Mina',
    img: 'images/showcase/humorista.png',
    link: 'https://humorista.org/',
  },
  {
    title: 'ApiRequest Capture (Chrome Extension)',
    author: 'team@moesif.com',
    img: 'images/showcase/apirequest-capture-by-moesif.png',
    link: 'https://chrome.google.com/webstore/detail/apirequestio-capture/aeojbjinmmhjenohjehcidmappiodhjm',
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
          title={app.title}
          subtitle={<span>{'by '}<b>{app.author}</b></span>}
          actionIcon={app.source &&
            <IconButton href={app.source} target="_blank">
              <FontIcon className="muidocs-icon-custom-github" color="white" />
            </IconButton>
          }
        >
          {/* The GridTile `href` prop would nest the `actionIcon` link, so we wrap the image instead. */}
          <a href={app.link} target="_blank">
            <img src={app.img} style={styles.gridImage} />
          </a>
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default Showcase;
