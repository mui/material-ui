import * as React from 'react';
import Button from '@mui/material/Button';
import Menu2, { createHandle } from '@mui/material/Unstable_Menu2';
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

interface Project {
  id: number;
  name: string;
}

const handle = createHandle<Project>();

export default function Menu2Consumer() {
  return (
    <React.Fragment>
      <Menu2Trigger
        handle={handle}
        payload={{ id: 1, name: 'Website' }}
        ref={(node) => {
          node satisfies HTMLElement | null;
          // @ts-expect-error The trigger ref does not point to an SVG element.
          node satisfies SVGElement | null;
        }}
      >
        <Button>Project actions</Button>
      </Menu2Trigger>
      <Menu2Trigger handle={handle}>
        <Button>No payload</Button>
      </Menu2Trigger>
      <Menu2
        handle={handle}
        modal={false}
        ref={React.createRef<HTMLDivElement>()}
        slotProps={{ paper: { sx: { minWidth: 200 } } }}
      >
        {({ payload }) => {
          payload satisfies Project | undefined;
          // @ts-expect-error A trigger can omit its payload.
          payload satisfies Project;
          // @ts-expect-error The handle gives the payload a numeric ID.
          payload?.id satisfies string | undefined;

          return (
            <Menu2Group>
              <Menu2GroupLabel>{payload?.name ?? 'Projects'}</Menu2GroupLabel>
              <Menu2Item onClick={() => payload?.id.toFixed()}>Open project</Menu2Item>
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
          );
        }}
      </Menu2>
    </React.Fragment>
  );
}

// @ts-expect-error The payload must match the handle type without an explicit JSX type argument.
<Menu2Trigger handle={handle} payload="Website">
  <Button>Invalid payload</Button>
</Menu2Trigger>;

// @ts-expect-error The payload must contain all required project fields.
<Menu2Trigger handle={handle} payload={{ id: 1 }}>
  <Button>Incomplete payload</Button>
</Menu2Trigger>;
