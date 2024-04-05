// copied from @mui/system/createStyled
function slotShouldForwardProp(prop: string) {
  return prop !== 'ownerState' && prop !== 'theme';
}

export default slotShouldForwardProp;
