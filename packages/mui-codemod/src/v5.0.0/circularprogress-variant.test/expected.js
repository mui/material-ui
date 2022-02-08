<div>
  <CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
  {/* Should not throw */}
  <CircularProgress classes={ condition ? something : somethingelse }/>
</div>
