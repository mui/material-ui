// @flow weak

import { hashHistory, Router, Route, IndexRoute, IndexRedirect } from 'react-router';
import React from 'react';
import AppFrame from './AppFrame';
import AppContent from './AppContent';
import Home from '../pages/Home';
import MarkdownDocs from './MarkdownDocs';
import { kebabCase, titleize } from '../utils/helpers';

/**
 * This lets us eager load the files ahead of time
 * and require them dynamically with webpack's context feature
 */
const requireDocs = require.context(
  './../../../../docs',
  true,
  /^((?![\\/]site|node_modules[\\/]).)*\.md$/,
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
const demoFiles = requireDemos.keys();
const demos = demoFiles.reduce((res, n) => {
  res.push({
    path: n,
    name: n.replace(/.*\//, '').replace('.md', ''),
  });
  return res;
}, []);

export default function AppRouter(props) {
  return (
    <Router history={hashHistory} {...props}>
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
            title="Required Knowledge"
            path="/getting-started/required-knowledge"
            content={requireDocs('./getting-started/required-knowledge.md')}
            component={MarkdownDocs}
            nav
          />
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
