import {hashHistory, Router, Route, IndexRedirect} from 'react-router';
import React, {Component} from 'react';
import AppFrame from './AppFrame';
import Home from '../pages/Home';

export default class AppRouter extends Component {
  render() {
    return (
      <Router history={hashHistory} {...this.props}>
        <Route title="Material UI" path="/" component={AppFrame}>
          <IndexRedirect to="home" />
          <Route
            path="home"
            component={Home}
            title="Home"
          />
        </Route>
      </Router>
    );
  }
}
