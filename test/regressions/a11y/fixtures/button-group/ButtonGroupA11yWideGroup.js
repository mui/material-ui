import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// A horizontal group with more buttons than fit at 320 CSS px. The group does
// not wrap its buttons, so the page scrolls horizontally. The screenshot at
// 320 px records this author concern (1.4.10); see ButtonGroup/accessibility.md.
export default function ButtonGroupA11yWideGroup() {
  return (
    <ButtonGroup aria-label="Message actions">
      <Button>Reply to all</Button>
      <Button>Forward message</Button>
      <Button>Mark as unread</Button>
      <Button>Move to archive</Button>
      <Button>Report spam</Button>
    </ButtonGroup>
  );
}
