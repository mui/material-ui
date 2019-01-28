import React from 'react';
import { Switch, Route } from 'react-router';

import DateFnsLocalization from './Localization/Date-fns/DateFnsLocalization';
import MomentLocalization from './Localization/Moment/MomentLocalization';
import PersianCalendar from './Localization/Persian/PersianCalendar';
import DatePickerDemo from './Components/DatePicker/DatePickerDemo';
import TimePickerDemo from './Components/TimePicker/TimePickerDemo';
import DateTimePickerDemo from './Components/DateTimePicker/DateTimePickerDemo';
import CssOverrides from './Guides/CssOverrides';
import FormatCustomization from './Guides/FormatsCustomization';
import ControllingProgrammatically from './Guides/ControllingProgrammatically';
import StaticPickers from './Guides/StaticPickers';
import Installation from './GettingStarted/Installation';
import Usage from './GettingStarted/Usage';
import ParsingDates from './GettingStarted/ParsingDates';
import Landing from '../Landing/Landing';
import Formik from './Guides/Formik';
import { Regression } from './Regression/Regression';

export default () => (
  <Switch>
    <Route path="/localization/date-fns" component={DateFnsLocalization} />
    <Route path="/localization/moment" component={MomentLocalization} />
    <Route path="/localization/persian" component={PersianCalendar} />
    <Route path="/api/datepicker" component={DatePickerDemo} />
    <Route path="/api/datetimepicker" component={DateTimePickerDemo} />
    <Route path="/api/timepicker" component={TimePickerDemo} />

    <Route path="/guides/css-overrides" component={CssOverrides} />
    <Route path="/guides/formats" component={FormatCustomization} />
    <Route path="/guides/formik-integration" component={Formik} />

    <Route path="/guides/controlling-programmatically" component={ControllingProgrammatically} />
    <Route path="/guides/static-pickers" component={StaticPickers} />

    <Route path="/" exact component={Landing} />
    <Route path="/installation" component={Installation} />
    <Route path="/usage" component={Usage} />
    <Route path="/parsing" component={ParsingDates} />

    <Route path="/regression" component={Regression} />
  </Switch>
);
