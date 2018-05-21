import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

class CardsList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { classes } = this.props;
        let seatsAvailable = "50 Seats";//Harconding since not comming from server
        let getBody = () =>{
            if(!this.props.busList){
                return "";
            }
            let outputBody = [];
            for(const eachBus of this.props.busList){
                let eachGrid = 
                    <Paper className={classes.paper} zDepth={1} rounded={false}>
                            <Grid container>
                            {/*first row */}
                                <Grid item xs={9}>
                                    <Typography className={classes.travels} variant="title" noWrap>{eachBus.travels}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography className={classes.fare} variant="title" align="right">{eachBus.fare}</Typography>
                                </Grid>
                            {/* Second row from here */}
                                <Grid item xs={12}>
                                    <Typography className={classes.busType} variant="subheading">{eachBus.bus_type}</Typography>
                                </Grid>
                            {/* third row */}
                                <Grid item xs={6}>
                                    <Typography className={classes.timings} >{`${eachBus.depature} - ${eachBus.arrival}`}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className={classes.seatsAvailable} variant="subheading" align="right">{seatsAvailable}</Typography>
                                </Grid>
                            {/* last Row */}
                                <Grid item xs={12}>
                                        <Typography className={classes.jurneyTime} variant="subheading">{eachBus.jurneyTime}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>;
                outputBody.push(eachGrid);
            }
            return outputBody;
        }
        return(
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    {getBody()}
                </div>
            </div>
        );
    }

}

const styles = theme => ({
    root: {
      overflow: 'hidden',
    },
    wrapper: {
      maxWidth: 400,
    },
    paper: {
        marginBottom: 5,
        padding: theme.spacing.unit * 2,
    },travels: {
        color: "#000",
        fontSize: 15
    },fare:{
        color: "#000",
        fontSize: 15
    },busType:{
        color: "#8c8c8c",
        fontSize: 12
    },timings:{
        fontSize: 11,
        color: "#0a0a0a"
    },seatsAvailable: {
        color: "#8c8c8c",
        fontSize: 12
    },jurneyTime: {
        color: "#8c8c8c",
        fontSize: 11
    }
  });

export default withStyles(styles)(CardsList);

// box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 5px 4px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);





