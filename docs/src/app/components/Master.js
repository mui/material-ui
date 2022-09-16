import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Title from 'react-title-component';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {darkWhite, lightWhite, grey900} from 'material-ui/styles/colors';
import AppNavDrawer from './AppNavDrawer';
import FullWidthSection from './FullWidthSection';
import Carbon from './Carbon';
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';

class Master extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    width: PropTypes.number.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object,
  };

  state = {
    navDrawerOpen: false,
  };

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

  componentDidMount() {
    window.gtag('config', 'UA-106598593-1', {
      page_path: location.hash.slice(1),
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });

    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.gtag('config', 'UA-106598593-1', {
        page_path: location.hash.slice(1),
      });
    }
  }

  getStyles() {
    const styles = {
      v1: {
        height: 40,
        backgroundColor: '#2196f3',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
      },
      v1Link: {
        color: '#fff',
        textDecoration: 'underline',
      },
      v1Spacer: {
        height: 40,
      },
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 40,
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      content: {
        margin: spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      footer: {
        backgroundColor: grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356,
      },
      browserstack: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: '25px 15px 0',
        padding: 0,
        color: lightWhite,
        lineHeight: '25px',
        fontSize: 12,
      },
      browserstackLogo: {
        margin: '0 3px',
      },
      iconButton: {
        color: darkWhite,
      },
    };

    if (this.props.width === MEDIUM || this.props.width === LARGE) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }

    return styles;
  }

  handleClickLeftIconButton = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  };

  handleChangeRequestNavDrawer = (open) => {
    this.setState({
      navDrawerOpen: open,
    });
  };

  handleChangeList = (event, value) => {
    if (value) {
      this.context.router.push(value);
      this.setState({
        navDrawerOpen: false,
      });
    }
  };

  handleChangeMuiTheme = (muiTheme) => {
    this.setState({
      muiTheme: muiTheme,
    });
  };

  render() {
    const {
      location,
      children,
    } = this.props;

    let {
      navDrawerOpen,
    } = this.state;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const router = this.context.router;
    const styles = this.getStyles();
    const title =
      router.isActive('/get-started') ? 'Get Started' :
      router.isActive('/customization') ? 'Customization' :
      router.isActive('/components') ? 'Components' :
      router.isActive('/discover-more') ? 'Discover More' : '';

    let docked = false;
    let showMenuIconButton = true;

    if (this.props.width === LARGE && title !== '') {
      docked = true;
      navDrawerOpen = true;
      showMenuIconButton = false;

      styles.navDrawer = {
        zIndex: styles.appBar.zIndex - 1,
      };
      styles.root.paddingLeft = 256;
      styles.footer.paddingLeft = 256;
    }

    return (
      <div>
        <Title render="Material UI" />
        <div style={prepareStyles(styles.v1)}>
          Aww yeah, &nbsp;
          <a style={prepareStyles(styles.v1Link)} href="https://mui.com/material-ui/">
            <span>
              Material UI v1
            </span>
          </a>
          &nbsp; is here! We recommend it for new projects.
        </div>
        <AppBar
          onLeftIconButtonClick={this.handleClickLeftIconButton}
          title={title}
          zDepth={0}
          iconElementRight={
            <IconButton
              iconClassName="muidocs-icon-custom-github"
              href="https://github.com/callemall/material-ui"
            />
          }
          style={styles.appBar}
          showMenuIconButton={showMenuIconButton}
        />
        {title !== '' ?
          <div style={prepareStyles(styles.root)}>
            <div style={prepareStyles(styles.content)}>
              <Carbon key={location.pathname} />
              {React.cloneElement(children, {
                onChangeMuiTheme: this.handleChangeMuiTheme,
              })}
            </div>
          </div> :
          children
        }
        <AppNavDrawer
          style={styles.navDrawer}
          location={location}
          docked={docked}
          onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
          onChangeList={this.handleChangeList}
          open={navDrawerOpen}
        />
        <FullWidthSection style={styles.footer}>
          <p style={prepareStyles(styles.p)}>
            {'Hand crafted with love by the engineers at '}
            <a style={styles.a} href="http://www.call-em-all.com/Careers">
              Call-Em-All
            </a>
            {' and our awesome '}
            <a
              style={prepareStyles(styles.a)}
              href="https://github.com/mui/material-ui/graphs/contributors"
            >
              contributors
            </a>.
          </p>
          <IconButton
            iconStyle={styles.iconButton}
            iconClassName="muidocs-icon-custom-github"
            href="https://github.com/mui/material-ui"
          />
          <p style={prepareStyles(styles.browserstack)}>
            {'Thank you to '}
            <a href="https://www.browserstack.com" style={prepareStyles(styles.browserstackLogo)} target="_blank">
              <img src="http://www.browserstack.com/images/layout/logo.png" height="25" width="auto" />
            </a>
            {' for providing real browser testing infrastructure.'}
          </p>
        </FullWidthSection>
      </div>
    );
  }
}

export default withWidth()(Master);
