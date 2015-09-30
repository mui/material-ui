const React = require('react');
const { Paper, Styles } = require('material-ui');
const CodeBlock = require('../../code-example/code-block');

const { Spacing, Typography } = Styles;
const ThemeManager = Styles.ThemeManager;
const DefaultRawTheme = Styles.LightRawTheme;

const Prerequisites = React.createClass({

  contextTypes : {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getStyles() {
    return {
      headline: {
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack,
      },
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack,
      },
      codeExample: {
        backgroundColor: this.state.muiTheme.rawTheme.palette.canvasColor,
        marginBottom: '32px',
      },
      inlineCode: {
        backgroundColor: '#F8F8F8',
      },
    };
  },

  render() {

    let styles = this.getStyles();

    return (
      <div>

          <h2 style={styles.headline}>Prerequisites</h2>
          <p>
            We recommend that you get to know <a href="http://facebook.github.io/react/">React</a> before diving into
            material-ui. Material-UI is a set of React components, so understanding how React fits into web development
            is important.
          </p>

          <p>
            If you&#39;re already familiar with single page applications (SPAs) and Node, feel free to skip the prerequisites
            and head straight to the <a href="#/get-started/installation">installation and usage</a> part.
          </p>

          <p>
            Otherwise, what follows is a quick and brief introduction to SPAs and Node. You&#39;ll find this helpful,
            especially if you have limited prior experience with web development, or if your experience only consists
            of &quot;traditional&quot; websites built using HTML, CSS and some JavaScript.
          </p>

          <h3 style={styles.title}>Single Page Applications (SPAs)</h3>
          <p>
            A long(?) time ago, websites were built using static pages in HTML, with CSS used for styling, and JavaScript
            used to support user interactions or for animations. Most client interactions, especially those that acted on data, involved
            complete server round-trips: data from the client was sent to the server where it was processed, and then the result
            was sent back to the client. Moreover, most of this communication was &quot;blocking.&quot; That is, during these round-trips,
            the client was busy and could not be interacted with.
          </p>

          <p>
            With the advent of asynchronous server calls (AJAX), the client could now do other things while it sent data to the
            server and awaited a response. However, most client interactions still needed server round-trips, and websites just didn’t
            feel as fluid and responsive as, say, native desktop apps. That&#39;s why SPAs came into being.
          </p>

          <p>
            An SPA is a &quot;website&quot; that essentially consists of a single page.
            That is, the whole website lives in a single file (usually a JavaScript file) that is sent from the server to the client once.
            Most of the logic to handle
            client interactions lives in that single file. Hence, everything that&#39;s necessary to provide a fluid, responsive, and fast web
            experience is present in the browser’s memory. This web programming architecture has gained tremendous
            traction in the last decade, with many popular JavaScript presentation frameworks geared towards SPAs
            (<a href="https://angularjs.org">Angular</a>, <a href="http://emberjs.com/">Ember</a>
            , <a href="http://backbonejs.org">Backbone</a>, <a href="http://facebook.github.io/react/">React</a>, etc.).
          </p>

          <p>
            Including all of the code for a website in a single file creates significant code organization challenges. Thankfully, there
            are several tools that allow us to break up
            our code into smaller modules (similar to breaking down an object-oriented application into different classes and interfaces)
            that can be bundled together later. This is where Node comes into play.
          </p>

          <h3 style={styles.title}>Node</h3>

          <p>
            At its core, <a href="https://nodejs.org">Node</a> is a program written in C that allows us to run JavaScript in the shell (yes, your terminal, not the browser). To do this,
            It uses Chrome’s V8 JavaScript engine. Hence, Node is essentially a runtime environment.
          </p>

          <p>
            When it was first created, Node was primarily targeted towards developing web servers in JavaScript. This was somewhat radical since JavaScript has traditionally been
            restricted to the client. However, over time, web developers recognized the benefits of using Node for tooling and dependency management, and created projects
            like <a href="http://gruntjs.com/">grunt</a>, <a href="http://gulpjs.com/">gulp</a>, <a href="http://browserify.org">Browserify</a>, and <a href="http://webpack.github.io">Webpack</a>.
          </p>

          <p>
            As Node became popular, independent developers and organizations wrote scripts (that ran using Node) to do almost everything web apps-related. Of course, the whole community
            could benefit from these “custom Node scripts.” This called for some kind of package repository where anybody could upload their Node scripts, and other developers
            could use these scripts in their own projects. <a href="https://www.npmjs.com/">Node Package Manager</a>, better known as “npm,” does exactly that. NPM is a command line tool that, among other
            things, can be used to incorporate external JavaScript into one&#39;s own project. Material-UI, for instance, is available as a package through npm. This means that you can
            include material-ui in your project by simply running <code style={styles.inlineCode}>npm install material-ui</code> from your project’s directory, and then using the components of material-ui that you need.
          </p>

          <p>
            That&#39;s it for a quick introduction! If you feel like you need more of Node, we recommend that you consult some quick tutorials online before
            jumping into material-ui. This <a href="http://openmymind.net/2012/2/3/Node-Require-and-Exports/">blog post</a> and <a href="https://www.youtube.com/watch?v=pU9Q6oiQNd0">video</a> are good starting points.
          </p>

      </div>
    );
  },

});

module.exports = Prerequisites;
