import * as React from 'react';
import Button from '@mui/material/Button';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';

interface Menu2A11yFixtureProps {
  nested?: boolean;
}

export function Menu2A11yFixture({ nested = false }: Menu2A11yFixtureProps) {
  const container = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={container} style={{ width: 700, height: 600 }}>
      <Menu2
        defaultOpen
        container={container}
        trigger={<Button>Document options</Button>}
        slotProps={{ paper: { 'data-testid': 'root-menu' } }}
      >
        <Menu2Group>
          <Menu2GroupLabel>Document</Menu2GroupLabel>
          <Menu2Item>Save</Menu2Item>
          <Menu2Item disabled>Print</Menu2Item>
          <Menu2LinkItem href="#help">Help</Menu2LinkItem>
        </Menu2Group>
        <Menu2Separator />
        <Menu2CheckboxItem defaultChecked>Show ruler</Menu2CheckboxItem>
        <Menu2CheckboxItem>Show grid</Menu2CheckboxItem>
        <Menu2CheckboxItem disabled>Track changes</Menu2CheckboxItem>
        <Menu2RadioGroup defaultValue="portrait" aria-label="Page orientation">
          <Menu2RadioItem value="portrait">Portrait</Menu2RadioItem>
          <Menu2RadioItem value="landscape">Landscape</Menu2RadioItem>
          <Menu2RadioItem value="automatic" disabled>
            Automatic
          </Menu2RadioItem>
        </Menu2RadioGroup>
        <Menu2Submenu
          defaultOpen={nested}
          container={container}
          trigger={<Menu2SubmenuTrigger>Export</Menu2SubmenuTrigger>}
          slotProps={{ paper: { 'data-testid': 'nested-menu' } }}
        >
          <Menu2Item>PDF document</Menu2Item>
          <Menu2Item disabled>Image</Menu2Item>
        </Menu2Submenu>
      </Menu2>
    </div>
  );
}

export default function Menu2A11yOpen() {
  return <Menu2A11yFixture />;
}
