import * as React from 'react';
import Ad from '_shared/Ad';
import Code from '_shared/Code';
import PropTypesTable from '_shared/PropTypesTable';
import KawaiiIcon from '_shared/svgIcons/KawaiiIcon';
import { PageMeta } from '_shared/PageMeta';
import { WithRouterProps, withRouter } from 'next/router';
import { Typography, Grid, makeStyles } from '@material-ui/core';

const internalComponents = ['Calendar', 'ClockView'];
const useStyles = makeStyles(theme => ({
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
    <>
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

      <h4> Inheritance </h4>
      <Typography gutterBottom>
        Any prop not recognized by the pickers and their sub-components are passed down to
        material-ui{' '}
        <a
          target="_blank"
          rel="noopener noreferer"
          href="https://material-ui.com/api/text-field/#props"
        >
          TextField
        </a>{' '}
        component.
      </Typography>

      <Typography gutterBottom>
        <code>DateIOType</code> — date object type of your linked date-io adapter (Moment, DayJS,
        etc.)
      </Typography>

      <PropTypesTable src={componentName} />

      {!internalComponents.includes(componentName) && (
        <>
          <h4> Modal Wrapper </h4>
          <Typography gutterBottom>Available only with variant "dialog" </Typography>

          <PropTypesTable disableHeader src="ModalWrapper" />
        </>
      )}
    </>
  );
};

export default withRouter(Docs);
