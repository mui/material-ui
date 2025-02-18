import * as React from 'react';
import Table from '@mui/joy/Table';

export default function BasicTable() {
  return (
    <Table aria-label="basic table">
      <thead>
        <tr>
          <th style={{ width: '40%' }}>Dessert (100g serving)</th>
          <th>Calories</th>
          <th>Fat&nbsp;(g)</th>
          <th>Carbs&nbsp;(g)</th>
          <th>Protein&nbsp;(g)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Frozen yoghurt</td>
          <td>159</td>
          <td>6</td>
          <td>24</td>
          <td>4</td>
        </tr>
        <tr>
          <td>Ice cream sandwich</td>
          <td>237</td>
          <td>9</td>
          <td>37</td>
          <td>4.3</td>
        </tr>
        <tr>
          <td>Eclair</td>
          <td>262</td>
          <td>16</td>
          <td>24</td>
          <td>6</td>
        </tr>
        <tr>
          <td>Cupcake</td>
          <td>305</td>
          <td>3.7</td>
          <td>67</td>
          <td>4.3</td>
        </tr>
        <tr>
          <td>Gingerbread</td>
          <td>356</td>
          <td>16</td>
          <td>49</td>
          <td>3.9</td>
        </tr>
      </tbody>
    </Table>
  );
}
