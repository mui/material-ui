import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Stack from '@mui/joy/Stack';
import { styled } from '@mui/joy/styles';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import { BrandingProvider } from '@mui/docs/branding';

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography['body-sm'],
  textAlign: 'center',
  fontWeight: theme.fontWeight.md,
  color: theme.vars.palette.text.secondary,
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.radius.md,
}));

export default function InteractiveStack() {
  const [direction, setDirection] = React.useState('row');
  const [justifyContent, setJustifyContent] = React.useState('center');
  const [alignItems, setAlignItems] = React.useState('center');
  const [spacing, setSpacing] = React.useState(2);

  const jsx = `
<Stack
  direction="${direction}"
  spacing={${spacing}}
  sx={{
    justifyContent: "${justifyContent}",
    alignItems: "${alignItems}",
  }}
>
`;

  return (
    <Stack sx={{ flexGrow: 1, '* pre': { mb: 0 } }}>
      <Stack
        direction={direction}
        spacing={spacing}
        sx={{ justifyContent, alignItems, minHeight: 200, pb: 3 }}
      >
        {[0, 1, 2].map((value) => (
          <Item key={value} sx={{ p: 2, pt: value + 1, pb: value + 1 }}>
            {`Item ${value + 1}`}
          </Item>
        ))}
      </Stack>
      <Sheet
        variant="outlined"
        sx={(theme) => ({
          p: 2,
          borderRadius: 'md',
          bgcolor: theme.palette.neutral[50],
          borderColor: theme.palette.neutral[100],
          [theme.getColorSchemeSelector('dark')]: {
            borderColor: theme.palette.neutral[800],
            backgroundColor: theme.palette.neutral[900],
          },
        })}
      >
        <Grid container spacing={3}>
          <Grid size={12}>
            <FormControl>
              <FormLabel sx={{ mb: 0.5 }}>direction</FormLabel>
              <RadioGroup
                size="sm"
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
          <Grid size={12}>
            <FormControl>
              <FormLabel sx={{ mb: 0.5 }}>alignItems</FormLabel>
              <RadioGroup
                size="sm"
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
          <Grid size={12}>
            <FormControl>
              <FormLabel sx={{ mb: 0.5 }}>justifyContent</FormLabel>
              <RadioGroup
                size="sm"
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
          <Grid size={12}>
            <FormControl>
              <FormLabel sx={{ mb: 0.5 }}>spacing</FormLabel>
              <RadioGroup
                size="sm"
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
