const React = require('react');
const ReactDOM = require('react-dom/client');
const { ListWithTransitions } = require('./internal-ui.cjs');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(ListWithTransitions));
