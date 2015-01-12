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
    var code = "<Tabs> \n" +
                 "  <Tab label={'Item One'} template={tabOneTemplate} \n" +
                 "  <Tab label={'Item Two'} template={tabTwoTemplate} \n" +
                 "  <Tab label={'Item Three'} route={'home'} onTabsChange={this._onTabsChange  } \n" +
               "</Tabs> \n" +
               "<Tabs tabWidth={130}> \n" +
                 "  <Tab label={'Item One'} template={tabOneTemplate} \n" +
                 "  <Tab label={'Item Two'} template={tabTwoTemplate} \n" +
                 "  <Tab label={'Item Three'} route={'home'} onTabsChange={this._onTabsChange  } \n" +
               "</Tabs>"

    var componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'tabWidth',
            type: 'number',
            header: 'optional',
            desc: 'Specifiy tabWidth to set each tab to a set number of pixels. Tab Width is set by default to an even distribution of the parent Tabs container. If tabWidth is set but the total width of all tabs is greater than the container, tabWidth will revert back to default'
          },
          {
            name: 'label',
            type: 'string',
            header: 'optional',
            desc: 'Sets the text value of the tab item to the string specified.'
          },
          {
            name: 'template',
            type: 'xml',
            header: 'optional',
            desc: 'If specified, the active tab will display it\'s associated template.'
          },
          {
            name: 'route',
            type: 'string',
            header: 'optional',
            desc: 'Specifies a router RouteName if included.'
          },
          {
            name: 'onTabsChange',
            type: 'function',
            header: 'optional',
            desc: 'Pass _onTabsChange down as props to have an event execute on change of active tab by click. For this example - we are routing the third tab to home using react router. Note: any function passed to onTabsChange will recieve the active tab back as it\'s first argument.'
          }
        ]
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: '_onTabsChange',
            type: 'function(tab)',
            header: 'optional',
            desc: 'Fired when the active tab changes by click and when passed down as props in onTabsChange. Use this event to specify any functionality when an active tab changes. For example - we are using this to route to home when the third tab becomes active. This function will always recieve the active tab back as it\'s first argument.'
          }
        ]
      }
    ];

    var tabOneTemplate = (
      <div className='tab-template-container'>
        <h2 className='mui-font-style-headline'>Tab One Template Example</h2>
        <p>
          This is an example of a tab template!
        </p>
        <p>
          You can put any sort of HTML or react component in here.
        </p>
      </div>
    );

    var tabTwoTemplate = (
      <div className='tab-template-container'>
        <h2 className='mui-font-style-headline'>Tab Two Template Example</h2>
        <p>
          This is another example of a tab template!
        </p>
        <p>
          Fair warning - the next tab routes to home!
        </p>
      </div>
    );

    return (
      <ComponentDoc
        name="Tabs"
        code={code}
        componentInfo={componentInfo}>

        <div className='tabs-examples'>
          <Tabs>
            <Tab
              label={'Item One'}
              template={tabOneTemplate} />
            <Tab
              label={'Item Two'}
              template={tabTwoTemplate} />
            <Tab
              label={'Item Three'}
              route={'home'}
              onTabsChange={this._onTabsChange} />
          </Tabs>
        </div>

      </ComponentDoc>
    );
  },

  _onTabsChange: function(tab){
    this.transitionTo(tab.props.route);
  }
});

module.exports = TabsPage;
