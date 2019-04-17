import clsx from 'clsx';
import FuzzySearch from 'fuzzy-search';
import PropTypesDoc from '../prop-types.json';
import SearchBar from 'material-ui-search-bar';
import React, { useMemo, useState } from 'react';
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
  header: {
    marginTop: 24,
  },
  tableWrapper: {
    overflowX: 'auto',
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
  const [searchString, setSearchString] = useState('');
  const propsDoc = Object.values(PropTypesDoc[src]);

  const searcher = useMemo(
    () =>
      new FuzzySearch(propsDoc, ['name', 'defaultValue', 'description', 'type.name'], {
        caseSensitive: false,
      }),
    [propsDoc]
  );

  // prettier-ignore
  const propsToShow = useMemo(() => {
    return searcher
      .search(searchString.trim())
      .sort((a, b) => {
        if (a.required && !b.required) {
          return -1;
        }

        if (!a.required && b.required) {
          return 1;
        }

        return a.name.localeCompare(b.name)
      });
  }, [searchString, searcher]);

  return (
    <React.Fragment>
      <Grid className={classes.header} container>
        <Grid item sm={6} xs={12}>
          <Typography variant="h4"> Props </Typography>
        </Grid>
        <Grid item sm={6} xs={12}>
          <SearchBar
            value={searchString}
            onChange={setSearchString}
            onCancelSearch={() => setSearchString('')}
            className={classes.searchBar}
          />
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
            {propsToShow.map(prop => (
              <TableRow key={prop.name}>
                <TableCell
                  className={clsx({
                    [classes.required]: prop.required,
                  })}
                >
                  {prop.required ? `${prop.name} *` : prop.name}
                </TableCell>

                <TableCell className={classes.type}>{prop.type.name}</TableCell>
                <TableCell>
                  <Typography
                    align="center"
                    variant="body1"
                    component="span"
                    className={classes.defaultValue}
                  >
                    {prop.defaultValue && prop.defaultValue.value}
                  </Typography>
                </TableCell>

                <TableCell className={classes.description}>
                  <span dangerouslySetInnerHTML={{ __html: prop.description }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
};

export default React.memo(PropTypesTableLazy);
