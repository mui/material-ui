import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            level="body3"
            justifyContent="center"
            textAlign="center"
            sx={{ mb: 2 }}
          >
            The table is scrollable.
          </Typography>
          <Sheet
            variant="outlined"
            sx={{
              height: 200,
              overflow: 'auto',
              p: 2,
              borderRadius: 'sm',
            }}
          >
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
            </Table>
          </Sheet>
        </Box>
      )}
    />
  );
}
