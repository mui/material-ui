/* eslint-env mocha */
// import React from 'react';
// import {shallow} from 'enzyme';
// import {assert} from 'chai';
// import {createMuiTheme} from '../styles/theme';
// import {createStyleManager} from 'stylishly/styleManager';
// import Button, {styleSheet} from './Button';

// describe('<Button />', () => {
//   const theme = createMuiTheme();
//   const styleManager = createStyleManager({theme});
//   const shallowWithContext = (node, context = {}) =>
//     shallow(node, {context: {styleManager, ...context}});

//   it('should render a primary color raised button', () => {
//     const wrapper = shallowWithContext(
//       <Button raised={true} primary={true}>Hello World</Button>
//     );
//     const classes = styleManager.getClasses(styleSheet);
//     assert.ok(
//       wrapper.hasClass(classes.raised),
//       'should have the raised class'
//     );
//     assert.ok(
//       wrapper.hasClass(classes.raisedPrimary),
//       'should have the raised primary class'
//     );
//   });
// });
