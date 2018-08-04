import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[300],
  },
  paper: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 8,
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      width: 'auto',
    },
  }),
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {
  state = { email: '', password: '' };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant="headline">Sign in</Typography>
          <FormControl required fullWidth className={classes.formControl}>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input value={this.state.email} onChange={this.handleChange('email')} id="email" />
          </FormControl>
          <FormControl required fullWidth className={classes.formControl}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              value={this.state.password}
              onChange={this.handleChange('password')}
              type="password"
              id="password"
            />
          </FormControl>
          <Button fullWidth variant="raised" color="primary" className={classes.button}>
            Sign in
          </Button>
        </Paper>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
