# Migration from v0.x

## FAQ

### Woah - the API is way different! Does that mean 1.0 is completely different, I’ll have to learn the basics all over again, and migrating will be practically impossible?

I’m glad you asked! The answer is no. The core concepts haven’t changed.
You will notice that the API provides more flexibility, but this has a cost.
We have been making lower-level components, abstracting less complexity.

### What motivated such large change?

Material-UI was started [3 years ago](https://github.com/mui-org/material-ui/commit/28b768913b75752ecf9b6bb32766e27c241dbc46).
The ecosystem has evolved a lot since then, we have also learned a lot.
[@nathanmarks](https://github.com/nathanmarks/) started an ambitious task, rebuilding Material-UI from the **ground-up**
taking advantage of this knowledge to address long-standing issues. To name some of the major changes:
- New styling solution using CSS-in-JS (better [customization](/customization/overrides) power, better performance)
- New [theme handling](/customization/themes) (nesting, self-supporting, etc.)
- Blazing fast documentation thanks to [Next.js](https://github.com/zeit/next.js)
- Way better [test coverage](/guides/testing) (99%+, run on all the major browsers, [visual regression tests](https://www.argos-ci.com/mui-org/material-ui))
- Full [server-side rendering](/guides/server-rendering) support
- Wide range of [supported browsers](/getting-started/supported-platforms)

Curious to learn more about it? You can checkout our [Q&A on the v1 version](/discover-more/roadmap#q-amp-a-with-the-v1-version).

### Where should I start in a migration?

1. Start by installing the v1.x version of Material-UI along side the v0.x version.
[**Yarn**](https://github.com/yarnpkg/yarn) provides an alias feature to do so:
```sh
yarn add material-ui@latest
yarn add material-ui-next@npm:material-ui@next
```
then
```js
import FlatButton from 'material-ui/FlatButton'; // v0.x
import Button from 'material-ui-next/Button'; // v1.x
```
If you can't use Yarn, we also provide a separate package for **NPM**.
However, the package might not be always up to date.
**It's why we encourage people to use a Yarn alias**.
```sh
npm install material-ui@latest
npm install material-ui-next@latest
```
then
```js
import FlatButton from 'material-ui/FlatButton'; // v0.x
import Button from 'material-ui-next/Button'; // v1.x
```
2. Run [the migration helper](https://github.com/mui-org/material-ui/tree/v1-beta/packages/material-ui-codemod) on your project.
3. After that, you are free to migrate one component instance at the time.

## Components

### Svg Icon

First, run [the migration helper](https://github.com/mui-org/material-ui/tree/v1-beta/packages/material-ui-codemod) on your project.

However, this might not be enough when using the svg icons.
The `material-ui-icons` package has a dependency on the `material-ui/SvgIcon` module.
The `SvgIcon` component slightly changed between the two versions.
You might see some missing context errors and wrong colors.

You can fix those issues with the following code.
Apply it before all the other imports:
```js
import SvgIcon from 'material-ui-next/SvgIcon';

// Tells `material-ui-icons` to use `material-ui-next/SvgIcon` module
// instead of `material-ui/SvgIcon`.
global.__MUI_SvgIcon__ = SvgIcon;
```

### Flat Button

```diff
-import FlatButton from 'material-ui/FlatButton';
+import Button from 'material-ui-next/Button';

-<FlatButton />
+<Button />
```

### Raised Button

```diff
-import RaisedButton from 'material-ui/RaisedButton';
+import Button from 'material-ui-next/Button';

-<RaisedButton />
+<Button raised />
```

### To be continued…

You successfully migrated your app and wish to help the community?
Please help us! We have an open issue in order to finish this migration guide [#7195](https://github.com/mui-org/material-ui/issues/7195). Any pull request is welcomed 😊.
