import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';

export default function ButtonUsage() {
  return (
    <JoyUsageDemo
      componentName="Table"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'plain',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'borderAxis',
          knob: 'select',
          options: ['xBetween', 'x', 'yBetween', 'y', 'bothBetween', 'both', 'none'],
          defaultValue: 'xBetween',
        },
        {
          propName: 'stickyHeader',
          knob: 'switch',
          defaultValue: false,
        },
        {
          propName: 'stripe',
          knob: 'radio',
          options: ['odd', 'even'],
        },
      ]}
      renderDemo={(props) => (
        <Sheet sx={{ height: 200, overflow: 'auto', mx: -2, px: 2, py: 1 }}>
          <Table {...props}>
            <thead>
              <tr>
                <th style={{ width: 64 }}>ID</th>
                <th>Job Title</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Doctor</td>
                <td>Chris Johnson</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Electrician</td>
                <td>Joseph Morris</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Operator</td>
                <td>Aiden Moreno</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Baker</td>
                <td>Mike Simmons</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Clerk</td>
                <td>Enoch Addison</td>
              </tr>
            </tbody>
            {<caption>The table is scrollable.</caption>}
          </Table>
        </Sheet>
      )}
    />
  );
}
