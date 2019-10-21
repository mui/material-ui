import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  details: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ActionsInExpansionPanelSummary() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<Checkbox />}
            label="I acknowledge that I should stop the click event propagation"
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.details}>
            The click event of the nested action will propagate up and expand the panel unless you
            explicitly stop it.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<Checkbox />}
            label="I acknowledge that I should stop the focus event propagation"
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.details}>
            The focus event of the nested action will propagate up and also focus the expansion
            panel unless you explicitly stop it.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<Checkbox />}
            label="I acknowledge that I should provide an aria-label on each action that I add"
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.details}>
            If you forget to put an aria-label on the nested action, the label of the action will
            also be included in the label of the parent button that controls the panel expansion.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
