# Material-UI Scripts

## Release

A typical release goes like this:

1. **Changelog**. Generate the changelog:

- Compare the last version with `next`. For instance: https://github.com/mui-org/material-ui/compare/v5.0.0-alpha.17...next
- Generate the changelog with this script: https://trello.com/c/uspnIWkh/1566-release-note
- Clean the generated changelog, to match the format of https://github.com/mui-org/material-ui/releases.
- Open a pull request with the generated change on `next`.

1. **Build**. Prepare the release:

```
git checkout next
git pull
git checkout -b v5.0.0-alpha.18
yarn
yarn release:version
yarn release:build
```

1. **Version**. Update the root `/package.json`'s version and commit all the changes

```
git commit -am "v5.0.0-alpha.18"
git tag v5.0.0-alpha.18
```

1. **npm**. Release the packages to npm. You need your 2FA device:

```
yarn release:publish
```

1. **git**. Push the release git commit and git tag to master (e.g. "v5.0.0-alpha.17"):

```
git push
git push --tag
```

1. **Docs**. Push the next branch on the release branch to deploy the documentation with the latest changes. It lives at https://material-ui.netlify.app/. Force push if necessary.

Note: if you don't have the `material-ui-docs` remote already, you should add it with

```
git remote add material-ui-docs https://github.com/mui-org/material-ui-docs.git
```

```
yarn docs:deploy
```

1. **GitHub**. Make a new release on GitHub (for people subscribing to updates). https://github.com/mui-org/material-ui/releases
1. **Twitter**. It's even better to synchronize with the release of Material-UI X: https://trello.com/c/kYF9OLLi/105-release-steps, to have a single announcement/version covering the two.
   Send a tweet with the main Twitter account to summarize what happened.
   Example of template https://twitter.com/MaterialUI/status/1341422029862526977
