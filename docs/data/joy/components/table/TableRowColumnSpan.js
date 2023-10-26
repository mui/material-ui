import * as React from 'react';
import Table from '@mui/joy/Table';

export default function TableRowColumnSpan() {
  return (
    <Table borderAxis="both">
      <thead>
        <tr>
          <th rowSpan={2}>Name</th>
          <th rowSpan={2}>ID</th>
          <th colSpan={2} style={{ textAlign: 'center' }}>
            Membership Dates
          </th>
          <th rowSpan={2}>Balance</th>
        </tr>
        <tr>
          <th>Joined</th>
          <th style={{ borderRightWidth: 0 }}>Canceled</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Margaret Nguyen</th>
          <td>427311</td>
          <td>
            <time dateTime="2010-06-03">June 3, 2010</time>
          </td>
          <td>n/a</td>
          <td>0.00</td>
        </tr>
        <tr>
          <th scope="row">Edvard Galinski</th>
          <td>533175</td>
          <td>
            <time dateTime="2011-01-13">January 13, 2011</time>
          </td>
          <td>
            <time dateTime="2017-04-08">April 8, 2017</time>
          </td>
          <td>37.00</td>
        </tr>
        <tr>
          <th scope="row">Hoshi Nakamura</th>
          <td>601942</td>
          <td>
            <time dateTime="2012-07-23">July 23, 2012</time>
          </td>
          <td>n/a</td>
          <td>15.00</td>
        </tr>
      </tbody>
    </Table>
  );
}
