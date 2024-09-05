import * as React from 'react';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function TableUsage() {
  return (
    <JoyUsageDemo
      componentName="Table"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
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
          propName: 'stickyFooter',
          knob: 'switch',
          defaultValue: false,
        },
        {
          propName: 'stripe',
          knob: 'radio',
          options: ['undefined', 'odd', 'even'],
        },
      ]}
      getCodeBlock={(code) => `<Sheet>
  ${code}
</Sheet>`}
      renderDemo={(props) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            level="body-xs"
            sx={{ justifyContent: 'center', textAlign: 'center', mb: 2 }}
          >
            The table is scrollable.
          </Typography>
          <Sheet variant="outlined" sx={{ p: 2, borderRadius: 'sm' }}>
            <Sheet sx={{ height: 200, overflow: 'auto', borderRadius: 0 }}>
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
                <tfoot>
                  <tr>
                    <td>Total</td>
                    <td colSpan={2} style={{ textAlign: 'center' }}>
                      4 people
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Sheet>
          </Sheet>
        </Box>
      )}
    />
  );
}
