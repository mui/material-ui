// @flow weak

import React from 'react';
import {
  applyRouterMiddleware,
  browserHistory,
  Router,
  Route,
  IndexRoute,
  IndexRedirect,
} from 'react-router';
import { useScroll } from 'react-router-scroll';
import { kebabCase, titleize } from 'docs/src/utils/helpers';
import AppFrame from 'docs/src/components/AppFrame';
import AppContent from 'docs/src/components/AppContent';
import MarkdownDocs from 'docs/src/components/MarkdownDocs';
import Home from 'docs/src/pages/Home';
import { componentAPIs, requireMarkdown, demos, requireDemo } from 'docs/src/components/files';

export default function AppRouter() {
  return (
    <Router
      history={browserHistory}
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
            content={requireMarkdown('./getting-started/installation.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Usage"
            path="/getting-started/usage"
            content={requireMarkdown('./getting-started/usage.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Server Rendering"
            path="/getting-started/server-rendering"
            content={requireMarkdown('./getting-started/server-rendering.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Examples"
            path="/getting-started/examples"
            content={requireMarkdown('./getting-started/examples.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Supported Components"
            path="/getting-started/supported-components"
            content={requireMarkdown('./getting-started/supported-components.md')}
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
            content={requireMarkdown('./customization/themes.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Composition"
            path="/customization/composition"
            content={requireMarkdown('./customization/composition.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="API"
            path="/customization/api"
            content={requireMarkdown('./customization/api.md')}
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
            title="Color"
            path="/style/color"
            content={requireMarkdown('./style/color.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Icons"
            path="/style/icons"
            content={requireMarkdown('./style/icons.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Typography"
            path="/style/typography"
            content={requireMarkdown('./style/typography.md')}
            component={MarkdownDocs}
            nav
          />
        </Route>
        <Route
          title="Layout"
          path="/layout"
          nav
          component={AppContent}
        >
          <Route
            title="Responsive UI"
            path="/layout/responsive-ui"
            content={requireMarkdown('./layout/responsive-ui.md')}
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
          {demos.map(((demo) => {
            return (
              <Route
                key={demo.name}
                title={titleize(demo.name)}
                path={`/component-demos/${demo.name}`}
                content={requireDemo(demo.path)}
                component={MarkdownDocs}
                demo={demo}
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
          {componentAPIs.map(((componentAPI) => {
            return (
              <Route
                key={componentAPI.name}
                title={componentAPI.name}
                path={`/component-api/${kebabCase(componentAPI.name)}`}
                content={requireMarkdown(componentAPI.path)}
                component={MarkdownDocs}
                componentAPI={componentAPI}
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
            content={requireMarkdown('./discover-more/community.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Showcase"
            path="/discover-more/showcase"
            content={requireMarkdown('./discover-more/showcase.md')}
            component={MarkdownDocs}
            nav
          />
          <Route
            title="Related Projects"
            path="/discover-more/related-projects"
            content={requireMarkdown('./discover-more/related-projects.md')}
            component={MarkdownDocs}
            nav
          />
        </Route>
      </Route>
    </Router>
  );
}
