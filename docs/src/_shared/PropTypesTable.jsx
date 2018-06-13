import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Table, Typography, withStyles, Paper, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import PropTypesDoc from '../../prop-types.json';

class PropTypesTable extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
  }

  getCommonProps = () => {
    const modalWrapperProps = this.getFilteredProps('wrappers/ModalWrapper.jsx');
    const textFieldProps = this.getFilteredProps('_shared/DateTextField.jsx');
    return { ...modalWrapperProps, ...textFieldProps };
  }

  getPropsDoc = () => {
    const selfProps = this.getFilteredProps(this.props.src);

    return { ...selfProps, ...this.getCommonProps() };
  }

  getFilteredProps = (src) => {
    const { props } = PropTypesDoc[`../lib/src/${src}`][0];

    return Object.keys(props)
      .filter(key => Boolean(props[key].description))
      .reduce((obj, key) => {
        // eslint-disable-next-line
        obj[key] = props[key];
        return obj;
      }, {});
  }

  getDefaultValue = (defaultValue) => {
    if (!defaultValue || defaultValue.value === 'undefined') {
      return null;
    }

    return defaultValue.value;
  }

  getPropType = (prop) => {
    if (prop.type.name === 'custom') {
      return 'date';
    }

    if (prop.type.name === 'enum') {
      const variants = prop.type.value
        .map(item => item.value)
        .join(' | ');

      return `enum ${variants}`;
    }

    if (prop.type.name === 'union') {
      const variants = prop.type.value
        .map(item => item.name)
        .join(' | ');

      return `union ${variants}`;
    }

    return prop.type.name;
  }

  render() {
    const { classes } = this.props;
    const propsDoc = this.getPropsDoc();

    return (
      <React.Fragment>
        <Typography variant="display1" gutterBottom> Component API </Typography>
        <Typography variant="body1" gutterBottom>
          <strong> Note: </strong> Any prop not recognized by the pickers
          and their sub-components are passed down to material-ui&nbsp;
          <a className="link" href="https://material-ui-next.com/api/text-field/#props">
            TextField
          </a> component.
        </Typography>
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
              {
                Object.keys(propsDoc)
                  .sort((a, b) => a.localeCompare(b))
                  .map(prop => (
                    <TableRow key={prop}>
                      <TableCell
                        className={classnames({ [classes.required]: propsDoc[prop].required })}
                      >
                        {
                          propsDoc[prop].required
                            ? `${prop} *`
                            : prop
                        }
                      </TableCell>
                      <TableCell className={classes.type}>
                        {this.getPropType(propsDoc[prop])}
                      </TableCell>
                      <TableCell> {this.getDefaultValue(propsDoc[prop].defaultValue)} </TableCell>
                      <TableCell>
                        <span dangerouslySetInnerHTML={{ __html: propsDoc[prop].description }} />
                      </TableCell>
                    </TableRow>
                  ))
              }
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
    color: theme.palette.primary.main,
  },
});


export default withStyles(styles)(PropTypesTable);

