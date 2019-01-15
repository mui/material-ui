/* eslint-disable react/no-danger */

const React = require('react');
const { renderToString } = require('react-dom/server');
const JssProvider = require('react-jss/lib/JssProvider').default;
const getPageContext = require('./src/getPageContext').default;

function replaceRenderer({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) {
  // Get the context of the page to collected side effects.
  const muiPageContext = getPageContext();

  const bodyHTML = renderToString(
    <JssProvider registry={muiPageContext.sheetsRegistry}>{bodyComponent}</JssProvider>,
  );

  replaceBodyHTMLString(bodyHTML);
  setHeadComponents([
    <style
      type="text/css"
      id="jss-server-side"
      key="jss-server-side"
      dangerouslySetInnerHTML={{ __html: muiPageContext.sheetsRegistry.toString() }}
    />,
  ]);
}

exports.replaceRenderer = replaceRenderer;

// It's not ready yet: https://github.com/gatsbyjs/gatsby/issues/8237.
//
// const withRoot = require('./src/withRoot').default;
// const WithRoot = withRoot(props => props.children);

// exports.wrapRootElement = ({ element }) => {
//   return <WithRoot>{element}</WithRoot>;
// };
