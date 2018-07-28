import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import MarkdownElement from '@material-ui/docs/MarkdownElement';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: 600,
  },
  markdownElement: {
    maxWidth: theme.spacing.unit * 110,
    margin: 'auto',
    padding: theme.spacing.unit * 2,
  },
});

function HomeBackers(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <NoSsr>
        <MarkdownElement
          className={classes.markdownElement}
          text={`
<h2>Supporting Material-UI</h2>

Material-UI is an MIT-licensed open source project.
It's an independent project with ongoing development made possible entirely
thanks to the support of these awesome [backers](/discover-more/backers).

<h3>Gold Sponsors</h3>

Gold Sponsors are those who have pledged $500/month and more to Material-UI.

#### via [Patreon](https://www.patreon.com/oliviertassinari)

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <a href="https://www.creative-tim.com/?utm_source=material-ui&utm_medium=docs&utm_campaign=homepage" rel="noopener" target="_blank">
          <img
            width="126"
            src="https://avatars1.githubusercontent.com/u/20172349?s=378"
            alt="0"
            title="Premium Themes"
          >
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://bitsrc.io" rel="noopener" target="_blank">
          <img
            width="80"
            src="https://avatars1.githubusercontent.com/u/24789812?s=180"
            alt="1"
            title="The fastest way to share code"
          >
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://coreui.io/?utm_source=material-ui&utm_medium=logo&utm_campaign=homepage" rel="noopener" target="_blank">
          <img
            width="80"
            src="https://avatars1.githubusercontent.com/u/36859861?s=180"
            alt="1"
            title="The fastest way to build modern dashboard"
          >
        </a>
      </td>
    </tr>
  </tbody>
</table>

#### via [OpenCollective](https://opencollective.com/material-ui)

${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            .map(
              num =>
                `<a href="https://opencollective.com/material-ui/tiers/gold-sponsors/${num}/website" rel="noopener" target="_blank" style="margin-right: 8px;"><img src="https://opencollective.com/material-ui/tiers/gold-sponsors/${num}/avatar.svg" alt="${num}" /></a>`,
            )
            .join('')}
`}
        />
      </NoSsr>
    </div>
  );
}

HomeBackers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeBackers);
