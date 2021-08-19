# Material-UI Scripts

## Release

A typical release goes like this:

### Prepare

The following steps must be proposed as a pull request.

1. Generate the changelog with `yarn release:changelog`
   The output must be prepended to the top level `CHANGELOG.md`
   `yarn release:changelog --help` for more information.

1. Clean the generated changelog, to match the format of https://github.com/mui-org/material-ui/releases.
1. Update the root `/package.json`'s version
1. `yarn release:version`
1. Open PR with changes and wait for review and green CI
1. Merge PR once CI is green and it has been approved

### Release

1. checkout merge commit of the merged PR
1. `yarn`
1. `yarn release:build`
1. `yarn release:publish`
   You need your 2FA device.
1. `yarn release:tag`

### Documentation

Push the next branch on the release branch to deploy the documentation with the latest changes. It lives at https://material-ui.netlify.app/. Force push if necessary.

Note: if you don't have the `material-ui-docs` remote already, you should add it with

```
git remote add material-ui-docs https://github.com/mui-org/material-ui-docs.git
```

```
yarn docs:deploy
```

### Announce

1. **GitHub**. Make a new release on GitHub (for people subscribing to updates). https://github.com/mui-org/material-ui/releases
1. **Twitter**. It's even better to synchronize with the release of Material-UI X: https://trello.com/c/kYF9OLLi/105-release-steps, to have a single announcement/version covering the two.
   Send a tweet with the main Twitter account to summarize what happened.
   Example of template https://twitter.com/MaterialUI/status/1341422029862526977
