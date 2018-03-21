import React from 'react';
import moment from 'moment';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

moment.locale('fr');

const App = () => (
  <MuiPickersUtilsProvider
    utils={MomentUtils}
    moment={moment}
    locale="fr"
  >
      ...
  </MuiPickersUtilsProvider>
);

export default App;
