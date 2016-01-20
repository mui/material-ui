import React from 'react';
import ListItem from 'lists/list-item';
import Checkbox from 'checkbox';
import injectTheme from '../fixtures/inject-theme';
import TestUtils from 'react-addons-test-utils';

describe('ListItem', () => {
  let ThemedListItem;

  beforeEach(() => {
    ThemedListItem = injectTheme(ListItem);
  });

  it('should display a list-item', () => {
    let render = TestUtils.renderIntoDocument(
      <ThemedListItem />
    );
    let nodeTree = TestUtils.scryRenderedDOMComponentsWithTag(render, 'div');
    let itemSpan = nodeTree[0].firstChild;

    expect(itemSpan.tagName).to.equal('SPAN');
  });

  it('should display a list-item with text if primaryText is specified', () => {
    let testText = 'Primary Text';
    let render = TestUtils.renderIntoDocument(
      <ThemedListItem
        primaryText = {testText}
      />
    );
    let nodeTree = TestUtils.scryRenderedDOMComponentsWithTag(render, 'div');
    let itemSpan = nodeTree[0].firstChild;

    expect(itemSpan.childNodes[0].innerText).to.equal(testText);
  });

  it('should display a list-item elment with a class if specified', () => {
    let testClass = 'test-class';
    let render = TestUtils.renderIntoDocument(
      <ThemedListItem
        className = {testClass}
      />
    );
    let nodeTree = TestUtils.scryRenderedDOMComponentsWithTag(render, 'div');
    let itemSpan = nodeTree[0].firstChild;

    expect(itemSpan.hasAttribute('class')).to.be.true;
    expect(itemSpan.getAttribute('class')).to.equal(testClass);
  });

  it('should display a disabled list-item if specified.', () => {
    let render = TestUtils.renderIntoDocument(
      <ThemedListItem
        disabled = {true}
      />
    );
    let nodeTree = TestUtils.scryRenderedDOMComponentsWithTag(render, 'div');
    let itemDiv = nodeTree[0].firstChild;

    expect(itemDiv.tagName).to.equal('DIV');
  });

  it('should display a disabled list-item with a class if specified.', () => {
    let testClass = 'test-class';
    let render = TestUtils.renderIntoDocument(
      <ThemedListItem
        className = {testClass}
        disabled = {true}
      />
    );
    let nodeTree = TestUtils.scryRenderedDOMComponentsWithTag(render, 'div');
    let itemDiv = nodeTree[0].firstChild;

    expect(itemDiv.tagName).to.equal('DIV');
    expect(itemDiv.hasAttribute('class')).to.be.true;
    expect(itemDiv.getAttribute('class')).to.equal(testClass);
  });

  it('should display a checkbox in the list-item if specified.', () => {
    let render = TestUtils.renderIntoDocument(
      <ThemedListItem
        leftCheckbox={<Checkbox />}
      />
    );
    let input = TestUtils.findRenderedDOMComponentWithTag(render, 'input');

    expect(input.parentElement.tagName).to.equal('DIV');
    expect(input.hasAttribute('checked')).to.be.false;
  });

  it('should have a class if specified with a checkbox.', () => {
    let testClass = 'test-class';
    let render = TestUtils.renderIntoDocument(
      <ThemedListItem
        leftCheckbox={<Checkbox />}
        className={testClass}
      />
    );

    let input = TestUtils.findRenderedDOMComponentWithTag(render, 'input');
    let listItemDiv = input.parentElement.parentElement;

    expect(listItemDiv.tagName).to.equal('LABEL');
    expect(listItemDiv.hasAttribute('class')).to.be.true;
    expect(listItemDiv.getAttribute('class')).to.equal(testClass);
  });
});
