# Supported platforms

<p class="description">Learn about the platforms, from modern to old, that are supported by Material UI.</p>

## Browser

Material UI supports the latest, stable releases of all major browsers and platforms.
You don't need to provide any JavaScript polyfill as it manages unsupported browser features internally and in isolation.

<!-- #stable-snapshot -->

| Edge  | Firefox | Chrome | Safari (macOS) | Safari (iOS) | IE                   |
| :---- | :------ | :----- | :------------- | :----------- | :------------------- |
| >= 91 | >= 78   | >= 90  | >= 14          | >= 12.5      | 11 (partial support) |

<!-- #default-branch-switch -->

An extensive list can be found in our [.browserlistrc](https://github.com/mui/material-ui/blob/-/.browserslistrc#L12-L27) (check the `stable` entry).

Because Googlebot uses a web rendering service (WRS) to index the page content, it's critical that Material UI supports it.
[WRS regularly updates the rendering engine it uses](https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html).
You can expect Material UI's components to render without major issues.

### IE 11

Material UI provides **partial** supports for IE 11. Be aware of the following:

- Some of the components have no support. For instance, the new components, the data grid, the date picker.
- Some of the components have degraded support. For instance, the outlined input border radius is missing, the combobox doesn't remove diacritics, the circular progress animation is wobbling.
- The documentation itself might crash.
- You need to install the [legacy bundle](/material-ui/guides/minimizing-bundle-size/#legacy-bundle).
- You might need to install polyfills. For instance for the [popper.js transitive dependency](https://popper.js.org/docs/v2/browser-support/#ie11).

Overall, the library doesn't prioritize the support of IE 11 if it harms the most common use cases. For instance, we will close new issues opened about IE 11 and might not merge pull requests that improve IE 11 support.

v6 will completely remove the support of IE 11.

## Server

<!-- #stable-snapshot -->

Material UI supports [Node.js](https://github.com/nodejs/node) starting with version 12.0 for server-side rendering.
The objective is to support Node.js down to the [last version in maintenance mode](https://github.com/nodejs/Release#release-schedule).

## React

<!-- #react-peer-version -->

Material UI supports the most recent versions of React, starting with ^17.0.0 (the one with event delegation at the React root).
Have a look at the older [versions](https://mui.com/versions/) for backward compatibility.

## TypeScript

Material UI requires a minimum version of TypeScript 3.5.
This aims to match the policy of [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), with the support of the versions of TypeScript that are less than two years old.
