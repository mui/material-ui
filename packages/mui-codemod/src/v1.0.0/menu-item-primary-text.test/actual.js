<div>
  <MenuItem
    onClick={() => {
      analytics('Clicked Menu > Progress');
    }}
    primaryText="My Progress"
    rightIcon={<ProgressIcon />}
  />
  <MenuItem
    onClick={() => {
      analytics('Clicked Menu > Progress2');
    }}
    primaryText={true ? "My Progress" : "Not progress"}
    rightIcon={<ProgressIcon />}
  />
  <MenuItem
    onClick={() => {
      analytics('Clicked Menu > Progress2');
    }}
    primaryText={getText('progress')}
    rightIcon={<ProgressIcon />}
  />
  <MenuItem
    onClick={() => {
      analytics('Clicked Menu > Progress');
    }}
    rightIcon={<ProgressIcon />}
  >
    Already changed
  </MenuItem>
</div>