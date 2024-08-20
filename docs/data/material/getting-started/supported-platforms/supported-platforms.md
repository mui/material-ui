# Supported platforms

<p class="description">Learn about the platforms, from modern to old, that are supported by Material UI.</p>

## Browser

Material UI supports the latest, stable releases of all major browsers and platforms.
You don't need to provide any JavaScript polyfill as it manages unsupported browser features internally and in isolation.

<!-- #stable-snapshot -->

| Edge   | Firefox | Chrome | Safari (macOS) | Safari (iOS) |
| :----- | :------ | :----- | :------------- | :----------- |
| >= 121 | >= 115  | >= 109 | >= 15.4        | >= 15.4      |

<!-- #default-branch-switch -->

An extensive list can be found in our [.browserlistrc](https://github.com/mui/material-ui/blob/-/.browserslistrc#L12-L27) (check the `stable` entry).

Because Googlebot uses a web rendering service (WRS) to index the page content, it's critical that Material UI supports it.
[WRS regularly updates the rendering engine it uses](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html).
You can expect Material UI's components to render without major issues.

## Server

<!-- #stable-snapshot -->

Material UI supports [Node.js](https://github.com/nodejs/node) starting with version 14.0 for server-side rendering.
The objective is to support Node.js down to the [last version in maintenance mode](https://github.com/nodejs/Release#release-schedule).

## React

<!-- #react-peer-version -->

Material UI supports the most recent versions of React, starting with ^17.0.0 (the one with event delegation at the React root).
Have a look at the older [versions](https://mui.com/versions/) for backward compatibility.

## TypeScript

Material UI requires a minimum version of TypeScript 4.7.
This aims to match the policy of [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), with the support of the versions of TypeScript that are less than two years old.
