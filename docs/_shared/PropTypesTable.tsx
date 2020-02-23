import clsx from 'clsx';
import Code from './Code';
import FuzzySearch from 'fuzzy-search';
import ReactMarkdown from 'react-markdown';
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
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
    minWidth: 210,

    '& > span': {
      fontSize: 15,
      borderBottom: `1px dotted ${theme.palette.text.primary}`,
    },
  },
  description: {
    minWidth: 340,
  },
  searchBar: {
    marginTop: 8,
    marginBottom: 8,

    [theme.breakpoints.up('sm')]: {
      marginTop: -8,
    },
  },
}));

interface PropTypesTableProps {
  disableHeader?: boolean;
  src: keyof typeof PropTypesDoc;
}

const PropTypesTableLazy: React.FC<PropTypesTableProps> = ({ disableHeader, src }) => {
  const classes = useStyles();
  const [searchString, setSearchString] = useState('');
  const propsDoc = Object.values(PropTypesDoc[src]).sort((a, b) => {
    if (a.required && !b.required) {
      return -1;
    }

    if (!a.required && b.required) {
      return 1;
    }

    return a.name.localeCompare(b.name);
  });

  const searcher = useMemo(
    () =>
      new FuzzySearch(propsDoc, ['name', 'defaultValue', 'description', 'type.name'], {
        sort: true,
        caseSensitive: false,
      }),
    [propsDoc]
  );

  const propsToShow = useMemo(() => {
    return searcher.search(searchString.trim());
  }, [searchString, searcher]);

  return (
    <React.Fragment>
      {!disableHeader && (
        <Grid className={classes.header} container>
          <Grid item sm={6} xs={12}>
            <Typography variant="h4"> Props </Typography>
          </Grid>
          <Grid item sm={6} xs={12}>
            <SearchBar
              placeholder="Fuzzy Search"
              value={searchString}
              onChange={setSearchString}
              onCancelSearch={() => setSearchString('')}
              className={classes.searchBar}
            />
          </Grid>
        </Grid>
      )}

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
                  <Typography variant="body2">
                    {prop.required ? `${prop.name} *` : prop.name}{' '}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Code inline language="typescript">
                    {prop.type.name}
                  </Code>
                </TableCell>

                <TableCell className={classes.defaultValue}>
                  <Typography align="center" variant="body1" component="span">
                    {prop.defaultValue && prop.defaultValue.value}
                  </Typography>
                </TableCell>

                <TableCell className={classes.description}>
                  <ReactMarkdown source={prop.description} />
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
