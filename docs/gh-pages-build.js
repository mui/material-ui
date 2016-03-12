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
 * Build the docs site on a detached branch, commit it on gh-pages branch.
 */
function buildDocs() {
  // Ensure we're starting in the docs dir
  process.chdir(__dirname);

  // Checkout the tag 'version'
  execho('git checkout gh-pages');

  // Delete last HEAD commit to keep the history clean
  if (lastCommitIsHead()) {
    execho('git reset --hard HEAD~1');
  }

  // Checkout the tag 'version'
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

  // Symbolic link 'release' to latest version
  if (!preRelease(version)) {
    execho('ln -sfh ../' + version + ' ../release');
  }

  // Commit the new version
  execho('git add .. && git commit -m \'' + version + '\'');

  if (args[3] === '-p') {
    execho('git push -f');
  }
}

/**
 * Add new version number to versions.js
 * The checks for HEAD can be removed once HEAD builds are automated, as the first entry will always be HEAD.
 */
function addMenuVersion(version) {
  // Return to master
  execho('git checkout master');

  var versions = JSON.parse(fs.readFileSync(versionsFile, 'utf8'));
  var head;

  // If HEAD is first in the array, shift it off.
  if (versions[0] === 'HEAD') {
    head = versions.shift()
  }

  // Add the new version
  versions.unshift(version);

  // If the array had a HEAD version, and we didn't just add one, put it back.
  if (head && version !== 'HEAD') {
    versions.unshift('HEAD');
  }

  fs.writeFileSync(versionsFile, JSON.stringify(versions, null, 2));

  // If we're adding a new version, or first instance of 'HEAD', commit it (on master branch)
  if (version !=='HEAD' || (version === 'HEAD' && !head)) {
    execho('git add ' + versionsFile + ' && git commit -m ' + '\'Add ' + version + ' to versions.json\'');
  }
}

buildDocs(version);
addMenuVersion(version);
