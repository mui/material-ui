// @ts-nocheck
<Input component={CustomRoot} />;

<InputUnstyled component={CustomRoot} />;

<InputUnstyled component={CustomRoot}></InputUnstyled>;

<SwitchUnstyled
  component={CustomRoot}
  randomProp="1"
  randomProp2="2"
  randomProp3="3"
  slotProps={{ root: { className: 'root' } }}
/>;

<BadgeUnstyled
  component={CustomRoot}
  randomProp="1"
  randomProp2="2"
  randomProp3="3"
  slots={{ badge: CustomBadge }}
  slotProps={{ badge: { className: 'badge' } }}
/>;

<InputUnstyled component='a' href='url'></InputUnstyled>;
