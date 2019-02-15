const fs = require(`fs`);
const path = require(`path`);
const os = require(`os`);

// Write out a theme module to .cache.
// https://github.com/gatsbyjs/gatsby/blob/9bb587df3faed2f75af571d8d69e3bc4d7f65193/packages/gatsby-plugin-typography/src/gatsby-node.js

exports.onPreBootstrap = ({ store }, pluginOptions) => {
  const program = store.getState().program;

  let module;
  if (pluginOptions.pathToTheme) {
    module = `module.exports = require("${
      path.isAbsolute(pluginOptions.pathToTheme)
        ? pluginOptions.pathToTheme
        : path.join(program.directory, pluginOptions.pathToTheme)
    }")`;
    if (os.platform() === `win32`) {
      module = module.split(`\\`).join(`\\\\`);
    }
  } else {
    module = `const styles = require("@material-ui/core/styles");
const theme = styles.createMuiTheme();
module.exports = theme;`;
  }

  const dir = `${__dirname}/.cache`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(`${dir}/theme.js`, module);
};
