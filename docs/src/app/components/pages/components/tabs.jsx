const React = require('react');
const CodeExample = require('../../code-example/code-example');
const {IconButton, Slider, Styles, Tab, Tabs, Paper } = require('material-ui');
const ComponentDoc = require('../../component-doc');
const { Colors, Typography } = Styles;
const Code = require('tabs-code');
const SwipeableViews = require('react-swipeable-views');
const CodeBlock = require('../../code-example/code-block');

export default class TabsPage extends React.Component {

  constructor(props) {
    super(props);
    this._handleTabActive = this._handleTabActive.bind(this);
    this.state = {
      tabsValue: 'a',
      slideIndex: 0,
    };
  }

  render(){
    let desc = 'Tabs can now operate in two different modes: controlled and uncontrolled. ' +
      'The uncontrolled mode takes over automatically if no value prop is passed to your' +
      'Tabs and Tab components. If you want controllable tabs, passing a value to both the' +
      ' Tabs and Tab elements will let you programmatically adjust which one is selected. ' +
      'ValueLink is now supported by Tabs.';

    let componentInfo = [
      {
        name: 'Tabs Props',
        infoArray: [
          {
            name: 'contentContainerStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the content\'s container.',
          },
          {
            name: 'initialSelectedIndex',
            type: 'number',
            header: 'optional',
            desc: 'Specify initial visible tab index. Initial selected index is set by default to 0. If initialSelectedIndex is set but larger than the total amount of specified tabs, initialSelectedIndex will revert back to default',
          },
          {
            name: 'inkBarStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the InkBar.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the Tabs\' root element.',
          },
          {
            name: 'tabItemContainerStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the tab-labels container.',
          },
          {
            name: 'tabTemplate',
            type: 'ReactClass',
            header: 'optional',
            desc: 'Override the default tab template used to wrap the content of each tab element.',
          },
          {
            name: 'value',
            type: 'string or number',
            header: 'optional',
            desc: 'Makes Tabs controllable and selects the tab whose value prop matches this prop.',
          },
        ],
      },
      {
        name: 'Tabs Events',
        infoArray: [
          {
            name: 'onChange',
            type: 'function(value, e, tab)',
            header: 'optional',
            desc: 'Fired on touch or tap of a tab. Passes the value of the tab, the touchTap event and the tab element.',
          },
        ],
      },
      {
        name: 'Tab Props',
        infoArray: [
          {
            name: 'label',
            type: 'string',
            header: 'optional',
            desc: 'Sets the text value of the tab item to the string specified.',
          },
          {
            name: 'value',
            type: 'string',
            header: 'optional',
            desc: 'If value prop passed to Tabs component, this value prop is also required. It assigns a value ' +
              'to the tab so that it can be selected by the Tabs.',
          },
        ],
      },
      {
        name: 'Tab Events',
        infoArray: [
          {
            name: 'onActive',
            type: 'function(tab)',
            header: 'optional',
            desc: 'Fired when the active tab changes by touch or tap. Use this event to specify any functionality when an active tab changes. For example - we are using this to route to home when the third tab becomes active. This function will always recieve the active tab as it\'s first argument.',
          },
        ],
      },
    ];

    let padding = 400;

    let styles = {
      contentContainerStyle: {
        marginLeft: -padding,
      },
      div: {
        position: 'absolute',
        left: 48,
        backgroundColor: Colors.cyan500,
        width: padding,
        height: 48,
      },
      headline: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
        letterSpacing: 0,
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack,
      },
      iconButton: {
        position: 'absolute',
        left: 0,
        backgroundColor: Colors.cyan500,
        color: 'white',
        marginRight: padding,
      },
      iconStyle: {
        color: Colors.white,
      },
      tabs: {
        position: 'relative',
      },
      tabsContainer: {
        position: 'relative',
        paddingLeft: padding,
      },
      slide: {
        padding: 10,
      },
    };

    return (
      <ComponentDoc
        name="Tabs"
        desc={desc}
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nconst Tabs = require(\'material-ui/lib/tabs/tabs\');\n' +
            'const Tab = require(\'material-ui/lib/tabs/tab\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <Tabs>
            <Tab label="Item One" >
              <div>
                <h2 style={styles.headline}>Tab One Template Example</h2>
                <p>
                  This is an example of a tab template!
                </p>
                <p>
                  You can put any sort of HTML or react component in here. It even keeps the component state!
                </p>
                <Slider name="slider0" defaultValue={0.5} />
              </div>
            </Tab>
            <Tab label="Item Two" >
              <div>
                <h2 style={styles.headline}>Tab Two Template Example</h2>
                <p>
                  This is another example of a tab template!
                </p>
                <p>
                  Fair warning - the next tab routes to home!
                </p>
              </div>
            </Tab>
            <Tab
              label="Home (non-content example)"
              route="/home"
              onActive={this._handleTabActive} />
          </Tabs>

          <div style={styles.tabsContainer}>
            <IconButton
              onClick={this._handleButtonClick.bind(this)}
              iconClassName="material-icons"
              style={styles.iconButton}
              iconStyle={styles.iconStyle}>
              home
            </IconButton>
            <div style={styles.div}/>
              <Tabs
                valueLink={{value: this.state.tabsValue, requestChange: this._handleTabsChange.bind(this)}}
                style={styles.tabs}
                contentContainerStyle={styles.contentContainerStyle}>
                <Tab label="Tab A" value="a" >
                  <div>
                    <h2 style={styles.headline}>Controllable Tab Examples</h2>
                    <p>
                      Tabs are also controllable if you want to programmatically pass them their values.
                      This allows for more functionality in Tabs such as not
                      having any Tab selected or assigning them different values.
                    </p>
                    <p>(The home Icon Button will unselect all the tabs and hide their content.)</p>
                  </div>
                </Tab>
                <Tab label="Tab B" value="b">
                  <div>
                    <h2 style={styles.headline}>Controllable Tab B</h2>
                    <p>
                      This is another example of a controllable tab. Remember, if you
                      use controllable Tabs, you need to give all of your tabs values or else
                      you wont be able to select them.
                    </p>
                    <p>
                      To see one use for controlled Tabs, press the home button on the right.
                    </p>
                  </div>
                </Tab>
              </Tabs>
          </div>
          <br />
          <Tabs onChange={this._handleChangeTabs.bind(this)} value={this.state.slideIndex + ''}>
            <Tab label="Tab One" value="0" />
            <Tab label="Tab Two" value="1" />
            <Tab label="Tab Three" value="2" />
          </Tabs>
          <SwipeableViews index={this.state.slideIndex} onChangeIndex={this._handleChangeIndex.bind(this)}>
            <div>
              <h2 style={styles.headline}>Tabs with slide effect</h2>
              Swipe to see the next slide.<br />
            </div>
            <div style={styles.slide}>
              slide n°2
            </div>
            <div style={styles.slide}>
              slide n°3
            </div>
          </SwipeableViews>
        </CodeExample>
      </ComponentDoc>
    );
  }

  _handleChangeIndex(index) {
    this.setState({
      slideIndex: index,
    });
  }

  _handleChangeTabs(value) {
    this.setState({
      slideIndex: parseInt(value, 10),
    });
  }

  _handleButtonClick() {
    this.setState({tabsValue: 'c'});
  }

  _handleTabActive(tab){
    this.props.history.pushState(null, tab.props.route);
  }

  _handleTabsChange(value, e, tab){
    this.setState({tabsValue: value});
  }
}
