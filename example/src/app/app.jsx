(function () {
  var React = require('react/addons');
  var injectTapEventPlugin = require('react-tap-event-plugin');
  var Theme = require('../../../src/js/styles/theme.js');
  var Main = require('./components/main.jsx'); // Our custom react component

  //Needed for React Developer Tools
  window.React = React;

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  //Override Theme Variables
  Theme.set({
    textColor: 'red'
  });

  // Render the main app react component into the document body. 
  // For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
  React.render(<Main />, document.body);

})();