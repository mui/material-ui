// /* eslint-env mocha */
// import Box from './Box';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import TestUtils from 'react-dom/test-utils';
// import {assert, expect} from 'chai';
// import getMuiTheme from '../styles/getMuiTheme';
// import {shallow, mount} from 'enzyme';

// describe('<Box />', () => {
//   const muiTheme = getMuiTheme();
//   const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
//   const mountWithContext = (node) => mount(node, {context: {muiTheme}});
//   const testChildren = <div className="unique">Hello World</div>;

//   it('renders children by default', () => {
//     const wrapper = shallowWithContext(
//       <Box>{testChildren}</Box>
//     );

//     assert.ok(wrapper.contains(testChildren), 'should contain the children');
//   });

//   it('renders className', () => {
//     const wrapper = shallowWithContext(
//       <Box className="testClassName" />
//     );

//     assert.ok(wrapper.is('.testClassName'), 'should contain the className');
//   });

//   it('allows us to set props', () => {
//     const style = {
//       border: '1px solid grey',
//     };
//     const wrapper = mountWithContext(
//       <Box
//         inline={false}
//         hAlign="start"
//         margin={10}
//         style={style}
//         cursorPointer={true}
//       />
//     );
//     assert.strictEqual(wrapper.props().inline, false, 'should equal false');
//     assert.strictEqual(wrapper.props().hAlign, 'start', 'should equal start');
//     assert.strictEqual(wrapper.props().margin, 10, 'should equal 10');
//     assert.strictEqual(wrapper.props().style, style, 'should equal style');
//     assert.strictEqual(wrapper.props().cursorPointer, true, 'should equal true');
//   });

//   // it('', () => {
//   //   const wrapper = mountWithContext(
//   //     <Box inline={true} />
//   //   );
//     // assert.strictEqual(wrapper.find('div').props().style, 'inline');     //style is undefined no matter what
//     // console.log(wrapper.find('.fuwykd3').props().style);
//     // console.log(wrapper.childAt(0));
//   // });
//   // it('', () => {
//   //   const wrapper = mountWithContext(
//   //     <Box inline={true} />
//   //   );
//   //   const div = ReactDOM.findDOMNode(
//   //     TestUtils.findRenderedDOMComponentWithTag(
//   //       wrapper.instance(),
//   //       'div'
//   //     )
//   //   );
//   //   console.log(div);       // seem to have no actual element
//     // expect(wrapper).to.have.style('inline'); // TypeError: (0 , _chai.expect)(...).to.have.style is not a function (copied from the chai-enzyme documentation)
//   // });
// });
