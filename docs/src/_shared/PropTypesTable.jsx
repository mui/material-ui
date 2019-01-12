import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Table,
  Typography,
  withStyles,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import PropTypesDoc from '../prop-types.json';

class PropTypesTable extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
  };

  getDescriptionHtml = description => {
    return { __html: description };
  };

  render() {
    const { classes } = this.props;
    const propsDoc = PropTypesDoc[this.props.src];

    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          Component API
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong> Note: </strong>
          Any prop not recognized by the pickers and their sub-components are passed down to
          material-ui&nbsp;
          <a className="link" href="https://material-ui-next.com/api/text-field/#props">
            TextField{' '}
          </a>
          component.
        </Typography>

        <Paper className={classes.tableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Name </TableCell>
                <TableCell> Type </TableCell>
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

                    <TableCell className={classes.description}>
                      <span
                        dangerouslySetInnerHTML={this.getDescriptionHtml(
                          propsDoc[prop].description
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
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
  description: {
    maxWidth: 340,
  },
});

export default withStyles(styles)(PropTypesTable);
