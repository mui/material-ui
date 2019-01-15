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
## Supporting Material-UI

Material-UI is an MIT-licensed open source project.
It's an independent project with ongoing development made possible entirely
thanks to the support of these awesome [backers](/discover-more/backers/).

### Gold Sponsors

Gold Sponsors are those who have pledged $500/month and more to Material-UI.

via [Patreon](https://www.patreon.com/oliviertassinari)

<p style="display: flex; justify-content: center;">
  <a href="https://www.creative-tim.com/?utm_source=material-ui&utm_medium=docs&utm_campaign=homepage" rel="noopener" target="_blank" style="margin-right: 8px;">
    <img width="126" src="https://avatars1.githubusercontent.com/u/20172349?s=378" alt="creative-tim" title="Premium Themes">
  </a>
  <a href="https://bitsrc.io" rel="noopener" target="_blank" style="margin-right: 8px;">
    <img width="96" src="https://avatars1.githubusercontent.com/u/24789812?s=192" alt="bitsrc" title="The fastest way to share code">
  </a>
</p>

via [OpenCollective](https://opencollective.com/material-ui)

<p style="display: flex; justify-content: center;">
  <a href="https://www.call-em-all.com" rel="noopener" target="_blank" style="margin-right: 8px;">
    <img src="https://images.opencollective.com/proxy/images?src=https%3A%2F%2Fopencollective-production.s3-us-west-1.amazonaws.com%2Ff4053300-e0ea-11e7-acf0-0fa7c0509f4e.png&height=100" alt="callemall" title="The easy way to message your group">
  </a>
  <a href="https://localizejs.com" rel="noopener" target="_blank" style="margin-right: 8px;">
    <img src="https://images.opencollective.com/proxy/images?src=https%3A%2F%2Fopencollective-production.s3-us-west-1.amazonaws.com%2F629dea80-f1ae-11e8-b356-a5942970e22b.png&height=70" alt="localize" title="Application translation & localization platform">
  </a>
   <a href="https://yakaz.com" rel="noopener" target="_blank" style="margin-right: 8px;">
    <img src="https://images.opencollective.com/proxy/images?src=https%3A%2F%2Fopencollective-production.s3-us-west-1.amazonaws.com%2Fb47b9630-1586-11e9-a4d4-47c0a7133bdc.png&height=70" alt="localize" title="Search classified ads">
  </a>
</p>

### There is more!

See the full list of [our backers](/discover-more/backers/).

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
