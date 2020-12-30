# Material-UI Scripts

## Release

A typical release goes like this:

1. **Changelog**. Generate the changelog:

- Compare the last version with `next`. For instance: https://github.com/mui-org/material-ui/compare/v5.0.0-alpha.17...next
- Generate the changelog with this script: https://trello.com/c/uspnIWkh/1566-release-note
- Clean the generated changelog, to match the format of https://github.com/mui-org/material-ui/releases.
- Open a pull request with the generated change on `next`.

1. **build**. Prepare the release:

```
git checkout next
git pull
yarn
yarn release:version
yarn release:build
```

1. **version**. Update the `/package.json` version and commit all the changes

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

```
yarn docs:deploy
```

1. **GitHub**. Make a new release on GitHub (for people subscribing to updates). https://github.com/mui-org/material-ui/releases
1. **Twitter**. Make sure Material-UI X was released at the same time: https://trello.com/c/kYF9OLLi/105-release-steps. Send a tweet with the main Twitter account to summarize what happened.

Example of template https://twitter.com/GatsbyJS/status/1334135834778406915
