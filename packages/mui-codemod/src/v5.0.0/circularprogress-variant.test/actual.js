<div>
  <CircularProgress variant="static" classes={{ static: 'className' }} />
  {/* Should not throw */}
  <CircularProgress classes={ condition ? something : somethingelse }/>
</div>
