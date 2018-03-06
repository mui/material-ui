import React from 'react'
import { Switch, Route } from 'react-router'

import Landing from './Landing/Landing'
import Demos from './Demos'

export default () => (
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/demo" component={Demos} />
  </Switch>
)