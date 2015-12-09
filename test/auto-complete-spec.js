import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import {spy} from 'sinon';
import AutoComplete from 'auto-complete';
import TextField from 'text-field';
import ListItem from 'lists/list-item';
import injectTheme from './fixtures/inject-theme';

let injectTapEventPlugin = require('react-tap-event-plugin');
console.log('test');
describe('AutoComplete', () => {

  let ThemedAutoComplete;

  beforeEach(() => {
    injectTapEventPlugin();
    ThemedAutoComplete = injectTheme(AutoComplete);
  });

  it(`should not throw an error when dataSource prop is undefined`, () => {
    expect(() => {
      ReactTestUtils.renderIntoDocument(
        <ThemedAutoComplete />
      );
    }).to.not.throw(Error);
  });

  it(`should bubble 'onChange' event`, () => {

    const onChange = spy();

    let rendered = ReactTestUtils.renderIntoDocument(
  		<ThemedAutoComplete dataSource={['Red', 'Blue', 'Green']} onChange={onChange} />
  	);

    const renderedTextField = ReactTestUtils.findRenderedComponentWithType(rendered, TextField);
    const inputNode = renderedTextField._getInputNode();

    inputNode.value = 'R';
    ReactTestUtils.Simulate.change(inputNode);

    const renderedListItems = ReactTestUtils.scryRenderedComponentsWithType(rendered, ListItem);
    const listItemNode = ReactDOM.findDOMNode(renderedListItems[0]);
    console.log(listItemNode);
    ReactTestUtils.Simulate.touchTap(listItemNode);

    setTimeout(() => {
      assert(onChange.calledOnce, 'onChange.calledOnce');
    }, 100);

  });

  it(`should bubble 'onFocus' event`, () => {

    const onFocus = spy();

    let rendered = ReactTestUtils.renderIntoDocument(
      <ThemedAutoComplete onFocus={onFocus} />
    );

    const renderedTextField = ReactTestUtils.findRenderedComponentWithType(rendered, TextField);
    // const textFieldNode = ReactDOM.findDOMNode(renderedTextField);
    const inputNode = renderedTextField._getInputNode();

    ReactTestUtils.Simulate.focus(inputNode);

    assert(onFocus.calledOnce, 'onFocus.calledOnce');

  });

  it(`should bubble 'onBlur' event`, () => {

    const onBlur = spy();

    let rendered = ReactTestUtils.renderIntoDocument(
      <ThemedAutoComplete onBlur={onBlur} />
    );

    const renderedTextField = ReactTestUtils.findRenderedComponentWithType(rendered, TextField);
    // const textFieldNode = ReactDOM.findDOMNode(renderedTextField);
    const inputNode = renderedTextField._getInputNode();

    ReactTestUtils.Simulate.blur(inputNode);

    assert(onBlur.calledOnce, 'onBlur.calledOnce');

  });

});
