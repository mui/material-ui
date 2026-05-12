import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function DelayTooltips() {
  // @focus-start @padding 1
  return (
    <Tooltip describeChild title="Add" enterDelay={500} leaveDelay={200}>
      <Button>[500ms, 200ms]</Button>
    </Tooltip>
  );
  // @focus-end
}
