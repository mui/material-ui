let React = require('react');
let Router = require('react-router');
let AppLeftNav = require('./app-left-nav');
let FullWidthSection = require('./full-width-section');
let { AppBar,
    AppCanvas, 
    FontIcon, 
    IconButton, 
    Menu, 
    Mixins, 
    RaisedButton, 
    Styles, 
    Tab, 
    Tabs,
    Paper} = require('material-ui');

let RouteHandler = Router.RouteHandler;
let { Colors, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager();


class Master extends React.Component {

  constructor() {
    super();
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  }

  getStyles() {
    let darkWhite = Colors.darkWhite;
    return {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center'
      },
      a: {
        color: darkWhite
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: Colors.lightWhite,
        maxWidth: 335
      },
      github: {
        position: 'fixed',
        right: 0,
        top: 8,
        zIndex: 5,
        color: 'white'
      },
       iconButton: {
        color: darkWhite
      },
    };
  }

  componentWillMount(){
    let tabIndex =
      this.context.router.isActive('get-started') ? 1 :
      this.context.router.isActive('customization') ? 2 :
      this.context.router.isActive('components') ? 3 : 0;
    this.setState({tabIndex: tabIndex});

    let setTabsState = function() {
      if(document.body.clientWidth <= 647)
      this.setState({renderTabs: false});
     else
      this.setState({renderTabs: true});
    }.bind(this);
    setTabsState();
    window.onresize = setTabsState;
  }

  render() {
    let styles = this.getStyles();
    let title =
      this.context.router.isActive('get-started') ? 'Get Started' :
      this.context.router.isActive('customization') ? 'Customization' :
      this.context.router.isActive('components') ? 'Components' : '';

    let githubButton = (
      <IconButton
        iconStyle={styles.iconButton}
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true}
        style={styles.github} />
    );

    let githubButton2 = (
      <IconButton
        iconStyle={styles.iconButton}
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true}/>
    );

    return (
      <AppCanvas>

        {githubButton}
        {this.state.renderTabs ? this._getTabs(): this._getAppBar()}

        <RouteHandler />

        <AppLeftNav ref="leftNav" />
        <FullWidthSection style={styles.footer}>
          <p style={styles.p}>
            Hand crafted with love by the engineers at <a style={styles.a} href="http://call-em-all.com">Call-Em-All</a> and our
            awesome <a style={styles.a} href="https://github.com/callemall/material-ui/graphs/contributors">contributors</a>.
          </p>
          {githubButton2}
        </FullWidthSection>

      </AppCanvas>
    );
  }

 _getTabs() {
    let styles = {
      root: {
        backgroundColor: Colors.cyan500, 
        position: 'fixed', 
        height: 64,
        top: 0,
        right: 0,
        zIndex: 4,
        width: '100%',
      },
      container: {
        position: 'absolute',
        right: 48,
        bottom: 0,
      },
      inkBar: {
        backgroundColor: Colors.yellow200,
      },
      iconButton: {
        color: 'white'
      },
      fontIcon: {
        position: 'fixed',
        left: 0,
        top: 8,
        zIndex: 5,
        padding: 12,
      },
      tabs: {
        width: 425,
        bottom:0,
      },
      tab: {

      }

    };

    let logoButton = (
    <IconButton iconClassName='material-icons'
     style={styles.fontIcon}
     linkButton={true}
     href="/#/home"
     iconStyle={styles.iconButton} >home
    </IconButton>
    );

    return(
      <div>
        {logoButton}
        
        <Paper zDepth={0} rounded={false} style={styles.root}>
          <div style={styles.container}>
            <Tabs onChange={this._onTabChange.bind(this)}
                  style={styles.tabs}
                  initialSelectedIndex={this.state.tabIndex}
                  inkBarStyle={styles.inkBar}> 
              <Tab label="GETTING STARTED" style={styles.tab} />
              <Tab label="CUSTOMIZATION" style={styles.tab}/>
              <Tab label="COMPONENTS" style={styles.tab}/>
            </Tabs>
          </div>
        </Paper>
      </div>
    );
  }

 _onTabChange (tabIndex, tab){
      switch(tabIndex){
        case 0:  
          this.context.router.transitionTo('get-started');
          break;
        case 1:  
          this.context.router.transitionTo('customization');
          break;
        case 2:  
          this.context.router.transitionTo('components');
        }
        this.setState({tabIndex: tabIndex});
  }

  _getAppBar() {
    let title =
      this.context.router.isActive('get-started') ? 'Get Started' :
      this.context.router.isActive('customization') ? 'Customization' :
      this.context.router.isActive('components') ? 'Components' : '';

    let githubButton = (
      <IconButton
        iconClassName="muidocs-icon-custom-github"
        href="https://github.com/callemall/material-ui"
        linkButton={true}/>);

    return (
      <div>
          <AppBar 
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap.bind(this)}
          title={title}
          zDepth={0}
          iconElementRight={githubButton}
          style={{position: 'absolute', top: 0}}/>
      </div>)
  }

  _onLeftIconButtonTouchTap() {
    console.log(this);
    this.refs.leftNav.toggle();
  }

}



Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;

