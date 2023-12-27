import { styled } from '@mui/zero-runtime';
import { Box as MuiBox } from '../../components/Box';
import { Fragment } from 'react';

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
        <Fragment key={i}>
          <Paragraph>Flex with column for "sm" breakpoint</Paragraph>
          <MuiBox
            display="flex"
            direction={{
              sm: 'column',
              md: 'row',
            }}
            spacing={1}
          >
            <Box>1</Box>
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
        </Fragment>
      ))}
    </div>
  );
}
