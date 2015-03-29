var React = require('react');
var CodeExample = require('../../code-example/code-example.jsx');
var mui = require('mui');
var Router = require('react-router');
var ComponentDoc = require('../../component-doc.jsx');
var RouteHandler = Router.RouteHandler;
var Tabs = mui.Tabs;
var Tab= mui.Tab;

var TabsPage = React.createClass({

  mixins: [Router.Navigation, Router.State],

  render: function(){
    var code =  '<Tabs> \n' +
                '  <Tab label="Item One" > \n' +
                '    <div className="tab-template-container"> \n' +
                '      <h2 className="mui-font-style-headline">Tab One Template Example</h2> \n' +
                '      <p> \n' +
                '        This is an example of a tab template! \n' +
                '      </p> \n' +
                '      <p> \n' +
                '        You can put any sort of HTML or react component in here. \n' +
                '      </p> \n' +
                '    </div> \n' +
                '  </Tab> \n' +
                '  <Tab label="Item Two" > \n' +
                '    <div className="tab-template-container"> \n' +
                '      <h2 className="mui-font-style-headline">Tab Two Template Example</h2> \n' +
                '      <p> \n' +
                '        This is another example of a tab template! \n' +
                '      </p> \n' +
                '      <p> \n' +
                '        Fair warning - the next tab routes to home! \n' +
                '      </p> \n' +
                '    </div> \n' +
                '  </Tab> \n' +
                '  <Tab \n' +
                '    label="Item Three" \n' +
                '    route="home" \n' +
                '    onActive={this._onActive} /> \n' +
                '</Tabs> \n' +
                '\n' +
                '_onActive: function(tab){ \n' +
                '  this.context.router.transitionTo(tab.props.route); \n' +
                '}';

    var desc = 'Refs cannot be set on individual Tab components as cloneWithProps is being ' +
      'used to extend the individual tab components under the hood. However, ' +
      'refs can be passed to the Tabs container and to any element or component within the template. ' +
      'If you need to access a tab directly - you can do so with the first argument of onActive or ' +
      'by accessing the props.children array by passing refs to the Tabs container.';



    var componentInfo = [
      {
        name: 'Tabs Props',
        infoArray: [
          {
            name: 'initialSelectedIndex',
            type: 'number',
            header: 'optional',
            desc: 'Specify initial visible tab index. Initial selected index is set by default to 0. If initialSelectedIndex is set but larger than the total amount of specified tabs, initialSelectedIndex will revert back to default'
          },
          {
            name: 'tabWidth',
            type: 'number',
            header: 'optional',
            desc: 'Specifiy tabWidth to set each tab to a set number of pixels. Tab Width is set by default to an even distribution of the parent Tabs container. If tabWidth is set but the total width of all tabs is greater than the container, tabWidth will revert back to default'
          }
        ]
      },
      {
        name: 'Tabs Events',
        infoArray: [
          {
            name: 'onChange',
            type: 'function(tabIndex, tab)',
            header: 'optional',
            desc: 'Fired on touch or tap of a tab.'
          }
        ]
      },
      {
        name: 'Tab Props',
        infoArray: [
          {
            name: 'label',
            type: 'string',
            header: 'optional',
            desc: 'Sets the text value of the tab item to the string specified.'
          },
          {
            name: 'route',
            type: 'string',
            header: 'optional',
            desc: 'Specifies a router RouteName if included.'
          }
        ]
      },
      {
        name: 'Tab Events',
        infoArray: [
          {
            name: 'onActive',
            type: 'function(tab)',
            header: 'optional',
            desc: 'Fired when the active tab changes by touch or tap. Use this event to specify any functionality when an active tab changes. For example - we are using this to route to home when the third tab becomes active. This function will always recieve the active tab as it\'s first argument.'
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Tabs"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

        <div className='tabs-examples'>
          <Tabs onChange={this._onChange}>
            <Tab label='Item One' >
              <div className='tab-template-container'>
                <h2 className='mui-font-style-headline'>Tab One Template Example</h2>
                <p>
                  This is an example of a tab template!
                </p>
                <p>
                  You can put any sort of HTML or react component in here.
                </p>
              </div>
            </Tab>
            <Tab label='Item Two' >
              <div className='tab-template-container'>
                <h2 className='mui-font-style-headline'>Tab Two Template Example</h2>
                <p>
                  This is another example of a tab template!
                </p>
                <p>
                  Fair warning - the next tab routes to home!
                </p>
              </div>
            </Tab>
            <Tab
              label='Item Three'
              route='home'
              onActive={this._onActive} />
          </Tabs>
        </div>

      </ComponentDoc>
    );
  },

  _onActive: function(tab){
    this.context.router.transitionTo(tab.props.route);
  }
});

module.exports = TabsPage;
