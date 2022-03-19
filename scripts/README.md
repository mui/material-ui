# MUI Scripts

## Release

A typical release goes like this:

### Prepare

The following steps must be proposed as a pull request.

1. Generate the changelog with `yarn release:changelog`
   The output must be prepended to the top level `CHANGELOG.md`
   `yarn release:changelog --help` for more information.

1. Clean the generated changelog, to match the format of https://github.com/mui/material-ui/releases.
1. Update the root `/package.json`'s version
1. `yarn release:version` (🔔 manually remove `^` from packages with prerelease version, eg. `-alpha`)
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

```sh
git remote add material-ui-docs https://github.com/mui/material-ui-docs.git
```

```sh
yarn docs:deploy
```

### Announce

Follow the instructions in https://mui-org.notion.site/Releases-7490ef9581b4447ebdbf86b13164272d.
