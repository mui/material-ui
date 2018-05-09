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
    title: 'Flow Dashboard - Personal data for quantified self & habit tracking',
    author: 'Jeremy Gordon',
    img: 'images/showcase/flow.png',
    link: 'http://flowdash.co',
    source: 'https://github.com/onejgordon/flow-dashboard',
  },
  {
    title: 'Serif.nu - Course planning for Northwestern University',
    author: 'Joon Park',
    img: 'images/showcase/serif-nu.png',
    link: 'https://serif.nu',
    source: 'https://github.com/Joonpark13/serif.nu',
  },
  {
    title: 'Order form for Wedding Videos',
    author: 'Sergey Reznikov',
    img: 'images/showcase/wv-order-form.png',
    link: 'http://order-form.reznikov.online/',
    source: 'https://bitbucket.org/wzup/order-form',
  },
  {
    title: 'React Most Wanted',
    author: 'Tarik Huber',
    img: 'images/showcase/react-most-wanted.png',
    link: 'https://www.react-most-wanted.com/',
    source: 'https://github.com/TarikHuber/react-most-wanted',
  },
  {
    title: 'Crypticker.io',
    author: 'Sébastien Castiel',
    img: 'images/showcase/crypticker.png',
    link: 'https://crypticker.io/',
    source: 'https://gitlab.com/scastiel/crypticker',
  },
  {
    title: 'Cloudcraft',
    author: 'Cloudcraft',
    img: 'images/showcase/cloudcraft.png',
    link: 'https://cloudcraft.co/',
  },
  {
    title: 'Golden Hour Invoice Builder',
    author: 'Mahesh Kumar J',
    img: 'images/showcase/gh-invoice-builder.png',
    link: 'https://invoicebuilder.goldenhour.co',
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
    title: 'ApiRequest Capture (Chrome Extension)',
    author: 'team@moesif.com',
    img: 'images/showcase/apirequest-capture-by-moesif.png',
    link: 'https://chrome.google.com/webstore/detail/apirequestio-capture/aeojbjinmmhjenohjehcidmappiodhjm',
  },
  {
    title: 'SlimChess - Instant Chess Games on the Go',
    author: 'Larry Xu',
    img: 'images/showcase/slimchess.png',
    link: 'https://slimchess.com',
  },
  {
    title: 'DevSketch',
    author: 'Hai Le',
    img: 'images/showcase/devsketch.png',
    link: 'https://devsketch.io/',
  },
  {
    title: 'HoopHubs篮圈 - 查CBA/NBA比赛数据，就上HoopHubs篮圈',
    author: 'HoopHubs',
    img: 'images/showcase/hoophubs-basketball-stats-tool.png',
    link: 'http://www.hoophubs.com',
  },
  {
    title: 'AlarmDJ - Online Alarm Clock',
    author: 'Arnon Eilat',
    img: 'images/showcase/alarmdj.png',
    link: 'https://alarmdj.com',
  },
  {
    title: 'Weekend travel inspiration',
    author: 'FlyWeekend',
    img: 'images/showcase/flyweekend.png',
    link: 'https://flyweekend.co',
  },
  {
    title: 'smpl - Coworking Space Management',
    author: 'smpl',
    img: 'images/showcase/smpl.png',
    link: 'https://smpl.io/features/your-experience/',
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
