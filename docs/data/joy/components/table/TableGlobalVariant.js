import * as React from 'react';
import Table from '@mui/joy/Table';

export default function TableGlobalVariant() {
  return (
    <Table
      stickyHeader
      sx={(theme) => ({
        '& tr > *:first-child': { bgcolor: 'success.softBg' },
        '& th[scope="col"]': theme.variants.solid.neutral,
        '& td': theme.variants.soft.neutral,
      })}
    >
      <caption>Alien football stars</caption>
      <tbody>
        <tr>
          <th scope="col">Player</th>
          <th scope="col">Gloobles</th>
          <th scope="col">Za&apos;taak</th>
        </tr>
        <tr>
          <th scope="row">TR-7</th>
          <td>7</td>
          <td>4,569</td>
        </tr>
        <tr>
          <th scope="row">Khiresh Odo</th>
          <td>7</td>
          <td>7,223</td>
        </tr>
        <tr>
          <th scope="row">Mia Oolong</th>
          <td>9</td>
          <td>6,219</td>
        </tr>
      </tbody>
    </Table>
  );
}
