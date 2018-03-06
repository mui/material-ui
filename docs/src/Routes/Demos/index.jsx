import React from 'react'
import { Switch, Route } from 'react-router'

import DatePickerDemo from './DatePickerDemo'
import TimePickerDemo from './TimePickerDemo'

export default () => (
  <Switch>
    <Route path="/demo/datepicker" component={DatePickerDemo} />
    <Route path="/demo/timepicker" component={TimePickerDemo} />
  </Switch>
)