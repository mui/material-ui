import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GithubIcon from '@material-ui/docs/svgIcons/GitHub';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    // Hide the demo container padding
    margin: -theme.spacing.unit * 3,
    // Maintain alignment with the markdown text
    [theme.breakpoints.down('xs')]: {
      padding: 30,
    },
  },
  title: {
    marginBottom: theme.spacing.unit * 2,
  },
  card: {
    marginBottom: theme.spacing.unit,
    maxWidth: 600,
  },
  description: {
    marginBottom: theme.spacing.unit * 6,
  },
  cardMedia: {
    paddingTop: '75%', // 4:3
  },
});

const appList = [
  {
    title: 'Bethesda Game Studios',
    description:
      'The official site for Bethesda, publisher of Fallout, DOOM, Dishonored, ' +
      'Skyrim, Wolfenstein, The Elder Scrolls, more. Your source for news, features & community.',
    image: '/static/images/showcase/bethesda.jpg',
    link: 'https://bethesda.net/',
    similarWebGlobal: 2,
    similarWebVisits: 283100,
  },
  {
    title: 'Better Business Bureau',
    description:
      'Better Business Bureau helps United States consumers find businesses and charities they ' +
      'can trust.',
    image: '/static/images/showcase/bbb.jpg',
    link: 'https://bbb.org/',
    similarWebGlobal: 6,
    similarWebVisits: 11210,
  },
  {
    title: 'Leroy Merlin',
    description:
      'Per i vostri progetti di bricolage, giardinaggio e miglioramento della casa, ' +
      'Leroy Merlin propone una grande scelta di marche al prezzo migliore. ' +
      'Tanti prodotti per tutta la casa: bagno, cucina, giardino, riscaldamento, elettricità, ' +
      'idraulica… Ritira in negozio o ricevi comodamente a casa. 🇮🇹',
    image: '/static/images/showcase/leroymerlin.jpg',
    link: 'https://www.leroymerlin.it/',
    similarWebGlobal: 9,
    similarWebVisits: 5390,
  },
  {
    title: 'BARKS',
    description: 'Japan Music Network. 🇯🇵',
    image: '/static/images/showcase/barks.jpg',
    link: 'https://www.barks.jp/',
    similarWebGlobal: 30,
    similarWebVisits: 2780,
  },
  {
    title: 'GovX',
    description:
      'Current & former uniformed professionals get exclusive access to deals ' +
      'on gear, apparel, tickets, travel and more.',
    image: '/static/images/showcase/govx.jpg',
    link: 'https://www.govx.com/',
    similarWebGlobal: 38,
    similarWebVisits: 1240,
  },
  {
    title: 'Housecall Pro',
    description:
      'The #1 rated mobile software to run your home service business. ' +
      'Schedule, dispatch, GPS track employees, invoice, accept credit cards and get booked ' +
      'online. The marketing website is also built with Material-UI: https://www.housecallpro.com/',
    image: '/static/images/showcase/housecall.jpg',
    link: 'https://pro.housecall.io/pro/dashboard',
    similarWebGlobal: 75,
    similarWebVisits: 396,
  },
  {
    title: 'SFR Presse',
    description:
      'SFR Presse provides the best access to french newspapers, ' +
      'magazines and real time streams, personalized for you. 🇫🇷',
    image: '/static/images/showcase/sfrpresse.jpg',
    link: 'https://sfrpresse.sfr.fr/',
    similarWebGlobal: 0,
    similarWebVisits: 710,
  },
  {
    title: 'AospExtended Download center',
    description:
      'A download center that hosts all the official builds of AospExtended ROM, ' +
      'for supported devices for different android versions.',
    image: '/static/images/showcase/aexdownloadcenter.jpg',
    link: 'https://downloads.aospextended.com/',
    similarWebGlobal: 86,
    similarWebVisits: 731,
  },
  {
    title: 'LessWrong',
    description: 'LessWrong is a community blog devoted to the art of human rationality.',
    image: '/static/images/showcase/lesswrong.jpg',
    link: 'https://lesswrong.com/',
    similarWebGlobal: 89,
    similarWebVisits: 'N/A',
  },
  {
    title: 'Sweek',
    description:
      'Read thousands of free books, stories and serials on Sweek. ' +
      'Challenge yourself in writing. Turn your stories into books via Sweek Publishing. ' +
      'Join the global community of readers and writers!',
    image: '/static/images/showcase/sweek.jpg',
    link: 'https://sweek.com/',
    similarWebGlobal: 105,
    similarWebVisits: 483,
  },
  {
    title: 'Hijup',
    description: 'A pioneering Muslim Fashion e-commerce site.',
    image: '/static/images/showcase/hijup.jpg',
    link: 'https://www.hijup.com/',
    similarWebGlobal: 120,
    similarWebVisits: 388,
  },
  {
    title: 'Onepixel',
    description: 'Beautiful Stock Photos for $1.',
    image: '/static/images/showcase/onepixel.jpg',
    link: 'https://www.onepixel.com/',
    similarWebGlobal: 124,
    similarWebVisits: 343,
  },
  {
    title: 'iFit',
    description:
      'Get the best personal training, right at home. Access hundreds of training programs, ' +
      'unique health tips, and expert advice that will lead you to a healthier lifestyle.',
    image: '/static/images/showcase/ifit.jpg',
    link: 'https://www.ifit.com/',
    similarWebGlobal: 136,
    similarWebVisits: 311,
  },
  {
    title: 'NEO Tracker',
    description: 'NEO blockchain explorer and wallet.',
    image: '/static/images/showcase/neotracker.jpg',
    link: 'https://neotracker.io/',
    similarWebGlobal: 140,
    similarWebVisits: 357,
  },
  {
    title: 'CityAds',
    description:
      'CityAds Media: global technology platform for online performance marketing ' +
      'powered by big data',
    image: '/static/images/showcase/cityads.jpg',
    link: 'https://cityads.com/main',
    similarWebGlobal: 163,
    similarWebVisits: 155,
  },
  {
    title: 'EOS Toolkit',
    description:
      'EOSToolkit is the premier free, open source interface for managing EOS ' +
      'accounts. Create, transfer, stake, vote and more with Scatter!',
    image: '/static/images/showcase/eostoolkit.jpg',
    link: 'https://www.eostoolkit.io/',
    source: 'https://github.com/generEOS/eostoolkit',
    similarWebGlobal: 218,
    similarWebVisits: 161,
  },
  {
    title: 'BitCambio',
    description:
      'A BitCambio oferece a facilidade de comprar e vender a moeda virtual bitcoin ' +
      'de forma direta e segura no Brasil. 🇧🇷',
    image: '/static/images/showcase/bitcambio.jpg',
    link: 'https://bitcambio.com.br/',
    similarWebGlobal: 289,
    similarWebVisits: 168,
  },
  {
    title: 'Numerai',
    description: ' Earn cryptocurrency in weekly data science competitions.',
    image: '/static/images/showcase/numerai.jpg',
    link: 'https://numer.ai/homepage',
    similarWebGlobal: 395,
    similarWebVisits: 101,
  },
  {
    title: 'The Media Ant',
    description:
      "India's Largest online marketing service provider, " +
      'with more than 200K advertising options, and more than 1M satisfied customers.',
    image: '/static/images/showcase/themediaant.jpg',
    link: 'https://themediaant.com/',
    similarWebGlobal: 438,
    similarWebVisits: 89,
  },
  {
    title: 'LocalMonero',
    description:
      'A safe and easy-to-use person-to-person platform to allow anyone ' +
      'to trade their local currency for Monero, anywhere.',
    image: '/static/images/showcase/localmonero.jpg',
    link: 'https://localmonero.co/?rc=ogps',
    similarWebGlobal: 635,
  },
  {
    title: 'Fizix',
    description: 'Coaching sportif à domicile. 🇫🇷',
    image: '/static/images/showcase/fizix.jpg',
    link: 'https://www.fizix.io/',
    similarWebGlobal: 668,
  },
  {
    title: 'Venuemob',
    description:
      'A platform for individuals and businesses to find and book the perfect venue for any event.',
    image: '/static/images/showcase/venuemob.jpg',
    link: 'https://venuemob.com.au/',
    similarWebGlobal: 776,
  },
  {
    title: 'ODIGEO Connect',
    description:
      'Connect your hotel, B&B and apartment with Europe’s #1 flight OTA ' +
      'and distribute it to millions of travellers.',
    image: '/static/images/showcase/odigeo.jpg',
    link: 'https://odigeoconnect.com/',
    similarWebGlobal: 925,
  },
  {
    title: 'comet',
    description:
      'Comet lets you track code, experiments, and results on ML projects. ' +
      'It’s fast, simple, and free for open source projects.',
    image: '/static/images/showcase/comet.jpg',
    link: 'https://www.comet.ml/',
    similarWebGlobal: 937,
  },
  {
    title: 'Pointer',
    description:
      'Revestimentos cerâmicos para pisos e paredes com qualidade e design acessível. ' +
      'A Pointer faz parte da Portobello e atua no Nordeste do Brasil. 🇧🇷',
    image: '/static/images/showcase/pointer.jpg',
    link: 'https://www.pointer.com.br/',
    similarWebGlobal: 984,
  },
  {
    title: 'Oneplanetcrowd',
    description:
      'Oneplanetcrowd is Europe’s leading sustainable crowdfunding platform for People & Planet.',
    image: '/static/images/showcase/oneplanetcrowd.jpg',
    link: 'https://oneplanetcrowd.com/en',
    similarWebGlobal: 995,
  },
  {
    title: 'CollegeAI',
    description:
      'Get a college recommendation and your chances using the best college predictor. ' +
      "Answer some questions and we'll calculate where you fit in best with our college finder " +
      'and college matching tools. CollegeAI is an admissions and college counselor, college ' +
      'planner, and college chance calculator.',
    image: '/static/images/showcase/collegeai.jpg',
    link: 'https://collegeai.com',
    similarWebGlobal: 1075,
  },
  {
    title: 'react-admin',
    description:
      'The admin of an imaginary poster shop, used as a demo for the react-admin framework. ' +
      'Uses many material-ui components, including tables, forms, snackbars, buttons, and ' +
      'theming. The UI is responsive. The code is open-source!',
    image: '/static/images/showcase/posters-galore.jpg',
    link: 'https://marmelab.com/react-admin-demo/',
    source:
      'https://github.com/marmelab/react-admin/tree/be23a1a8ebc4e2293b57898adcb2f359e836f0fd/examples/demo',
  },
  {
    title: 'Builder Book',
    description:
      'An open source web app to write and host documentation or sell books. ' +
      'Built with React, Material-UI, Next, Express, Mongoose, MongoDB.',
    image: '/static/images/showcase/builderbook.jpg',
    link: 'https://builderbook.org/',
    source: 'https://github.com/builderbook/builderbook',
    similarWebGlobal: 1081,
  },
  {
    title: 'Commit Swimming',
    description: 'The #1 workout journal for coaches and swimmers.',
    image: '/static/images/showcase/commitswimming.jpg',
    link: 'https://www.commitswimming.com/',
    similarWebGlobal: 1100,
  },
  {
    title: 'EventHi',
    description:
      'Cannabis event platform to create and coordinate Cannabis events for the Cannabis ' +
      'community. Use our easy ticketing system, sponsor, and sell merchandise.',
    image: '/static/images/showcase/eventhi.jpg',
    link: 'https://eventhi.io/',
    similarWebGlobal: 1768,
  },
  {
    title: 'Cryptoverview: A friendly Dashboard for your cryptocurrency portfolio',
    description:
      "Cryptoverview is a responsive webapp that displays a user's Bittrex portfolio, " +
      'trending currencies and market caps. It provides some fancy charts, ' +
      'news related to cryptocurrencies, and more. (demo:demo)',
    image: '/static/images/showcase/cryptoverview.jpg',
    link: 'https://cryptoverview.com/',
    similarWebGlobal: 2046,
  },
  {
    title: 'TuDiscovery',
    description: 'Discovery Channel Latin America. 🇪🇸',
    image: '/static/images/showcase/tudiscovery.jpg',
    link: 'https://www.tudiscovery.com/',
    similarWebGlobal: 2947,
  },
  {
    title: 'Iceberg Finder',
    description:
      'Whether spotting them from outer space, or standing on our coastline, ' +
      'IcebergFinder.com is your premier place for finding bergs in Newfoundland and Labrador.',
    image: '/static/images/showcase/icebergfinder.jpg',
    link: 'https://icebergfinder.com/',
    similarWebGlobal: 3064,
  },
  {
    title: 'Rare Bits',
    description: 'Rare Bits is a marketplace where users can buy, sell and discover crypto assets.',
    image: '/static/images/showcase/rarebits.jpg',
    link: 'https://rarebits.io/',
    similarWebGlobal: 3116,
  },
  {
    title: 'Roast',
    description: 'Roast.io makes web hosting HTML and JS single-page apps fast, secure, and easy.',
    image: '/static/images/showcase/roast.jpg',
    link: 'https://roast.io/',
    similarWebGlobal: 3137,
  },
  {
    title: 'Melbourne Mint',
    description:
      'The Melbourne Mint has been synonymous with precious metals and currency ' +
      'for over 100 years.',
    image: '/static/images/showcase/melbournemint.jpg',
    link: 'https://melbournemint.com.au/',
    similarWebGlobal: 4182,
  },
  {
    title: 'Pilcro',
    description: 'A free brand management software for the Google Suite.',
    image: '/static/images/showcase/pilcro.jpg',
    link: 'https://www.pilcro.com/',
    similarWebGlobal: 5096,
  },
  {
    title: 'Rung - Exceptionality Management',
    description:
      'Rung alerts you about the exceptionalities of your personal and professional life.',
    image: '/static/images/showcase/rung.jpg',
    link: 'https://app.rung.com.br/',
    similarWebGlobal: 5194,
  },
  {
    title: 'MetaFact',
    description:
      'Metafact is a place to verify knowledge via the world’s top experts. ' +
      'It’s a platform to ask questions, learn the facts and share the truth.',
    image: '/static/images/showcase/metafact.jpg',
    link: 'metafact.io/',
    similarWebGlobal: 5294,
  },
  {
    title: 'Arkopharma',
    description: 'Arkopharma Laboritories customer loyalty site. 🇫🇷',
    image: '/static/images/showcase/arkoclub.jpg',
    link: 'https://www.arkoclub.com/',
    similarWebGlobal: 7071,
  },
  {
    title: 'Modole Language Exchange',
    description:
      "Web app that allows users to write in the language they're learning " +
      'and have it corrected by native speakers.',
    image: '/static/images/showcase/modole.jpg',
    link: 'https://en.modole.io/',
    similarWebGlobal: 7354,
  },
  {
    title: 'Manty Vision',
    description:
      'An Open Data tool showing financial and demographic data for all the towns in France.',
    image: '/static/images/showcase/manty.jpg',
    link: 'https://app.manty.eu/',
    similarWebGlobal: 7783,
  },
  {
    title: 'Johnny Metrics',
    description: 'Upload your trades, and analyze your crypto portfolio.',
    link: 'https://app.johnnymetrics.com/demo',
    image: '/static/images/showcase/johnnymetrics.jpg',
    similarWebGlobal: 8926,
  },
  {
    title: 'AudioNodes',
    description:
      'Modular audio production suite with multi-track audio mixing, audio effects, ' +
      'parameter automation, MIDI editing, synthesis, cloud production, and more.',
    image: '/static/images/showcase/audionodes.jpg',
    link: 'https://audionodes.com/',
    similarWebGlobal: 9013,
  },
  {
    title: 'Insights',
    description:
      '"Insights" by Just Ask Users helps user experience research teams ' +
      "make sense of their user study findings. Teams can see their users' pains and needs " +
      'easily so that they can enhance the product that they are designing. ' +
      'Material-UI is used both on the website (with server-side rendering) and ' +
      'within the interactive app itself.',
    image: '/static/images/showcase/justaskusers.jpg',
    link: 'https://justaskusers.com/',
    similarWebGlobal: 10013,
  },
  {
    title: 'SlidesUp',
    description: 'SlidesUp is a platform to help conference organizers plan their events.',
    image: '/static/images/showcase/slidesup.jpg',
    link: 'https://slidesup.com/',
    similarWebGlobal: 10560,
  },
  {
    title: 'Trafikito',
    description:
      'Free servers monitoring solution which can track any output of any command and do ' +
      'automated action. By default it tracks average load, CPU, HDD, RAM and sends email when ' +
      'something is going wrong.',
    image: '/static/images/showcase/trafikito-monitoring.jpg',
    link: 'https://trafikito.com/',
    similarWebGlobal: 10748,
  },
  {
    title: 'Hokan',
    description:
      'Customer management and contract management we service for the insurance industry. 🇯🇵',
    image: '/static/images/showcase/hkn.jpg',
    link: 'https://hkn.jp/',
    similarWebGlobal: 11707,
  },
  {
    title: 'One Shot Move',
    description: 'An LA based moving company.',
    image: '/static/images/showcase/oneshotmove.jpg',
    link: 'https://oneshotmove.com/',
    similarWebGlobal: 11716,
  },
  {
    title: 'Fluxguard',
    description:
      'Fluxguard monitors Web site changes for defacement & tamper protection, visual ' +
      'regression testing, synthetic transaction monitoring, and more.',
    image: '/static/images/showcase/fluxguard.jpg',
    link: 'https://www.fluxguard.com/',
    similarWebGlobal: 13041,
  },
  {
    title: 'Magic Mondayz',
    description:
      'A company that focuses on providing an honest and efficient recruitment service, ' +
      'the human way.',
    image: '/static/images/showcase/magicmondayz.jpg',
    link: 'https://magicmondayz.com/',
    similarWebGlobal: 13199,
  },
  {
    title: 'Typekev',
    description:
      'The personal website of a React and Blockchain developer. The code is open-source.',
    image: '/static/images/showcase/typekev.jpg',
    link: 'https://typekev.com/',
    source: 'https://github.com/typekev/typekev-site',
    similarWebGlobal: 13511,
  },
  {
    title: 'Flink',
    description:
      'We revolutionized the insurance contract and developed new products that are ' +
      'ahead of their time: MyThings and MyDamages. With only half a page of text and simple ' +
      'illustrations, we have developed the shortest insurance contracts worldwide. ' +
      'And the simplest.',
    image: '/static/images/showcase/flink.jpg',
    link: 'https://goflink.ch/',
    similarWebGlobal: 17366,
  },
  {
    title: 'DropDesk',
    description:
      'DropDesk creates unique workspaces & experiences by converting unused space into vibrant ' +
      'coworking spaces. Meet, work and gain a sense of community.',
    image: '/static/images/showcase/dropdesk.jpg',
    link: 'https://drop-desk.com/',
    similarWebGlobal: 17626,
  },
  {
    title: 'Tentu',
    description:
      'A web app built with Material-UI v1 and Firebase that offers the user news and events ' +
      'of interest. 🇪🇸',
    link: 'https://tentu.eus/',
    image: '/static/images/showcase/tentu.jpg',
    similarWebGlobal: 27137,
  },
  {
    title: 'Swimmy',
    description: 'An open source forum PWA. 🇯🇵 (Github docs are in English)',
    image: '/static/images/showcase/swimmy.jpg',
    link: 'https://swimmy.io/',
    source: 'https://github.com/swimmy/swimmy.io',
    stars: 3,
    similarWebGlobal: 28034,
  },
  {
    title: 'Planalyze',
    description:
      'Planalyze is a real-time daily planning & task tracking tool that keeps teams connected ' +
      "& ahead of each day's workload.",
    image: '/static/images/showcase/planalyze.jpg',
    link: 'https://www.planalyze.io/',
    similarWebGlobal: 34392,
  },
  {
    title: 'PhotoUtils',
    description: 'Online photo editor. 6 simple and free image editing tools.',
    image: '/static/images/showcase/photoutils.jpg',
    link: 'https://photoutils.com/',
    similarWebGlobal: 36341,
  },
  {
    title: 'Local Insights',
    description:
      'A real estate data provider that aggregates and analyzes property records, ' +
      'permits, and tax documents.',
    image: '/static/images/showcase/localinsights.jpg',
    link: 'https://localinsights.io/',
    similarWebGlobal: 'no data',
  },
  {
    title: 'Code Typing Tutor',
    description: 'Keyboard simulator that helps to write code quickly and without errors.',
    image: '/static/images/showcase/code-typing-tutor.png',
    link: 'https://code-typing-tutor.com/',
    similarWebGlobal: 'no data',
  },
  {
    title: 'Team SC',
    description:
      'The site of a cognitive neuroscience research group, ' +
      'with a carefully designed interface and animation. 🇨🇳',
    image: '/static/images/showcase/sc.bnu.edu.cn.jpg',
    link: 'http://sc.bnu.edu.cn/',
    similarWebGlobal: 'n/a - subdomain',
  },
  {
    title: 'npm registry browser',
    description:
      'An open source web app that lets you search the npm registry ' +
      'and browse packages details.',
    image: '/static/images/showcase/npm-registry-browser.jpg',
    link: 'https://topheman.github.io/npm-registry-browser/',
    source: 'https://github.com/topheman/npm-registry-browser',
    stars: 78,
  },
  {
    title: 'Snippets Chrome Extension',
    description:
      'An open source Chrome extension allowing you to import and execute JavaScript code ' +
      'snippets from GitHub.',
    image: '/static/images/showcase/snippets.jpg',
    link: 'https://chrome.google.com/webstore/detail/snippets/dcibnkkafifbanoclgjbkmkbogijndin',
    source: 'https://github.com/richardscarrott/snippets',
    stars: 36,
  },
  {
    title: 'Material Blog',
    description:
      'An open source blog with a UI built entirely using material-ui v1. ' +
      'Check out the theming page, which leverages `MuiThemeProvider` ' +
      'to allow for live theme changes.',
    link: 'https://jdupont.github.io/',
    image: '/static/images/showcase/jdupont.jpg',
    source: 'https://github.com/jdupont/jdupont.github.io',
    stars: 14,
  },
  {
    title: 'Componofy: Spotify Playlist Combination',
    description:
      'An open source web app that allows a Spotify user to combine private and public playlists ' +
      'and either create a new one or merge with existing playlist. ' +
      'You can also reorder your playlist tracks and upload new playlist cover images.',
    image: '/static/images/showcase/componofy.jpg',
    link: 'https://componofy.herokuapp.com/',
    source: 'https://github.com/DalerAsrorov/componofy',
    stars: 5,
  },
];

function Showcase(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      {appList.map(app => (
        <div key={app.image}>
          <Typography component="h2" variant="h4" gutterBottom className={classes.title}>
            <span>{app.title}</span>
            {app.source ? (
              <IconButton href={app.source} target="_blank" aria-label={`${app.title} source code`}>
                <GithubIcon />
              </IconButton>
            ) : null}
          </Typography>
          <Card className={classes.card}>
            <CardMedia
              component="a"
              href={app.link}
              rel="noopener nofollow"
              target="_blank"
              className={classes.cardMedia}
              image={app.image}
              title={app.title}
            />
          </Card>
          <Typography className={classes.description}>{app.description}</Typography>
        </div>
      ))}
    </div>
  );
}

Showcase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Showcase);
