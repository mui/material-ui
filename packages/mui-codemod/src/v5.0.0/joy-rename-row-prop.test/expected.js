// the codemod should transform only Joy UI components;
import { List as JoyList } from '@mui/joy';
import JoyCard from '@mui/joy/Card';
import RadioGroup from '@mui/joy/RadioGroup';
import CustomComponent from 'components/Custom';

<div>
  <JoyCard orientation={"horizontal"} />
  <JoyList orientation={"horizontal"} />
  <RadioGroup orientation={"horizontal"} />
  <CustomComponent row />
</div>;
