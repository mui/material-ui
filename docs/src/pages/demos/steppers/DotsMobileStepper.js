import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { contacts } from './steppersData';

const Contact = ({ contact }) => (
  <ListItem>
    <Avatar alt={contact.name} src={contact.photoPath} />
    <ListItemText primary={contact.name} secondary={contact.number} />
  </ListItem>
);

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 400,
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    height: 356,
  },
});

class DotsMobileStepper extends React.Component {
  state = {
    activeStep: 0,
    toShow: contacts.slice(0, 5),
  };

  maxItemsToShow = 5;

  handleNext = () => {
    const nextStep = this.state.activeStep + 1;
    // Select the next items to show based on the next page to show
    this.setState({
      activeStep: nextStep,
      toShow: contacts.slice(nextStep * this.maxItemsToShow, (nextStep + 1) * this.maxItemsToShow),
    });
  };

  handleBack = () => {
    const prevStep = this.state.activeStep - 1;

    this.setState({
      activeStep: prevStep,
      toShow: contacts.slice(prevStep * this.maxItemsToShow, (prevStep + 1) * this.maxItemsToShow),
    });
  };

  render() {
    const { classes, theme } = this.props;
    const { toShow } = this.state;

    const maxItemsToShow = 5;
    const maxSteps = Math.ceil(contacts.length / maxItemsToShow);

    return (
      <div className={classes.root}>
        <List className={classes.list}>
          {toShow.map(contact => <Contact key={contact.name} contact={contact} />)}
        </List>
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={this.state.activeStep}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={this.state.activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

DotsMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DotsMobileStepper);
