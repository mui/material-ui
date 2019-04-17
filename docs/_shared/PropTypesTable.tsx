import clsx from 'clsx';
import React from 'react';
import PropTypesDoc from '../prop-types.json';
import SearchBar from 'material-ui-search-bar';
import {
  Table,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  Typography,
  Theme,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  tableWrapper: {
    overflowX: 'auto',
    // marginTop: 8
  },
  required: {
    color: '#8bc34a',
  },
  type: {
    minWidth: 240,
    maxWidth: 240,
    color: theme.palette.primary.main,
  },
  defaultValue: {
    fontSize: 15,
    minWidth: 200,
    borderBottom: `1px dotted ${theme.palette.text.primary}`,
  },
  description: {
    minWidth: 340,
  },
  searchBar: {
    marginBottom: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      marginTop: -theme.spacing(1),
    },
  },
}));

const PropTypesTableLazy: React.FC<{ src: keyof typeof PropTypesDoc }> = ({ src }) => {
  const classes = useStyles();
  const propsDoc = PropTypesDoc[src] as any;

  return (
    <React.Fragment>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <Typography variant="h4"> Props </Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <SearchBar className={classes.searchBar} onChange={console.log} />
        </Grid>
      </Grid>

      <Paper className={classes.tableWrapper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Name </TableCell>
              <TableCell> Type </TableCell>
              <TableCell> Default </TableCell>
              <TableCell> Description </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(propsDoc)
              .sort((a, b) => a.localeCompare(b))
              .map(prop => (
                <TableRow key={prop}>
                  <TableCell
                    className={clsx({
                      [classes.required]: propsDoc[prop].required,
                    })}
                  >
                    {propsDoc[prop].required ? `${prop} *` : prop}
                  </TableCell>

                  <TableCell className={classes.type}>{propsDoc[prop].type.name}</TableCell>
                  <TableCell>
                    <Typography
                      align="center"
                      variant="body1"
                      component="span"
                      className={classes.defaultValue}
                    >
                      {propsDoc[prop].defaultValue && propsDoc[prop].defaultValue.value}
                    </Typography>
                  </TableCell>

                  <TableCell className={classes.description}>
                    <span dangerouslySetInnerHTML={{ __html: propsDoc[prop].description }} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
};

export default PropTypesTableLazy;
