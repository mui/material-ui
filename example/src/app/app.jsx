(function () {

  var React = require('react'),
    injectTapEventPlugin = require("react-tap-event-plugin"),
    Main = require('./components/main.jsx');

  //Needed for React Developer Tools
  window.React = React;

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

  //Render the main app component
  React.render(<Main />, document.body);

})();