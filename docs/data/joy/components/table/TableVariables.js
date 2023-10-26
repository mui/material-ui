import * as React from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';

export default function TableVariables() {
  return (
    <JoyVariablesDemo
      componentName="Table"
      data={[
        {
          var: '--Table-headerUnderlineThickness',
          defaultValue: '2px',
        },
        {
          var: '--TableCell-height',
          defaultValue: '40px',
        },
        {
          var: '--TableCell-paddingX',
          defaultValue: '8px',
        },
        {
          var: '--TableCell-paddingY',
          defaultValue: '6px',
        },
      ]}
      renderDemo={(sx) => (
        <Sheet variant="outlined" sx={{ width: 300, boxShadow: 'sm' }}>
          <Table borderAxis="bothBetween" sx={sx}>
            <thead>
              <tr>
                <th>Name</th>
                <th style={{ width: '60%' }}>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Adam</td>
                <td>Developer</td>
              </tr>
              <tr>
                <td>Joseph</td>
                <td>Manager</td>
              </tr>
            </tbody>
          </Table>
        </Sheet>
      )}
    />
  );
}
