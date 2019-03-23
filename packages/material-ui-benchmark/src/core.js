/* eslint-disable no-console, react/no-array-index-key */

import Benchmark from 'benchmark';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StylesProvider } from '@material-ui/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const suite = new Benchmark.Suite('core', {
  onError: event => {
    console.log(event.target.error);
  },
});
Benchmark.options.minSamples = 100;

const data = { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 };
const rows = Array.from(new Array(100)).map(() => data);

function TableMui() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Dessert (100g serving)</TableCell>
          <TableCell>Calories</TableCell>
          <TableCell>Fat (g)</TableCell>
          <TableCell>Carbs (g)</TableCell>
          <TableCell>Protein (g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell>{row.calories}</TableCell>
            <TableCell>{row.fat}</TableCell>
            <TableCell>{row.carbs}</TableCell>
            <TableCell>{row.protein}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function TableRaw() {
  return (
    <table>
      <thead>
        <tr>
          <th>Dessert (100g serving)</th>
          <th>Calories</th>
          <th>Fat (g)</th>
          <th>Carbs (g)</th>
          <th>Protein (g)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <th scope="row">{row.name}</th>
            <td>{row.calories}</td>
            <td>{row.fat}</td>
            <td>{row.carbs}</td>
            <td>{row.protein}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function NakedButton(props) {
  return <button type="button" {...props} />;
}

class HocButton extends React.Component {
  state = {};

  render() {
    return <NakedButton {...this.props} />;
  }
}

suite
  .add('TableRaw', () => {
    ReactDOMServer.renderToString(
      <StylesProvider sheetsCache={null} sheetsManager={new Map()}>
        <TableRaw />
      </StylesProvider>,
    );
  })
  .add('TableMui', () => {
    ReactDOMServer.renderToString(
      <StylesProvider sheetsCache={null} sheetsManager={new Map()}>
        <TableMui />
      </StylesProvider>,
    );
  })
  .add('ButtonBase', () => {
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()}>
        <ButtonBase>Material-UI</ButtonBase>
      </StylesProvider>,
    );
  })
  .add('HocButton', () => {
    ReactDOMServer.renderToString(
      <StylesProvider>
        <HocButton />
      </StylesProvider>,
    );
  })
  .add('NakedButton', () => {
    ReactDOMServer.renderToString(
      <StylesProvider>
        <NakedButton />
      </StylesProvider>,
    );
  })
  .add('ButtonBase enable ripple', () => {
    ReactDOMServer.renderToString(<ButtonBase>Material-UI</ButtonBase>);
  })
  .add('ButtonBase disable ripple', () => {
    ReactDOMServer.renderToString(<ButtonBase disableRipple>Material-UI</ButtonBase>);
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .run();
