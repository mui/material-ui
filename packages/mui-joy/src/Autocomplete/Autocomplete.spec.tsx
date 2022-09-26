import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import Input from '@mui/joy/Input';

const top100Films = [{ title: 'The Shawshank Redemption', year: 1994 }];

<Autocomplete
  multiple
  options={[]}
  defaultValue={['a', 'b']}
  renderInput={(params) => <Input {...params} />}
/>;

<Autocomplete
  limitTags={2}
  options={top100Films}
  getOptionLabel={(option) => option.title}
  defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
  renderInput={(params) => <Input {...params} placeholder="Favorites" />}
  multiple
  sx={{ width: '500px' }}
/>;
