import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

<ExpansionPanel>
  <ExpansionPanelSummary>
    <Typography>Location</Typography>
    <Typography>Select trip destination</Typography>
  </ExpansionPanelSummary>
  <ExpansionPanelDetails>
    <Chip label="Barbados" onDelete={() => {}} />
    <Typography variant="caption">Select your destination of choice</Typography>
  </ExpansionPanelDetails>
  <Divider />
  <ExpansionPanelActions>
    <Button size="small">Cancel</Button>
    <Button size="small">Save</Button>
  </ExpansionPanelActions>
</ExpansionPanel>;
