/// <reference path="../typings/tsd.d.ts"/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Main from './components/main'; // Our custom react component

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
declare function require(p: string): any;
require("react-tap-event-plugin")();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
ReactDOM.render(<Main />, document.getElementById('app'));
