import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import NoSSR from 'docs/src/modules/components/NoSSR';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  markdownElement: {
    maxWidth: theme.spacing.unit * 110,
    margin: 'auto',
    padding: theme.spacing.unit * 2,
    minHeight: 600,
  },
});

function HomeBackers(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <NoSSR>
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
      <td>
        <a href="https://www.creative-tim.com" rel="noopener" target="_blank">
          <img width="126" src="https://avatars1.githubusercontent.com/u/20172349" alt="0">
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
      </NoSSR>
    </div>
  );
}

HomeBackers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeBackers);
