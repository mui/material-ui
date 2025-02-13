// the codemod should transform only Joy UI components;
import { Alert as JoyAlert } from '@mui/joy';
import JoyAutocomplete from '@mui/joy/Autocomplete';
import CustomComponent from 'components/Custom';

<div>
  <JoyAlert
    slots={{ root: Root, input: CustomInput }}
    slotProps={{ root: { className: 'root' }, input: { 'data-testid': 'input' } }}
  />
  <JoyAutocomplete
    slots={{ root: Root, input: CustomInput }}
    slotProps={{ root: { className: 'root' }, input: { 'data-testid': 'input' } }}
  />
  <CustomComponent
    components={{ Root, Input: CustomInput }}
    componentsProps={{ root: { className: 'root' }, input: { 'data-testid': 'input' } }}
  />
</div>;
