let React = require('react');
let { Paper, Styles } = require('material-ui');
let CodeBlock = require('../../code-example/code-block');

let { Spacing, Typography } = Styles;


class Prerequisites extends React.Component {

  getStyles() {
    return {
      headline: {
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack
      },
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack
      },
      codeExample: {
        backgroundColor: this.context.muiTheme.palette.canvasColor,
        marginBottom: '32px'
      },
      inlineCode: {
        backgroundColor: '#F8F8F8'
      }
    };
  }

  render() {

    let nodeModule1Code =
      '// module1.js\n\n' +
      'let importantFunctionInModule1 = function () {...};\n\n' +
      'let anotherImportantFunctionInModule1 = function () {...};\n\n' +
      'let notSoImportantFunctionInModule1 = function () {...};\n\n' +
      '// can have as many functions / objects / variables here\n' +
      '// ...\n\n' +
      '// whatever we choose to export out of this module is what\n' +
      '// other modules can see when they use(\'require\') this module.\n' +
      '// this is similar to public vs private / protected members in OOP.\n\n' +
      'module.exports.function1 = importantFunctionInModule1;\n' +
      'module.exports.function2 = anotherImportantFunctionInModule1;\n\n' +
      '// if we wrapped all of module1 into a single object, we could also just export\n' +
      '// that whole object like so:\n' +
      '//\n' +
      '// let module1 = {\n\n' +
      '//  importantFunctionInModule1: function () {...},\n\n' +
      '//  anotherImportantFunctionInModule1: function () {...},\n\n' +
      '//  let notSoImportantFunctionInModule1: function () {...},\n\n' +
      '// };\n\n' +
      '// module.exports = module1;\n';

    let nodeModule2Code = 
      '// module2.js\n\n' +
      '// we are getting a reference to another module to use\n' +
      '// the functions / objects / variables exported by that module.\n' +
      '// this can be a custom-created module (as in this example),\n' +
      '// or a package installed through npm.\n' +
      'let referenceToModule1 = require(\'./module1.js\');\n\n' +
      'let dummyVar = 5;\n\n' +
      '// this is OK\n' +
      'referenceToModule1.importantFunctionInModule1(dummyVar);\n\n' +
      '// so is this\n' +
      'referenceToModule1.anotherImportantFunctionInModule1(dummyVar);\n\n' +
      '// but NOT this (we cannot use objects from module1 that have not been exported)\n' +
      'referenceToModule1.notSoImportantFunctionInModule1(dummyVar);\n\n' +
      '//module2 is exporting dummyVar. This means that wherever module2 is \"required\",\n' +
      '//it will act as dummyVar\n' +
      'module.exports = dummyVar;\n';

    let styles = this.getStyles();

    return (
      <div>

          <h2 style={styles.headline}>Prerequisites</h2>
          <p>
            We strongly recommend that you start with the <a href="http://facebook.github.io/react/">React Library</a> before diving into
            material-ui for a better understanding.
          </p>

          <p>
            If you found yourself here, you are probably familiar with the whole concept of single page applications (SPAs), and NodeJS. 
            If that is the case, click <a href="#/get-started/installation">here</a> to continue to the Installation part.
          </p>

          <p>
            Otherwise, what follows is a quick and brief introduction to SPAs and NodeJS. You will find this helpful, 
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
            feel as fluid and responsive as, say, native desktop apps. This is why single page applications came into being.
          </p>

          <p>
            A single page application (SPA), as the name suggests, is a &quot;website&quot; that essentially consists of a single page. 
            That is, the whole website lives in a single file (usually a JavaScript file) that is sent from the server to the client once. 
            Thereafter, client-server interaction is minimal, usually just to upload or download information. Most of the logic to handle 
            client interactions lives in that single file. Hence, everything that is necessary to provide a fluid, responsive, and fast web 
            experience is present on-client in the browser’s memory. Needless to say, this style of web programming has gained tremendous 
            traction in the last decade, with many popular JavaScript presentation frameworks geared towards SPAs 
            (<a href="https://angularjs.org">AngularJS</a>, <a href="http://backbonejs.org">BackboneJS</a>, <a href="http://facebook.github.io/react/">ReactJS</a>, etc.).
          </p>

          <p>
            Naturally, the fact that all the code for a website lives in a single file means that that one file is potentially huge and complex. 
            This presents significant code organization and (re)factoring challenges. Thankfully, there exist frameworks that allow us to break down 
            our web development into small modules (similar to breaking down an object-oriented application into different classes and interfaces) 
            that can be bundled together later. NodeJS is one such particularly important framework.
          </p>

          <h3 style={styles.title}>Node</h3>

          <p>
            At its core, <a href="https://nodejs.org">Node</a> is a program written in C that allows us to run JavaScript in the shell (yes, your terminal, not the browser). To do this,
            It uses Chrome’s V8 JavaScript engine. Hence, Node is essentially a runtime environment.
          </p>

          <p>
            When it was first created, Node was primarily targeted towards developing web servers in JavaScript. This was somewhat radical since JavaScript has traditionally been 
            restricted to the client. However, over time, web developers recognized the general benefits provided by Node such as modules and exports, and that they could be 
            equally applied to the client-side as well. As a result, module-style development of web apps became very popular, and JavaScript frameworks 
            emerged that provided for bundling of these modules to create the Single Page Application. Examples of such frameworks include <a href="http://browserify.org">Browserify</a>
            , <a href="http://webpack.github.io">Webpack</a>, etc.
          </p>

          <p>
            As Node became popular, independent developers and organizations wrote scripts (that ran using Node) to do almost everything web apps-related. Of course, the whole community 
            could benefit from these “custom Node scripts.” This called for some kind of package repository where anybody could upload their Node scripts, and other developers 
            could use these scripts in their own projects. Node Package Manager, better known as “npm,” does exactly that. npm is a command line tool that, among other 
            things, can be used to incorporate external JavaScript into one&#39;s own project. Material-UI, for instance, is available as a package through npm. What this means is that to 
            use material-ui in your project, simply run <code style={styles.inlineCode}>npm install material-ui</code> from your project’s directory, and then start including the components of material-ui that you need.
          </p>

          <p>
            Here is a small example that demonstrates modules and exports using Node. If you feel like you need more of Node, we recommend that you consult some quick tutorials online before 
            jumping into material-ui. This <a href="http://openmymind.net/2012/2/3/Node-Require-and-Exports/">blog post</a> and <a href="https://www.youtube.com/watch?v=pU9Q6oiQNd0">video</a> are good starting points.
          </p>

          <Paper style={styles.codeExample}>
            <CodeBlock>{nodeModule1Code}</CodeBlock>
          </Paper>

          <Paper style={styles.codeExample}>
            <CodeBlock>{nodeModule2Code}</CodeBlock>
          </Paper>

      </div>
    );
  }

}

Prerequisites.contextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Prerequisites;
