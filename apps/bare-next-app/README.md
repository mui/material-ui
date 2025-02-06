# bare next app

_date: 2025-02-04_

This is a copy of `apps/pigment-css-next-app` which currently suffers from heavy slow down in GitHub actions on MacOs for its `build` command. This copy removes Pigment CSS but keeps the rest of the app intact to serve as an integration test during `pnpm build:ci`.

Feel free to remove once the pigmenbt version works in predictable time again on MacOs GitHub actions.

See also [#43264](https://github.com/mui/material-ui/pull/43264)
