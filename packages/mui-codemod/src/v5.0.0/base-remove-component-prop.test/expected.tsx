// @ts-nocheck
<Input component={CustomRoot} />;

<InputUnstyled<typeof CustomRoot> slots={{
  root: CustomRoot
}} />;

<InputUnstyled<typeof CustomRoot> slots={{
  root: CustomRoot
}}></InputUnstyled>;

<SwitchUnstyled<typeof CustomRoot>
  slots={{
    root: CustomRoot
  }}
  randomProp="1"
  randomProp2="2"
  randomProp3="3"
  slotProps={{ root: { className: 'root' } }}
/>;

<BadgeUnstyled<typeof CustomRoot>
  slots={{
    root: CustomRoot,
    badge: CustomBadge
  }}
  randomProp="1"
  randomProp2="2"
  randomProp3="3"
  slotProps={{ badge: { className: 'badge' } }} />;

<InputUnstyled<'a'> slots={{
  root: 'a'
}} href='url'></InputUnstyled>;
