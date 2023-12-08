import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Container from 'modules/components/Container';
import makeStyles from '@material-ui/styles/makeStyles';
import AppAppBar from 'modules/components/AppAppBar';
import OrderBody from 'modules/components/OrderBody';
import Button from 'modules/components/Button';
import actionTypes from 'modules/redux/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import OrderSummary from 'modules/components/OrderSummary';
import AppFooter from 'modules/components/AppFooter';
import Stepper from 'modules/components/Stepper';
import OrderLicense from 'modules/components/OrderLicense';
import Divider from 'modules/components/Divider';
import Paper from 'modules/components/Paper';
import intersperse from 'modules/components/intersperse';
import Link from 'modules/components/Link';
import api from 'modules/api';
import getCart from 'modules/getCart';
import Head from 'modules/components/Head';
const useStyles = makeStyles((theme) => ({
  stepper: {
    marginLeft: theme.spacing(5),
    paddingRight: theme.spacing(3),
    marginRight: 'auto',
    minWidth: 400,
  },
  container: {
    marginTop: theme.spacing(4),
  },
  checkout: {
    marginTop: theme.spacing(3),
  },
  taxes: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
}));

export default function Cart() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    cart,
    cart: { entries: cartEntries = [] },
  } = useSelector((state) => ({ cart: state.data.cart }));
  React.useEffect(() => {
    if (cart.entries == null) {
      return;
    }
    window.dataLayer.push({
      ecommerce: {
        checkout: {
          actionField: {
            step: 1,
          },
          products: cart.entries.map((entry) => [
            {
              id: entry.slug,
              name: entry.name,
              price: entry.amount,
              quantity: 1,
            },
          ]),
        },
      },
    });
  }, [cart.entries]);
  const handleClickRemove = (entry) => async () => {
    await api(entry.remove, {
      transformation: 'text',
    });
    const newCart = await getCart();
    dispatch({
      type: actionTypes.CART_UPDATE,
      payload: newCart,
    });
    window.dataLayer.push({
      event: 'EEremoveFromCart',
      ecommerce: {
        remove: {
          products: [
            {
              id: entry.slug,
              name: entry.name,
              price: entry.amount,
              quantity: 1,
            },
          ],
        },
      },
    });
  };
  return (
    <React.Fragment>
      <Head title="View cart">
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AppAppBar essential>
        <Stepper
          className={classes.stepper}
          steps={['View cart', 'Checkout', 'Confirmation']}
          activeIndex={0}
        />
      </AppAppBar>
      <Container className={classes.container} maxWidth="md">
        <OrderBody
          cart={cart}
          side={
            <OrderSummary
              cart={cart}
              loading={!cart}
              footer={
                <React.Fragment>
                  <Button
                    variant="contained"
                    naked
                    component={Link}
                    to="/order-payment/"
                    fullWidth
                    className={classes.checkout}
                    disabled={cartEntries.length === 0}
                  >
                    {'Proceed to checkout'}
                  </Button>
                  <Typography
                    display="block"
                    variant="caption"
                    className={classes.taxes}
                    align="center"
                  >
                    {'Taxes may apply before placing an order.'}
                  </Typography>
                </React.Fragment>
              }
            />
          }
        >
          {cartEntries.length === 0 ? (
            <React.Fragment>
              <Typography variant="h4" gutterBottom>
                Your Cart
              </Typography>
              <Paper variant="outlined" padding>
                <Typography>
                  {'Your cart is empty, return to '}
                  <Link to="/">the home page</Link>.
                </Typography>
              </Paper>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography variant="h4" gutterBottom>
                {'Your cart'}
                {' ('}
                {cartEntries.length}
                {')'}
              </Typography>
              <Paper variant="outlined" padding>
                {intersperse(
                  cartEntries.map((entry) => (
                    <OrderLicense
                      key={entry.slug}
                      entry={entry}
                      side={
                        <Typography variant="subtitle1">{`${entry.quantity} x $${entry.amount}`}</Typography>
                      }
                      action={
                        <MuiLink
                          variant="body2"
                          component="button"
                          className={classes.remove}
                          onClick={handleClickRemove(entry)}
                        >
                          {'Remove'}
                        </MuiLink>
                      }
                    />
                  )),
                  <Divider className={classes.divider} />,
                )}
              </Paper>
            </React.Fragment>
          )}
        </OrderBody>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}