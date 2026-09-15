require('../../../scripts/testModuleAugmentation')
  .main(['@mui/material'])
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
