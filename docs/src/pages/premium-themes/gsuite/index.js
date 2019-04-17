import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Gsuitelayout from './modules/layout';

const Home = () => {
  return (
    <Gsuitelayout>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Body</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(10).keys()].map(item => (
              <TableRow hover role="checkbox" key={item} tabIndex={-1}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell component="th" scope="row" padding="none">
                  {'Lorem ipsum'}
                </TableCell>
                <TableCell>{`Lorem Ipsum is simply dummy
                         text of the printing and typesetting industry. Lore
                         m Ipsum h
                        `}</TableCell>
                <TableCell numeric>8:{15 + item}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Gsuitelayout>
  );
};

export default Home;
