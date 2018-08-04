import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  products: {
    backgroundColor: theme.palette.grey[100],
    marginBottom: theme.spacing.unit * 2,
  },
  product: {
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 3}px`,
  },
  total: {
    fontWeight: 'bold',
  },
  sections: {
    alignItems: 'stretch',
  },
  details: {
    flex: 1,
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 2,
    },
  },
  paymentDetailName: {
    flex: 1,
    fontWeight: 500,
  },
  paymentDetail: {
    flex: 1,
  },
});

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const address = ['1 Material Drive,', 'Reactville,', 'Anytown,', '99999,', 'USA'];
const payment = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxx-xxx-xxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

function Review(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Typography variant="title" gutterBottom>
        Order summary
      </Typography>
      <List className={classes.products}>
        {products.map(product => (
          <ListItem className={classes.product} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Total" />
          <Typography variant="subheading" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={24} className={classes.sections}>
        <Grid item xs={12} sm={6}>
          <Typography variant="title" gutterBottom>
            Shipping
          </Typography>
          <div className={classes.details}>
            <Typography variant="body2" gutterBottom>
              John Smith
            </Typography>
            {address.map(line => (
              <Typography variant="body1" gutterBottom key={line}>
                {line}
              </Typography>
            ))}
          </div>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="title" gutterBottom>
            Payment details
          </Typography>
          <Grid container className={classes.details}>
            {payment.map(details => (
              <Grid item container key={details.name}>
                <Typography variant="body1" gutterBottom className={classes.paymentDetailName}>
                  {details.name}
                </Typography>
                <Typography variant="body1" gutterBottom className={classes.paymentDetail}>
                  {details.detail}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Review);
