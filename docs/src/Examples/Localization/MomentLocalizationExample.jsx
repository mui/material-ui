import React from 'react';
import moment from 'moment';
import 'moment/locale/fr'; // this is the important bit, you have to import the locale your'e trying to use.
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
