import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import Sheet from '@mui/joy/Sheet';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Stack from '@mui/joy/Stack';
import { styled } from '@mui/joy/styles';

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export default function InteractiveStack() {
  const [direction, setDirection] = React.useState('row');
  const [justifyContent, setJustifyContent] = React.useState('center');
  const [alignItems, setAlignItems] = React.useState('center');
  const [spacing, setSpacing] = React.useState(2);

  const jsx = `
<Stack
  direction="${direction}"
  justifyContent="${justifyContent}"
  alignItems="${alignItems}"
  spacing={${spacing}}
>
`;

  return (
    <Stack sx={{ flexGrow: 1 }}>
      <Stack
        direction={direction}
        justifyContent={justifyContent}
        alignItems={alignItems}
        spacing={spacing}
        sx={{ height: 300, pt: 2, pb: 2 }}
      >
        {[0, 1, 2].map((value) => (
          <Item
            key={value}
            sx={{
              p: 2,
              pt: value + 1,
              pb: value + 1,
            }}
          >
            {`Item ${value + 1}`}
          </Item>
        ))}
      </Stack>
      <Sheet sx={{ p: 2, backgroundColor: 'background.level1' }}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <FormControl>
              <FormLabel sx={{ mb: 1.5 }}>direction</FormLabel>
              <RadioGroup
                orientation="horizontal"
                name="direction"
                aria-label="direction"
                value={direction}
                onChange={(event) => {
                  setDirection(event.target.value);
                }}
                sx={{ flexWrap: 'wrap', gap: 2, '--RadioGroup-gap': '0px' }}
              >
                <Radio label="row" value="row" />
                <Radio label="row-reverse" value="row-reverse" />
                <Radio label="column" value="column" />
                <Radio label="column-reverse" value="column-reverse" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl>
              <FormLabel sx={{ mb: 1.5 }}>alignItems</FormLabel>
              <RadioGroup
                orientation="horizontal"
                name="alignItems"
                aria-label="align items"
                value={alignItems}
                onChange={(event) => {
                  setAlignItems(event.target.value);
                }}
                sx={{ flexWrap: 'wrap', gap: 2, '--RadioGroup-gap': '0px' }}
              >
                <Radio label="flex-start" value="flex-start" />
                <Radio label="center" value="center" />
                <Radio label="flex-end" value="flex-end" />
                <Radio label="stretch" value="stretch" />
                <Radio label="baseline" value="baseline" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl>
              <FormLabel sx={{ mb: 1.5 }}>justifyContent</FormLabel>
              <RadioGroup
                orientation="horizontal"
                name="justifyContent"
                aria-label="justifyContent"
                value={justifyContent}
                onChange={(event) => {
                  setJustifyContent(event.target.value);
                }}
                sx={{ flexWrap: 'wrap', gap: 2, '--RadioGroup-gap': '0px' }}
              >
                <Radio label="flex-start" value="flex-start" />
                <Radio label="center" value="center" />
                <Radio label="flex-end" value="flex-end" />
                <Radio label="space-between" value="space-between" />
                <Radio label="space-around" value="space-around" />
                <Radio label="space-evenly" value="space-evenly" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl>
              <FormLabel sx={{ mb: 1.5 }}>spacing</FormLabel>
              <RadioGroup
                orientation="horizontal"
                name="spacing"
                aria-label="spacing"
                value={spacing.toString()}
                onChange={(event) => {
                  setSpacing(Number(event.target.value));
                }}
                sx={{ flexWrap: 'wrap', gap: 2, '--RadioGroup-gap': '0px' }}
              >
                {[0, 0.5, 1, 2, 3, 4, 8, 12].map((value) => (
                  <Radio
                    key={value}
                    label={value.toString()}
                    value={value.toString()}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Sheet>
      <BrandingProvider mode="dark">
        <HighlightedCode code={jsx} language="jsx" />
      </BrandingProvider>
    </Stack>
  );
}
