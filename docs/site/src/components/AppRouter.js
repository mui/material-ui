// @flow weak

import React from 'react';
import { applyRouterMiddleware, hashHistory, Router, Route, IndexRoute, IndexRedirect } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { kebabCase, titleize } from 'docs/site/src/utils/helpers';
import AppFrame from './AppFrame';
import AppContent from './AppContent';
import MarkdownDocs from './MarkdownDocs';
import Home from '../pages/Home';

/**
 * This lets us eager load the files ahead of time
 * and require them dynamically with webpack's context feature
 */
const requireDocs = require.context(
  './../../../../docs',
  true,
  /^((?![\\/]site\/src\/demos|node_modules[\\/]).)*\.md$/,
);
const docFiles = requireDocs.keys();
const apiDocs = docFiles.reduce((res, n) => {
  if (/^\.\/api\//.test(n)) {
    res.push({
      path: n,
      name: n.replace(/.*\//, '').replace('.md', ''),
    });
  }
  return res;
}, []);

const requireDemos = require.context('../demos', true, /\.md$/);
const demos = requireDemos
  .keys()
  .reduce((res, n) => {
    res.push({
      path: n,
      name: n.replace(/.*\//, '').replace('.md', ''),
    });
    return res;
  }, []);

export default function AppRouter() {
  return (
    <Router
      history={hashHistory}
      render={applyRouterMiddleware(useScroll())}
    >
      <Route title="Material UI" path="/" component={AppFrame}>
        <IndexRoute dockDrawer component={Home} title={null} />
        <Route
          title="Getting Started"
          path="/getting-started"
          nav
          component={AppContent}
        >
          <IndexRedirect to="installation" />
          <Route
            title="Installation"
            path="/getting-started/installation"
            content={requireDocs('./getting-started/installation.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Usage"
            path="/getting-started/usage"
            content={requireDocs('./getting-started/usage.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Server Rendering"
            path="/getting-started/server-rendering"
            content={requireDocs('./getting-started/server-rendering.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Examples"
            path="/getting-started/examples"
            content={requireDocs('./getting-started/examples.md')}
            component={MarkdownDocs}
            nav
          />
        </Route>
        <Route
          title="Customization"
          path="/customization"
          nav
          component={AppContent}
        >
          <IndexRedirect to="themes" />
          <Route
            title="Themes"
            path="/customization/themes"
            content={requireDocs('./customization/themes.md')}
            component={MarkdownDocs}
            nav
          />
        </Route>
        <Route
          title="Style"
          path="/style"
          nav
          component={AppContent}
        >
          <Route
            title="Typography"
            path="/style/typography"
            content={requireDocs('./site/src/pages/style/typography/typography.md')}
            component={MarkdownDocs}
            nav
          />
        </Route>
        <Route
          title="Component Demos"
          path="/component-demos"
          nav
          component={AppContent}
        >
          {demos.map(((n, i) => {
            return (
              <Route
                key={i}
                title={titleize(n.name)}
                path={`/component-demos/${n.name}`}
                content={requireDemos(n.path)}
                component={MarkdownDocs}
                nav
              />
            );
          }))}
        </Route>
        <Route
          title="Component API"
          path="/component-api"
          nav
          component={AppContent}
        >
          {apiDocs.map(((n, i) => {
            return (
              <Route
                key={i}
                title={n.name}
                path={`/component-api/${kebabCase(n.name)}`}
                content={requireDocs(n.path)}
                component={MarkdownDocs}
                nav
              />
            );
          }))}
        </Route>
        <Route
          title="Discover More"
          path="/discover-more"
          nav
          component={AppContent}
        >
          <IndexRedirect to="community" />
          <Route
            title="Community"
            path="/discover-more/community"
            content={requireDocs('./discover-more/community.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Showcase"
            path="/discover-more/showcase"
            content={requireDocs('./discover-more/showcase.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Related Projects"
            path="/discover-more/related-projects"
            content={requireDocs('./discover-more/related-projects.md')}
            component={MarkdownDocs}
            nav
          />
        </Route>
      </Route>
    </Router>
  );
}
