<Input component={CustomRoot} />;

<InputUnstyled<typeof CustomRoot> slots={{ root: CustomRoot }} />;

<SwitchUnstyled<typeof CustomRoot>
  slots={{ root: CustomRoot }}
  slotProps={{ root: { className: 'root', randomProp: '1', randomProp2: '2', randomProp3: '3' } }}
/>;

<BadgeUnstyled<typeof CustomRoot>
  slots={{ root: CustomRoot, badge: CustomBadge }}
  slotProps={{
    root: { className: 'root', randomProp: '1', randomProp2: '2', randomProp3: '3' },
    badge: { className: 'badge' },
  }}
/>;

<InputUnstyled<'a'> slots={{ root: 'a' }} slotProps={{ root: { href: 'someUrl' } }} />;