import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import PropTypesDoc from '../../prop-types.json';

export default class PropTypesTable extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
  }

  getDefaultProps = () => {
    const modalWrapperProps = this.getFilteredProps('wrappers/ModalWrapper.jsx');
    const textFieldProps = this.getFilteredProps('_shared/DateTextField.jsx');
    return { ...modalWrapperProps, ...textFieldProps };
  }

  getPropsDoc = () => {
    const selfProps = this.getFilteredProps(this.props.src);

    return { ...selfProps, ...this.getDefaultProps() };
  }

  getFilteredProps = (src) => {
    const { props } = PropTypesDoc[`../lib/src/${src}`][0];

    return Object.keys(props)
      .filter(key => Boolean(props[key].description))
      .sort((a, b) => a.localeCompare(b))
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

  render() {
    const propsDoc = this.getPropsDoc();

    return (
      <Paper>
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
              Object.keys(propsDoc).map(prop => (
                <TableRow>
                  <TableCell> {prop} </TableCell>
                  <TableCell> {propsDoc[prop].type.name} </TableCell>
                  <TableCell> {this.getDefaultValue(propsDoc[prop].defaultValue)} </TableCell>
                  <TableCell> {propsDoc[prop].description} </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
