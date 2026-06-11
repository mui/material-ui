import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import countries from './countries';

const options = [...countries].sort(
  (a, b) => a.continent.localeCompare(b.continent) || a.label.localeCompare(b.label),
);

const Group = styled('li')(({ theme }) => ({
  '& + &': {
    marginTop: theme.spacing(0.5),
    paddingTop: theme.spacing(0.5),
    borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
  },
}));

const GroupHeader = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1.25, 2, 0.75),
  color: (theme.vars || theme).palette.text.secondary,
  fontWeight: theme.typography.fontWeightMedium,
}));

const GroupItems = styled('ul')({
  padding: 0,
});

export default function RenderGroup() {
  return (
    <Autocomplete
      options={options}
      groupBy={(option) => option.continent}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Choose a country" />}
      renderGroup={(params) => (
        <Group key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </Group>
      )}
    />
  );
}
