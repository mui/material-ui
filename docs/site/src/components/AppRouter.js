import {hashHistory, Router, Route, IndexRoute, IndexRedirect} from 'react-router';
import React, {Component} from 'react';
import AppFrame from './AppFrame';
import AppContent from './AppContent';
import Home from '../pages/Home';
import MarkdownDocs from './MarkdownDocs';

const requireDocs = require.context(
  './../../../../docs',
  true,
  /^((?![\\/]site|node_modules[\\/]).)*\.md$/
);

export default class AppRouter extends Component {
  render() {
    return (
      <Router history={hashHistory} {...this.props}>
        <Route title="Material UI" path="/" component={AppFrame}>
          <IndexRoute component={Home} title={null} />

          <Route
            title="Getting Started"
            path="/getting-started"
            nav={true}
            component={AppContent}
          >
            <IndexRedirect to="prerequisites" />
            <Route
              title="Prerequisites"
              path="/getting-started/prerequisites"
              content={requireDocs('./getting-started/prerequisites.md')}
              component={MarkdownDocs}
              nav={true}
            />
            <Route
              title="Installation"
              path="/getting-started/installation"
              content={requireDocs('./getting-started/installation.md')}
              component={MarkdownDocs}
              nav={true}
            />
            <Route
              title="Usage"
              path="/getting-started/usage"
              content={requireDocs('./getting-started/usage.md')}
              component={MarkdownDocs}
              nav={true}
            />
            <Route
              title="Server Rendering"
              path="/getting-started/server-rendering"
              content={requireDocs('./getting-started/server-rendering.md')}
              component={MarkdownDocs}
              nav={true}
            />
            <Route
              title="Examples"
              path="/getting-started/examples"
              content={requireDocs('./getting-started/examples.md')}
              component={MarkdownDocs}
              nav={true}
            />
          </Route>

          <Route
            title="Customization"
            path="/customization"
            nav={true}
            component={AppContent}
          >
            <IndexRedirect to="themes" />
            <Route
              title="Themes"
              path="/customization/themes"
              content={requireDocs('./customization/themes.md')}
              component={MarkdownDocs}
              nav={true}
            />
          </Route>

          <Route
            title="Discover More"
            path="/discover-more"
            nav={true}
            component={AppContent}
          >
            <IndexRedirect to="community" />
            <Route
              title="Community"
              path="/discover-more/community"
              content={requireDocs('./discover-more/community.md')}
              component={MarkdownDocs}
              nav={true}
            />
            <Route
              title="Showcase"
              path="/discover-more/showcase"
              content={requireDocs('./discover-more/showcase.md')}
              component={MarkdownDocs}
              nav={true}
            />
            <Route
              title="Related Projects"
              path="/discover-more/related-projects"
              content={requireDocs('./discover-more/related-projects.md')}
              component={MarkdownDocs}
              nav={true}
            />
          </Route>
        </Route>
      </Router>
    );
  }
}
