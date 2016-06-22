#!/usr/local/bin/node
/**
 * Build a release for the gh-pages docs site.
 */

var fs = require('fs');
var execSync = require('child_process').execSync;

var usage = '\nbuild <vn.n.n[-pre[.n]]> | <HEAD> [-p]\n';
var versionsFile = './src/www/versions.json';

// Read the command-line args
var args = process.argv;

if (args.length < 3) {
  exit(usage);
}

var version = args[2];

// The regex isn't a perfect filter (it allows any component parts of a pre-release in the right order)
if (!version.match(/v\d{1,2}.\d{1,2}.\d{1,2}-?\w*\.?\d{0,2}/) && version !== 'HEAD') {
  exit(usage);
}

// Exit with a message
function exit(message) {
  console.log(message,'\n');
  process.exit();
}

// Exec with echo
function execho(command) {
  console.log(command);
  try {
    execSync(command, {stdio: 'inherit'});
  } catch (error) {
    console.error(error.output[1]);
    process.exit(error.status);
 }
}

// Exec with return value or error
function execReturn(command) {
  console.log(command);
  try {
    return execSync(command, {encoding: 'utf8'});
  } catch (error) {
    console.error(error.output[1]);
    process.exit(error.status);
  }
}

function preRelease(version) {
  return /-/.test(version) || version === 'HEAD';
}

function lastCommitIsHead() {
  // All the versions
  var log = execReturn('git log');

  // Get the version number of the current commit (line 5, strip leading whitespace and trailing text)
  var version = (log.split('\n')[4]+' ').replace(/\s*(\S*).*/, '$1');

  return version === 'HEAD';
}

/**
 * Add new version number to versions.js
 * The checks for HEAD can be removed once HEAD builds are automated, as the first entry will always be HEAD.
 */
function addMenuVersion(version) {
  var versions = JSON.parse(fs.readFileSync(versionsFile, 'utf8'));
  var position = 0;

  // If the first version in the array is HEAD, set the insert position to 1
  if (versions[0] === 'HEAD') {
    position = 1;
  }

  // If not a new HEAD version, splice it in, otherwise only add it if HEAD is not already present
  if (version !== 'HEAD' || (version === 'HEAD' && !position)) {
    versions.splice(position, 0, version);

    // Write the file
    fs.writeFileSync(versionsFile, JSON.stringify(versions, null, 2));

  // Commit it (on master branch)
    execho('git add ' + versionsFile + ' && git commit -m ' + '\'[Docs] Add ' + version + ' to versions.json\'');
  }
}

/**
 * Build the docs site on a detached branch, commit it on gh-pages branch.
 */
function buildDocs() {
  // Ensure we're starting in the docs dir
  process.chdir(__dirname);

  // Checkout the `gh-pages` branch and update from upstream
  execho('git checkout gh-pages && git pull upstream gh-pages');

  // Delete last HEAD commit to keep the history clean, unless we're committing a new HEAD version
  if (lastCommitIsHead() && version !== 'HEAD') {
    execho('git reset --hard HEAD~1');
  }

  // Checkout the tag `version` or master for HEAD
  if (version === 'HEAD') {
    execho('git checkout --detach master');
  } else {
    execho('git checkout tags/' + version);
  }

  // Build the docs site
  execho('npm install && npm run browser:build');

  // Version it
  execho('mv build ../' + version);

  // Move to the gh-pages branch
  execho('git checkout gh-pages');

  // Symbolic link `release` to latest version
  if (!preRelease(version)) {
    execho('ln -sfh ./' + version + ' ../release');
  }

  // Symbolic link `versions.json` to latest version
  execho('ln -sfh ./' + version + '/versions.json ../versions.json');

  // Commit the new version
  if (version === 'HEAD') {
    execho('git commit --amend --no-edit');
  } else {
    execho('git add .. && git commit -m \'' + version + '\'');
  }

  if (args[3] === '-p') {
    execho('git push -f');
  }
}

addMenuVersion(version);
buildDocs(version);
