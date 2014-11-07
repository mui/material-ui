# [Material-UI](http://callemall.github.io/material-ui/)

Material-UI is a CSS framework and a set of [React](http://facebook.github.io/react/) components that implement [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html) specification.

Check out our [documentation site](http://www.material-ui.com/) for live examples. It's still a work in progress, but hopefully you can see where we're headed.

## Installation

Material-UI is available as an [npm package](https://www.npmjs.org/package/material-ui).
```sh
npm install material-ui
```

Use [browserify](http://browserify.org/) and [reactify](https://github.com/andreypopp/reactify) for dependency management and JSX transformation. The CSS framework is written in [Less](http://lesscss.org/), so you'll need to compile that as well.


## Usage

Once material-ui is included in your project, you can use the components this way:
```js
/**
 * @jsx React.DOM
 */

var React = require('react'),
  mui = require('material-ui'),
  PaperButton = mui.PaperButton;

var SomeAwesomeComponent = React.createClass({

  render: function() {
    return (
    	<PaperButton type={PaperButton.Types.FLAT} label="Default" />
    );
  }

});

module.exports = SomeAwesomeComponent;
```

## Customization

The styles are separated into 2 less files:
* dist/less/scaffolding.less
* dist/less/components.less

This allows you to override any variables defined in [custom-variables.less](https://github.com/callemall/material-ui/blob/master/dist/less/variables/custom-variables.less) without having to modify material-ui source files directly. For example, your main.less file could look something like this:
```css
@import "node_modules/material-ui/dist/less/scaffolding.less";

//Define a custom less file to override any variables defined in scaffolding.less
@import "my-custom-overrides.less";

@import "node_modules/material-ui/dist/less/components.less";
```

## Contribute

[Material-UI](http://www.material-ui.com/) came about from our love of [React](http://facebook.github.io/react/) and [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html). We're currently using it on a project at [Call-Em-All](https://www.call-em-all.com/) and plan on adding to it and making it better. If you'd like to help, check out the [docs folder](https://github.com/callemall/material-ui/tree/master/docs). We'd greatly appreciate any contribution you make. :)

