import React from 'react';
import {History} from 'react-router';
import {Mixins, RaisedButton, Styles} from 'material-ui';
import HomeFeature from './home-feature';
import FullWidthSection from '../full-width-section';

const {StylePropable, StyleResizable} = Mixins;
const {Colors, Typography} = Styles;

const HomePage = React.createClass({

  mixins: [
    StylePropable,
    StyleResizable,
    History,
  ],

  render() {
    return (
      <div>
        {this._getHomePurpose()}
        {this._getHomeFeatures()}
        {this._getHomeContribute()}
      </div>
    );
  },

  _getHomePurpose() {
    let styles = {
      root: {
        backgroundColor: Colors.grey200,
      },
      content: {
        maxWidth: 700,
        padding: 0,
        margin: '0 auto',
        fontWeight: Typography.fontWeightLight,
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
        color: Typography.textDarkBlack,
      },
    };

    return (
      <FullWidthSection
        style={styles.root}
        useContent={true}
        contentStyle={styles.content}
        contentType="p"
        className="home-purpose">
        Material-UI came about from our love of&nbsp;
        <a href="http://facebook.github.io/react/">React</a> and&nbsp;
        <a href="https://www.google.com/design/spec/material-design/introduction.html">
         Google's Material Design
        </a>. We're currently using it on a project at&nbsp;
        <a href="https://www.call-em-all.com/">Call-Em-All</a> and plan on adding to it
        and making it better in the coming months.
      </FullWidthSection>
    );
  },

  _getHomeFeatures() {
    let styles = {maxWidth: '906px'};
    return (
      <FullWidthSection useContent={true} contentStyle={styles}>
        <HomeFeature
          heading="Get Started"
          route="/get-started"
          img="images/get-started.svg"
          firstChild={true}/>
        <HomeFeature
          heading="Customization"
          route="/customization"
          img="images/css-framework.svg" />
        <HomeFeature
          heading="Components"
          route="/components"
          img="images/components.svg"
          lastChild={true}/>
      </FullWidthSection>
    );
  },

  _getHomeContribute() {
    let styles = {
      root: {
        backgroundColor: Colors.grey200,
        textAlign: 'center',
      },
      h3: {
        margin: 0,
        padding: 0,
        fontWeight: Typography.fontWeightLight,
        fontSize: 22,
      },
      button: {
        marginTop: 32,
      },
    };

    return (
      <FullWidthSection useContent={true} style={styles.root}>
        <h3 style={styles.h3}>
          Want to help make this <span style={styles.nowrap}>project awesome? </span>
          <span style={styles.nowrap}>Check out our repo.</span>
        </h3>
        <RaisedButton
          label="GitHub"
          primary={true}
          linkButton={true}
          href="https://github.com/callemall/material-ui"
          style={styles.button}/>
      </FullWidthSection>
    );
  },
});

export default HomePage;
