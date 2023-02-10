# MUI Scripts

## Release

A typical release goes like this:

### Prerequisites

1. You must be a member of the `@mui` org in npm to publish the release
1. Set up your npm authToken by logging into npm (`npm login`) . This will save a token to `~/.npmrc` as a line that looks
   like this:
   ```text
   //registry.npmjs.org/:_authToken=npm_000000000000000000000000000000000000
   ```
1. Make sure you have added the `material-ui-docs` remote to deploy the documentation:
   ```sh
   git remote add material-ui-docs https://github.com/mui/material-ui-docs.git
   ```

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

1. Checkout merge commit of the merged PR
1. `yarn`
1. `yarn release:build`
1. `yarn release:publish`
   You need your 2FA device.
1. `yarn release:tag`

### Documentation

`yarn docs:deploy` to deploy the documentation (it lives at https://material-ui.netlify.app/) with the latest changes.
Force push if necessary.

### Announce

Follow the instructions in https://mui-org.notion.site/Releases-7490ef9581b4447ebdbf86b13164272d.
