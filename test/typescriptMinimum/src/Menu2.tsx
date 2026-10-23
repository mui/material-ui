import * as React from 'react';
import Button from '@mui/material/Button';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';

export default function Menu2Consumer() {
  return (
    <Menu2
      trigger={<Button>Project actions</Button>}
      modal={false}
      ref={React.createRef<HTMLDivElement>()}
      slotProps={{ paper: { sx: { minWidth: 200 } } }}
      onOpenChange={(open, eventDetails) => {
        open satisfies boolean;
        // @ts-expect-error The open state is a boolean.
        open satisfies string;
        eventDetails.cancel();
      }}
    >
      <Menu2Group>
        <Menu2GroupLabel>Projects</Menu2GroupLabel>
        <Menu2Item>Open project</Menu2Item>
        <Menu2LinkItem href="/projects" ref={React.createRef<HTMLAnchorElement>()}>
          All projects
        </Menu2LinkItem>
        <Menu2CheckboxItem
          defaultChecked
          onCheckedChange={(checked, eventDetails) => {
            checked satisfies boolean;
            eventDetails.cancel();
          }}
        >
          Show archived
        </Menu2CheckboxItem>
        <Menu2Separator />
        <Menu2Submenu trigger={<Menu2SubmenuTrigger>View</Menu2SubmenuTrigger>}>
          <Menu2RadioGroup defaultValue="list">
            <Menu2RadioItem value="list">List</Menu2RadioItem>
            <Menu2RadioItem value="grid">Grid</Menu2RadioItem>
          </Menu2RadioGroup>
        </Menu2Submenu>
      </Menu2Group>
    </Menu2>
  );
}

<Menu2Trigger
  ref={(node) => {
    node satisfies HTMLElement | null;
    // @ts-expect-error The trigger ref does not point to an SVG element.
    node satisfies SVGElement | null;
  }}
>
  <Button>Project actions</Button>
</Menu2Trigger>;

// @ts-expect-error A trigger wraps one element.
<Menu2Trigger>Project actions</Menu2Trigger>;

// @ts-expect-error Detached triggers are not part of the Menu2 API.
<Menu2 handle={{}} />;

// @ts-expect-error Trigger payloads are not part of the Menu2 API.
<Menu2Trigger payload={{ id: 1 }}>
  <Button>Project actions</Button>
</Menu2Trigger>;

// @ts-expect-error Menu2 children are nodes, not a payload callback.
<Menu2>{() => <Menu2Item>Open project</Menu2Item>}</Menu2>;
