import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';

<Accordion>
  <AccordionSummary>
    <Typography>Location</Typography>
    <Typography>Select trip destination</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Chip label="Barbados" onDelete={() => {}} />
    <Typography variant="caption">Select your destination of choice</Typography>
  </AccordionDetails>
  <Divider />
  <AccordionActions>
    <Button size="small">Cancel</Button>
    <Button size="small">Save</Button>
  </AccordionActions>
</Accordion>;
