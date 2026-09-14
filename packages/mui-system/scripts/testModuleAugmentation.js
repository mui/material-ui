require('../../../scripts/testModuleAugmentation')
  .main(['@mui/system'])
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
