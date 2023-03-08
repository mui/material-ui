<BadgeUnstyled
  slots={{ root: Root, badge: CustomBadge }}
  slotProps={{ root: { className: 'root' }, badge: { 'data-testid': 'badge' } }}
/>;

<InputUnstyled
  slots={{ input: CustomInput, root: CustomRoot }}
  slotProps={{ root: { className: 'root' }, input: { className: 'input' } }}
/>;

<Badge
  components={{ Root, Badge: CustomBadge }}
  componentsProps={{ root: { className: 'root' }, badge: { 'data-testid': 'badge' } }}
/>;
