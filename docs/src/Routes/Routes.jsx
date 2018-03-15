import React from 'react';
import { Switch, Route } from 'react-router';

import Demos from './Demos';
import Landing from './Landing/Landing';
import Installation from './GettingStarted/Installation';
import Usage from './GettingStarted/Usage';
import DateFnsLocalization from './Localization/DateFnsLocalization';
import MomentLocalization from './Localization/MomentLocalization';

export default () => (
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/installation" component={Installation} />
    <Route path="/usage" component={Usage} />
    <Route path="/demo" component={Demos} />
    <Route path="/localization/date-fns" component={DateFnsLocalization} />
    <Route path="/localization/moment" component={MomentLocalization} />
  </Switch>
);

