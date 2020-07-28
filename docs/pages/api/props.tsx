import * as React from 'react';
import Ad from '_shared/Ad';
import Code from '_shared/Code';
import PropTypesTable from '_shared/PropTypesTable';
import KawaiiIcon from '_shared/svgIcons/KawaiiIcon';
import { PageMeta } from '_shared/PageMeta';
import { WithRouterProps, withRouter } from 'next/router';
import { Typography, Grid, makeStyles } from '@material-ui/core';

const internalComponents = ['Calendar', 'ClockView', 'Day'];
const useStyles = makeStyles((theme) => ({
  kawaiiIcon: {
    marginTop: 48,
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      order: 2,
    },
  },
}));

const Docs: React.FC<WithRouterProps> = ({ router }) => {
  const classes = useStyles();
  const componentName = router!.query!.component! as any; // just crash if name is invalid

  const title = `${componentName} API`;
  const description = `Here you can find the full list and description for ${componentName} props.`;

  return (
    <React.Fragment>
      <PageMeta title={title} description={description} />
      <Grid container justify="space-between" alignItems="center">
        <Grid item md={6} className={classes.title}>
          <h3>{title}</h3>
          <p>{description}</p>
          <Ad />
        </Grid>
        <Grid item md={6} container alignItems="flex-end" justify="center">
          <KawaiiIcon className={classes.kawaiiIcon} size={220} />
        </Grid>
      </Grid>
      <h4> Import </h4>
      <Code language="jsx">{`import { ${componentName} } from '@material-ui/pickers'`}</Code>
      <Typography gutterBottom>
        <code>DateIOType</code> — date object type of your linked date-io adapter (Moment, DayJS,
        etc.)
      </Typography>
      <PropTypesTable src={componentName} />
      {!internalComponents.includes(componentName) && (
        <React.Fragment>
          <h4> Mobile Wrapper </h4>
          <Typography gutterBottom>
            Props available on mobile device with {componentName} or with `Mobile{componentName}`
          </Typography>
          <PropTypesTable disableHeader src="MobileWrapper" />
          <h4> Desktop Wrapper </h4>
          <Typography gutterBottom>
            Props available on desktop device with `{componentName}` or with `Mobile{componentName}`
          </Typography>
          <PropTypesTable disableHeader src="DesktopWrapper" />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(Docs);
