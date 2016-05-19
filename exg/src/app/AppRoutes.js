import React from 'react';
import {
  Route,
  Redirect,
  IndexRedirect,
} from 'react-router';

// Here we define all our material-ui ReactComponents.
import Master from './components/Master';
import Overview from './components/pages/Overview';
import Channels from './components/pages/Channels';
import LandingPages from './components/pages/LandingPages';
import RefUrls from './components/pages/RefUrls';
import Search from './components/pages/Search';
import Outcomes from './components/pages/Outcomes';
import Campaigns from './components/pages/Campaigns';


/**
 * Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' and will recursively render its
 * handler and its parent handler like so: Paper > Components > Master
 */
const AppRoutes = (
  <Route path="/" component={Master}>
    <IndexRedirect to="/overview" />
    <Route path="overview" component={Overview} />
    <Route path="channels" component={Channels} />
    <Route path="landingpages" component={LandingPages} />
    <Route path="refurls" component={RefUrls} />
    <Route path="search" component={Search} />
    <Route path="outcomes" component={Outcomes} />
    <Route path="campaigns" component={Campaigns} />
  </Route>
);

export default AppRoutes;
