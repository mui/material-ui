import React from 'react';
import {renderIntoDocument} from 'react-addons-test-utils';
import {expect} from 'chai';
import MenuItem from 'menus/menu-item';


describe('MenuItem', () => {
  it('should display the parent element as the first element when the DOM is rendered', () => {
  /***Method 1***/
    //Set up the page
    const markup = React.renderToStaticMarkup(
      <MenuItem key="a" primaryText="parent">
        <MenuItem key="a1" primaryText="child1" />
        <MenuItem key="a2" primaryText="child2" />
      </MenuItem>
    );
    //Expected DOM value
    const expectedMarkUp = '<div><span style="border:10px;background:none;'
    + 'box-sizing:border-box;display:block;font:inherit;font-family:Roboto, '
    + 'sans-serif;tap-highlight-color:rgba(0, 0, 0, 0);cursor:pointer;'
    + 'text-decoration:none;outline:none;transform:translate3d(0, 0, 0);'
    + 'color:rgba(0, 0, 0, 0.87);font-size:16px;line-height:48px;position:'
    + 'relative;transition:all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;'
    + 'white-space:nowrap;mui-prepared:;" tabindex="0" type="button"><div>'
    + '<div style="mui-prepared:;">parent</div>'
    + '<div style="margin-left:0;padding-left:16px;padding-right:16px;'
    + 'padding-bottom:0;padding-top:0;position:relative;mui-prepared:;">'
    + '<div><span style="border:10px;background:none;box-sizing:border-box;'
    + 'display:block;font:inherit;font-family:Roboto, sans-serif;'
    + 'tap-highlight-color:rgba(0, 0, 0, 0);cursor:pointer;'
    + 'text-decoration:none;outline:none;transform:translate3d(0, 0, 0);'
    + 'color:rgba(0, 0, 0, 0.87);font-size:16px;line-height:48px;'
    + 'position:relative;'
    + 'transition:all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;'
    + 'white-space:nowrap;mui-prepared:;" tabindex="0" type="button">'
    + '<div><div style="margin-left:0;padding-left:16px;padding-right:16px;'
    + 'padding-bottom:0;padding-top:0;position:relative;mui-prepared:;">'
    + '<div style="mui-prepared:;">child1</div></div></div></span></div>'
    + '<div><span style="border:10px;background:none;box-sizing:border-box;'
    + 'display:block;font:inherit;font-family:Roboto, sans-serif;'
    + 'tap-highlight-color:rgba(0, 0, 0, 0);cursor:pointer;'
    + 'text-decoration:none;outline:none;transform:translate3d(0, 0, 0);'
    + 'color:rgba(0, 0, 0, 0.87);font-size:16px;line-height:48px;'
    + 'position:relative;'
    + 'transition:all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;'
    + 'white-space:nowrap;mui-prepared:;" tabindex="0" type="button">'
    + '<div><div style="margin-left:0;padding-left:16px;padding-right:16px;'
    + 'padding-bottom:0;padding-top:0;position:relative;mui-prepared:;">'
    + '<div style="mui-prepared:;">child2</div></div></div></span></div></div>'
    + '</div></span></div>';
    expect(markup).to.equal(expectedMarkUp);
  /***END OF Method 1***/
  });

  it('should display the textContent beginning with parent followed by the child elements', () => {
    /***METHOD 2****/
    //Setup the page
    const component = renderIntoDocument(
      <MenuItem key="a" primaryText="parent">
        <MenuItem key="a1" primaryText="child1" />
        <MenuItem key="a2" primaryText="child2" />
      </MenuItem>
                    );
    const renderedDOM = () => React.findDOMNode(component);
    const renderedDivs = renderedDOM().querySelectorAll('div');
    const actualTextNodeOrder = renderedDivs[0].textContent;
    //Expected textnode order
    const expectedTextNodeOrder = 'parentchild1child2';
    expect(actualTextNodeOrder).to.equal(expectedTextNodeOrder);
    /***END OF METHOD2***/
  });
});
