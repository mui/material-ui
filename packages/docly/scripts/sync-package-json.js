const fs = require('fs');
const path = require('path');
const mui = require('../../material-ui/package.json');
const our = require('../package.json');

const log = console.log;

// keep an original for later comparison
const before = JSON.stringify(our);

const sections = ['dependencies', 'peerDependencies', 'devDependencies'];

log('\n\n\nsyncing package.json with material-ui …\n');
sections.forEach(section => {
  if (!mui[section]) {
    return;
  }
  if (!our[section]) {
    our[section] = {};
  }
  const changes = [];

  Object.keys(mui[section]).forEach(dep => {
    const ours = our[section][dep];
    const their = mui[section][dep];

    if (ours !== their) {
      const msg = !ours ? `++  ${dep}: ${their}` : `—>  ${dep}: ${ours} >> ${their}`;
      changes.push(msg);

      // make modification
      // todo: if our dep is newer, should we ignore?
      our[section][dep] = their;
    }
  });

  // double-check for dependencies that are included in our package.json
  // but doesn't exist in (or have been removed from) material-ui:
  Object.keys(our[section]).forEach(dep => {
    const ours = our[section][dep];
    const their = mui[section][dep];
    if (!their) {
      changes.push(`!!  ${dep}: ${ours} (not part of material-ui)`);
    }
  });

  if (changes.length) {
    log(section);
    log('----------------------------------------');
    log(changes.join('\n'));
  }
});

if (JSON.stringify(our) !== before) {
  log('\nDetected changes … \nsaving package.json\n');
  fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(our, null, 2));
} else {
  log('\nNo changes were detected. Carry on.\n');
}
