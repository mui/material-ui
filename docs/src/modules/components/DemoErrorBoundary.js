import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

/**
 * Based on https://github.com/sindresorhus/new-github-issue-url/blob/061fa0ddb7d51f3b96d3a0f6a6bebb196f105a7b/index.js
 * with node 8 + IE11 support i.e. not using URL (URLSearchParams.set replaced with Map.set)
 */
function newGitHubIssueUrl(options) {
  const url = `https://github.com/${options.user}/${options.repo}/issues/new`;

  const query = Object.keys(options)
    .map((type) => {
      const value = options[type];
      return `${type}=${encodeURIComponent(String(value))}`;
    })
    .join('&');

  return `${url}?${query}`;
}

export default class DemoErrorBoundary extends React.Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { children, name, onResetDemoClick, t } = this.props;
    const { error } = this.state;

    if (error) {
      const title = `[docs] Demo ${name} crashes`;
      const searchQuery = encodeURIComponent(`is:issue ${title}`);
      const issueLink = newGitHubIssueUrl({
        user: 'mui',
        repo: 'material-ui',
        title,
        body: `
<!-- Please make sure you have fulfilled the following items before submitting -->
<!-- Checked checkbox should look like this: [x] -->
- [ ] I have [searched for similar issues](https://github.com/mui/material-ui/issues?q=${searchQuery}) in this repository and believe that this is not a duplicate.

## Steps to Reproduce
1. Visit ${window.location.href}
2. ??
3. demo *${name}* crashes

## Your Environment
| Tech         | Version |
|--------------|---------|
| MUI  | v${process.env.LIB_VERSION}  |
| Netlify deploy | ${process.env.NETLIFY_DEPLOY_URL} |
| Browser      | ${
          typeof window !== 'undefined' && window.navigator
            ? window.navigator.userAgent
            : '*Unknown*'
        } |
`,
      });

      /* eslint-disable material-ui/no-hardcoded-labels */
      return (
        <div>
          <Typography color="error" component="p" variant="h5" gutterBottom>
            This demo had a runtime error!
          </Typography>
          <Typography>
            We would appreciate it if you{' '}
            <Link href={issueLink} rel="noreferrer" target="_blank">
              report this error
            </Link>{' '}
            directly in our issue tracker. You will be provided with a prefilled description that
            includes valuable information about this error.
          </Typography>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{error.toString()}</pre>
          <Button color="secondary" onClick={onResetDemoClick} variant="text">
            {t('resetDemo')}
          </Button>
        </div>
      );
      /* eslint-enable material-ui/no-hardcoded-labels */
    }

    return children;
  }
}

DemoErrorBoundary.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  onResetDemoClick: PropTypes.func.isRequired,
  /**
   * translate function from redux store
   */
  t: PropTypes.func.isRequired,
};
