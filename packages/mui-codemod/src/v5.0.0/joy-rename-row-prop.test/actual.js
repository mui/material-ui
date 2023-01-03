// the codemod should transform only Joy UI components;
import { List as JoyList } from '@mui/joy';
import JoyCard from '@mui/joy/Card';
import RadioGroup from '@mui/joy/RadioGroup';
import CustomComponent from 'components/Custom';

<div>
  <JoyCard row />
  <JoyList row />
  <RadioGroup row={true} />
  <CustomComponent row />
</div>;
