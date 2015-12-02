import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import { spy } from 'sinon';

import AutoComplete from 'auto-complete';
import TextField from 'text-field';

import injectTheme from './fixtures/inject-theme';

describe('AutoComplete', () => {

  let ThemedAutoComplete;
 
  beforeEach(() => {
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

  	var onChange = spy();

  	let rendered = ReactTestUtils.renderIntoDocument(
  		<ThemedAutoComplete onChange={onChange} />
  	);

    const renderedTextField = ReactTestUtils.findRenderedComponentWithType(rendered, TextField);
    const textFieldNode = ReactDOM.findDOMNode(renderedTextField);
    const inputNode = renderedTextField._getInputNode();

    inputNode.value = 'ChangedValue';
    ReactTestUtils.Simulate.change(inputNode);

    assert(onChange.calledOnce, 'onChange.calledOnce');

  });

  it(`should bubble 'onFocus' event`, () => {

    var onFocus = spy();

    let rendered = ReactTestUtils.renderIntoDocument(
      <ThemedAutoComplete onFocus={onFocus} />
    );

    const renderedTextField = ReactTestUtils.findRenderedComponentWithType(rendered, TextField);
    const textFieldNode = ReactDOM.findDOMNode(renderedTextField);
    const inputNode = renderedTextField._getInputNode();

    ReactTestUtils.Simulate.focus(inputNode);

    assert(onFocus.calledOnce, 'onFocus.calledOnce');

  });

  it(`should bubble 'onBlur' event`, () => {

    var onBlur = spy();

    let rendered = ReactTestUtils.renderIntoDocument(
      <ThemedAutoComplete onBlur={onBlur} />
    );

    const renderedTextField = ReactTestUtils.findRenderedComponentWithType(rendered, TextField);
    const textFieldNode = ReactDOM.findDOMNode(renderedTextField);
    const inputNode = renderedTextField._getInputNode();

    ReactTestUtils.Simulate.focus(inputNode);

    assert(onBlur.calledOnce, 'onBlur.calledOnce');

  });

});
