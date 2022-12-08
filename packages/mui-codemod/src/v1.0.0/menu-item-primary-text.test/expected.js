<div>
  <MenuItem
    onClick={() => {
      analytics('Clicked Menu > Progress');
    }}
    rightIcon={<ProgressIcon />}>My Progress</MenuItem>
  <MenuItem
    onClick={() => {
      analytics('Clicked Menu > Progress2');
    }}
    rightIcon={<ProgressIcon />}>{true ? "My Progress" : "Not progress"}</MenuItem>
  <MenuItem
    onClick={() => {
      analytics('Clicked Menu > Progress2');
    }}
    rightIcon={<ProgressIcon />}>{getText('progress')}</MenuItem>
  <MenuItem
    onClick={() => {
      analytics('Clicked Menu > Progress');
    }}
    rightIcon={<ProgressIcon />}
  >
    Already changed
  </MenuItem>
</div>