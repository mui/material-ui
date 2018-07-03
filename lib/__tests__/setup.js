const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-react-adapter-future');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });
