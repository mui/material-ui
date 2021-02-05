import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';

const styles = (theme) => ({
  item1: {
    order: 1,
    [theme.breakpoints.down("md")]: {
      order: 2
    }
  },
  item2: {
    order: 2,
    [theme.breakpoints.down("md")]: {
      order: 1
    }

  },
  item3: {
    order: 3,
    [theme.breakpoints.down("md")]: {
      order: 3
    }
  },
  item4: {
    order: 4,
    [theme.breakpoints.down("md")]: {
      order: 4
    }

  },
  link: {
    textDecoration: "none",
    borderBottom: "2px solid #001E3C"
  }
});
function BrandingPrice(props) {
  const { classes } = props;
  return (
    <Box >
      <Container>
        <Typography variant="h3" component="div" sx={{
          color: "#001E3C",
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "bold",
          textAlign: "center",
          lineHeight: "1.111",
          fontSize: "28px",
          letterSpacing: "-1px",
          maxWidth: "570px",
          margin: "80px auto 48px"
        }}>
          Benefits included with <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }} />all the plans
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={3} className={classes.item1}
          >
            <div style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 20px auto",
              padding: "20px",
              borderRadius: "100px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 2px 3px rgba(0, 30, 60, 0.08)",
              background: '#007FFF'
            }}>
              <img
                loading="lazy"
                src={'/static/branding/pricing-ssi/Path.svg'}
                alt=""
              />
            </div>
            <Typography component="p" sx={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "18px",
              lineHeight: "24px",
              textAlign: "center",
              color: "#001E3C",
              margin: "0 auto"
            }}>
              Faster development process with pre-built elements.
                </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3} className={classes.item2}
          >
            <div style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 20px auto",
              padding: "20px",
              borderRadius: "100px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 2px 3px rgba(0, 30, 60, 0.08)",
              background: "#00B8EB"
            }}>
              <img
                loading="lazy"
                src={'/static/branding/pricing-ssi/icons8-web-design.svg'}
                alt=""
              />
            </div>
            <Typography component="p" sx={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "18px",
              lineHeight: "24px",
              textAlign: "center",
              color: "#001E3C",
              margin: "0 auto"
            }}>
              Highly customisable components.
                </Typography>
          </Grid>


          <Grid item xs={12} sm={6} md={6} lg={3} className={classes.item3}
          >
            <div style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 20px auto",
              padding: "20px",
              borderRadius: "100px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 2px 3px rgba(0, 30, 60, 0.08)",
              background: '#007FFF'
            }}>
              <img
                loading="lazy"
                src={'/static/branding/pricing-ssi/icons8-trust.svg'}
                alt=""
              />
            </div>
            <Typography component="p" sx={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "18px",
              lineHeight: "24px",
              textAlign: "center",
              color: "#001E3C",
              margin: "0 auto"
            }}>
              Strong community numbering 1m developers.
                </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3} className={classes.item4}
          >
            <div style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 20px auto",
              padding: "20px",
              borderRadius: "100px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 2px 3px rgba(0, 30, 60, 0.08)",
              background: "#00B8EB"
            }}>
              <img
                loading="lazy"
                src={'/static/branding/pricing-ssi/Combined Shape.svg'}
                alt=""
              />
            </div>
            <Typography component="p" sx={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "18px",
              lineHeight: "24px",
              textAlign: "center",
              color: "#001E3C",
              margin: "0 auto"
            }}>
              Structured support documentation to help you <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }} />
              <Link href="#" underline="always" color="#001E3C" className={classes.link}> Get started. </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box >
  );

}
BrandingPrice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BrandingPrice);
