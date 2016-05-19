import React, {Component, PropTypes} from 'react';
import Title from 'react-title-component';
import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Tabs, Tab} from 'material-ui';

class Master extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object,
  };

  state = {};

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme(),
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  }
  
  onActive(tab) {
    window.location.hash = tab.props.route;
  }
  
  render() {    
    return (
      <div>
        <Title render="Sitecore-UI" />
        <Tabs>
          <Tab label="Overview" route="/overview" onActive={this.onActive} />
          <Tab label="Channels" route="/channels" onActive={this.onActive} />
          <Tab label="Landing pages" route="/landingpages" onActive={this.onActive} />
          <Tab label="Ref Urls" route="/refurls" onActive={this.onActive} />
          <Tab label="Search" route="/search" onActive={this.onActive} />
          <Tab label="Outcomes" route="/outcomes" onActive={this.onActive} />
          <Tab label="Campaigns" route="/campaigns" onActive={this.onActive} />
        </Tabs>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Master;
