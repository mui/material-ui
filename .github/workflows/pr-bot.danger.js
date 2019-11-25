const { danger, markdown } = require('danger');

async function run() {
  markdown(`Reserving for summary`);
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
