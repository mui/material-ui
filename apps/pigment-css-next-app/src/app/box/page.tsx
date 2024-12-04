/* eslint-disable material-ui/no-empty-box */

import { styled } from '@mui/material-pigment-css';
import * as React from 'react';
import { Box as MuiBox } from '../../components/Box';

const Box = styled(MuiBox)(({ theme }) => ({
  border: `1px dashed ${(theme.vars ?? theme).palette.primary.main}`,
  padding: 10,
}));
const Paragraph = styled.p({
  margin: 0,
  marginBottom: 5,
});

export default function DemoBox() {
  return (
    <div style={{ width: '400px', marginLeft: 10, marginTop: 10 }}>
      {[...Array(500)].map((_, i) => (
        <React.Fragment key={i}>
          <Paragraph>Flex with column for &quot;sm&quot; breakpoint</Paragraph>
          <MuiBox
            display="flex"
            direction={{
              sm: 'column',
              md: 'row',
            }}
            spacing={1}
          >
            <Box as="div" sx={{ borderColor: 'red' }}>
              1
            </Box>
            <Box>2</Box>
            <Box>3</Box>
          </MuiBox>
          <Paragraph>Row Reverse</Paragraph>
          <MuiBox display="flex" direction="row-reverse" spacing={1}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </MuiBox>
          <Paragraph>Column</Paragraph>
          <MuiBox display="flex" direction="column" spacing={1}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </MuiBox>
          <Paragraph>Column Reverse</Paragraph>
          <MuiBox display="flex" direction="column-reverse" spacing={1}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </MuiBox>
        </React.Fragment>
      ))}
    </div>
  );
}
