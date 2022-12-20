/**
 * The app structure:
 *
 * {
 *   title: string;
 *   description: string;
 *   image?: string;
 *   link: string;
 *   source?: string;
 *   similarWebVisits?: number;
 *   dateAdded: string; // ISO 8601 format: YYYY-MM-DD
 * }
 */
const appList = [
  {
    title: 'd-cide',
    description:
      'A progressive Web App to make rational decisions in workshops. ' +
      'It uses MUI with a neumorphic custom theme.',
    image: 'dcide.jpg',
    link: 'https://d-cide.me/',
    source: 'https://github.com/cjoecker/d-cide',
    dateAdded: '2020-07-01',
  },
  {
    title: 'QuintoAndar',
    description:
      'QuintoAndar is a company that uses technology and ' +
      'design to simplify the rental of residential real estate.',
    image: 'quintoandar.png',
    link: 'https://www.quintoandar.com.br/',
    similarWebVisits: 8500,
    dateAdded: '2019-05-08',
  },
  {
    title: 'Bethesda.net',
    description:
      'The official site for Bethesda, publisher of Fallout, DOOM, Dishonored, ' +
      'Skyrim, Wolfenstein, The Elder Scrolls, more. Your source for news, features & community.',
    image: 'bethesda.jpg',
    link: 'https://bethesda.net/',
    similarWebVisits: 4000,
    dateAdded: '2019-01-01',
  },
  {
    title: 'OpenClassrooms',
    description:
      'OpenClassrooms is an online platform offering top quality, ' +
      'education-to-employment programs and career coaching services for students worldwide. ',
    image: 'openclassrooms.jpg',
    link: 'https://openclassrooms.com/en/',
    similarWebVisits: 6000,
    dateAdded: '2018-01-34',
  },
  {
    title: 'Codementor',
    description:
      'Codementor is the largest community for developer mentorship and an on-demand marketplace ' +
      'for software developers. Get instant coding help, build projects faster, ' +
      'and read programming tutorials from our community of developers.',
    image: 'codementor.jpg',
    link: 'https://www.codementor.io/',
    similarWebVisits: 1500,
    dateAdded: '2018-01-34',
  },
  {
    title: 'BARKS',
    description: 'Japan Music Network. 🇯🇵',
    image: 'barks.jpg',
    link: 'https://www.barks.jp/',
    similarWebVisits: 3000,
    dateAdded: '2019-01-01',
  },
  {
    title: 'GovX',
    description:
      'Current & former uniformed professionals get exclusive access to deals ' +
      'on gear, apparel, tickets, travel and more.',
    image: 'govx.jpg',
    link: 'https://www.govx.com/',
    similarWebVisits: 2000,
    dateAdded: '2018-01-31',
  },
  {
    title: 'Hijup',
    description: 'A pioneering Muslim Fashion e-commerce site.',
    image: 'hijup.jpg',
    link: 'https://www.hijup.com/',
    similarWebVisits: 328,
    dateAdded: '2018-01-18',
  },
  {
    title: 'iFit',
    description:
      'Get the best personal training, right at home. Access hundreds of training programs, ' +
      'unique health tips, and expert advice that will lead you to a healthier lifestyle.',
    image: 'ifit.jpg',
    link: 'https://www.ifit.com/',
    similarWebVisits: 304,
    dateAdded: '2019-01-01',
  },
  {
    title: 'EQ3',
    description:
      'Modern Furniture & Accessories, designed in Canada, for everyday living.',
    image: 'eq3.jpg',
    link: 'https://www.eq3.com/ca/en',
    similarWebVisits: 256,
    dateAdded: '2018-01-34',
  },
  {
    title: 'Housecall Pro',
    description:
      'The #1 rated mobile software to run your home service business. ' +
      'Schedule, dispatch, GPS track employees, invoice, accept credit cards and get booked ' +
      'online. The marketing website is also built with MUI: https://www.housecallpro.com/',
    image: 'housecall.jpg',
    link: 'https://pro.housecallpro.com/pro/log_in',
    similarWebVisits: 1800,
    dateAdded: '2019-01-01',
  },
  {
    title: 'VMware CloudHealth',
    description:
      'The most trusted cloud management platform that enables users to analyze and manage cloud ' +
      'cost, usage and performance in one place. ' +
      '(Used for the business application, but not the marketing website.)',
    image: 'cloudhealth.jpg',
    link: 'https://cloudhealth.vmware.com/',
    similarWebVisits: 132,
    dateAdded: '2018-01-37',
  },
  {
    title: 'CityAds',
    description:
      'CityAds Media: global technology platform for online performance marketing ' +
      'powered by big data',
    image: 'cityads.jpg',
    link: 'https://cityads.com/main',
    similarWebVisits: 132,
    dateAdded: '2019-01-01',
  },
  {
    title: 'EOS Toolkit',
    description:
      'EOSToolkit is the premier free, open source interface for managing EOS ' +
      'accounts. Create, transfer, stake, vote and more with Scatter!',
    image: 'eostoolkit.jpg',
    link: 'https://eostoolkit.io/',
    source: 'https://github.com/eostoolkit/eostoolkit',
    stars: 91,
    dateAdded: '2019-01-01',
  },
  {
    title: 'The Media Ant',
    description:
      "India's Largest online marketing service provider, " +
      'with more than 200K advertising options, and more than 1M satisfied customers.',
    image: 'themediaant.jpg',
    link: 'https://www.themediaant.com/',
    similarWebVisits: 90,
    dateAdded: '2019-01-01',
  },
  {
    title: 'Forex Bank',
    description:
      'Vi kan tilby kjapp og enkel valutaveksling, pengeoverføringer, samt kjøp av norsk veksel. ' +
      '🇳🇴',
    image: 'forex.jpg',
    link: 'https://www.forex.no/',
    similarWebVisits: 95,
    dateAdded: '2018-01-34',
  },
  {
    title: 'LocalMonero',
    description:
      'A safe and easy-to-use person-to-person platform to allow anyone ' +
      'to trade their local currency for Monero, anywhere.',
    image: 'localmonero.jpg',
    link: 'https://localmonero.co/?rc=ogps',
    dateAdded: '2018-01-04',
  },
  {
    title: 'LessWrong',
    description:
      'LessWrong is a community blog devoted to the art of human rationality.',
    image: 'lesswrong.jpg',
    link: 'https://www.lesswrong.com/',
    similarWebVisits: 1000,
    dateAdded: '2018-01-38',
  },
  {
    title: 'ODIGEO Connect',
    description:
      "Connect your hotel, B&B and apartment with Europe's #1 flight OTA " +
      'and distribute it to millions of travellers.',
    image: 'odigeo.jpg',
    link: 'https://www.odigeoconnect.com/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'comet',
    description:
      'Comet lets you track code, experiments, and results on ML projects. ' +
      "It's fast, simple, and free for open source projects.",
    image: 'comet.jpg',
    link: 'https://www.comet.com/',
    similarWebVisits: 180,
    dateAdded: '2019-01-01',
  },
  {
    title: 'Pointer',
    description:
      'Revestimentos cerâmicos para pisos e paredes com qualidade e design acessível. ' +
      'A Pointer faz parte da Portobello e atua no Nordeste do Brasil. 🇧🇷',
    image: 'pointer.jpg',
    link: 'https://www.pointer.com.br/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Oneplanetcrowd',
    description:
      "Oneplanetcrowd is Europe's leading sustainable crowdfunding platform for People & Planet.",
    image: 'oneplanetcrowd.jpg',
    link: 'https://www.oneplanetcrowd.com/en',
    dateAdded: '2019-01-01',
  },
  {
    title: 'CollegeAI',
    description:
      'Get a college recommendation and your chances using the best college predictor. ' +
      "Answer some questions and we'll calculate where you fit in best with our college finder " +
      'and college matching tools. CollegeAI is an admissions and college counselor, college ' +
      'planner, and college chance calculator.',
    image: 'collegeai.jpg',
    link: 'https://collegeai.com',
    dateAdded: '2019-01-01',
  },
  {
    title: 'react-admin',
    description:
      'The admin of an imaginary poster shop, used as a demo for the react-admin framework. ' +
      'Uses many material-ui components, including tables, forms, snackbars, buttons, and ' +
      'theming. The UI is responsive. The code is open-source!',
    image: 'posters-galore.jpg',
    link: 'https://marmelab.com/react-admin-demo/',
    source: 'https://github.com/marmelab/react-admin',
    dateAdded: '2018-01-21',
    stars: 18500,
  },
  {
    title: 'Builder Book',
    description:
      'Books to learn how to build full-stack, production-ready JavaScript web applications from scratch. ' +
      'Learn React, MUI, Next, Express, Mongoose, MongoDB, third party APIs, and more.',
    image: 'builderbook.jpg',
    link: 'https://builderbook.org/',
    source: 'https://github.com/async-labs/builderbook',
    stars: 3000,
    dateAdded: '2018-01-05',
  },
  {
    title: 'Commit Swimming',
    description: 'The #1 workout journal for coaches and swimmers.',
    image: 'commitswimming.jpg',
    link: 'https://commitswimming.com/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'EventHi',
    description:
      'Cannabis event platform to create and coordinate Cannabis events for the Cannabis ' +
      'community. Use our easy ticketing system, sponsor, and sell merchandise.',
    image: 'eventhi.jpg',
    link: 'https://eventhi.io/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'Iceberg Finder',
    description:
      'Whether spotting them from outer space, or standing on our coastline, ' +
      'IcebergFinder.com is your premier place for finding bergs in Newfoundland and Labrador.',
    image: 'icebergfinder.jpg',
    link: 'https://icebergfinder.com/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'MetaFact',
    description:
      "Metafact is a place to verify knowledge via the world's top experts. " +
      "It's a platform to ask questions, learn the facts and share the truth.",
    image: 'metafact.jpg',
    link: 'https://metafact.io/',
    dateAdded: '2019-01-01',
  },
  {
    title: 'AudioNodes',
    description:
      'Modular audio production suite with multi-track audio mixing, audio effects, ' +
      'parameter automation, MIDI editing, synthesis, cloud production, and more.',
    image: 'audionodes.jpg',
    link: 'https://www.audionodes.com/',
    dateAdded: '2018-01-07',
  },
  {
    title: 'SlidesUp',
    description:
      'SlidesUp is a platform to help conference organizers plan their events.',
    image: 'slidesup.jpg',
    link: 'https://slidesup.com/',
    dateAdded: '2018-01-03',
  },
  {
    title: 'Typekev',
    description: 'The personal site of Kevin Gonzalez, featuring his witty chatbot.',
    image: 'typekev.jpg',
    link: 'https://typekev.com/',
    source: 'https://github.com/typekev/typekev-site',
    stars: 10,
    dateAdded: '2018-01-23',
  },
  {
    title: 'DropDesk',
    description:
      'DropDesk creates unique workspaces & experiences by converting unused space into vibrant ' +
      'coworking spaces. Meet, work and gain a sense of community.',
    image: 'dropdesk.jpg',
    link: 'https://drop-desk.com/',
    similarWebVisits: 50,
    dateAdded: '2019-01-01',
  },
  {
    title: 'npm registry browser',
    description:
      'An open source web app that lets you search the npm registry ' +
      'and browse packages details.',
    image: 'npm-registry-browser.jpg',
    link: 'https://topheman.github.io/npm-registry-browser/',
    source: 'https://github.com/topheman/npm-registry-browser',
    stars: 90,
    dateAdded: '2018-01-15',
  },
  {
    title: 'Snippets Chrome Extension',
    description:
      'An open source Chrome extension allowing you to import and execute JavaScript code ' +
      'snippets from GitHub.',
    image: 'snippets.jpg',
    link: 'https://chrome.google.com/webstore/detail/snippets/dcibnkkafifbanoclgjbkmkbogijndin',
    source: 'https://github.com/richardscarrott/snippets',
    stars: 42,
    dateAdded: '2018-01-19',
  },
  {
    title: 'Tree',
    description:
      'An open source top 100 documentaries (personal opinion) app ' +
      'with React Hooks and MUI.',
    link: 'https://tree.valleyease.me/',
    image: 'tree.jpg',
    source: 'https://github.com/ValleyZw/tree',
    stars: 24,
    dateAdded: '2018-01-35',
  },
  {
    title: 'TagSpaces',
    description:
      'TagSpaces is an offline, open source, file manager.' +
      'It helps organizing your files and folders with tags and colors.',
    image: 'tagspaces.jpg',
    link: 'https://www.tagspaces.org/demo/',
    source: 'https://github.com/tagspaces/tagspaces',
    stars: 2500,
    dateAdded: '2019-11-01',
  },
  {
    title: 'HiFiveWork',
    description: 'HiFiveWork, the cool tool for leave management',
    image: 'hifivework.png',
    link: 'https://hifivework.com/',
    dateAdded: '2020-01-08',
  },
  {
    title: 'FANSPO',
    description:
      'NBA trade machine and social analysis tools for the basketball community.',
    image: 'tradenba.jpg',
    link: 'https://fanspo.com/',
    similarWebVisits: 417,
    dateAdded: '2020-01-20',
  },
  {
    title: 'Backstage',
    description:
      'Backstage is an open platform by Spotify for building developer portals.',
    image: 'backstage.jpg',
    link: 'https://backstage.io',
    source: 'https://github.com/backstage/backstage',
    stars: 14300,
    dateAdded: '2020-08-31',
  },
  {
    title: 'buybags',
    description: 'buybags is a fashion shopping aggregator in Germany.',
    image: 'buybags.jpg',
    link: 'https://www.buybags.de/',
    dateAdded: '2020-10-08',
  },
  {
    title: 'react-admin CRM demo',
    description: 'A full-featured Customer Relationship Management app',
    image: 'atomiccrm.jpg',
    link: 'https://marmelab.com/react-admin-crm/',
    source: 'https://github.com/marmelab/react-admin/tree/master/examples/crm',
    stars: 18500,
    dateAdded: '2021-05-06',
  },
  {
    title: 'Saleor Store Dashboard',
    description: 'Dashboard application for Saleor headless e-commerce platform',
    image: 'saleor.jpg',
    link: 'https://demo.saleor.io/dashboard/',
    source: 'https://github.com/saleor/saleor-dashboard',
    stars: 15079,
    similarWebVisits: 62,
    dateAdded: '2022-02-05',
  },
  {
    title: 'MQTT Explorer',
    description:
      'A comprehensive MQTT Client which visualizes broker traffic in a hierarchical view. ' +
      'The protocol is used in many IoT and home automation scenarios, ' +
      'making integrating new services dead easy.',
    link: 'https://mqtt-explorer.com/',
    source: 'https://github.com/thomasnordquist/MQTT-Explorer',
    image: 'mqtt-explorer.png',
    stars: 1600,
    dateAdded: '2019-03-25',
  },
  {
    title: 'refine FineFoods demo',
    description: 'A full-featured Admin panel app',
    image: 'refine-finefoods.jpg',
    link: 'https://example.mui.admin.refine.dev/',
    source:
      'https://github.com/pankod/refine/tree/next/examples/fineFoods/admin/mui',
    stars: 2415,
    dateAdded: '2022-06-21',
  },
];

export default appList;
