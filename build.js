'use strict';

const fs = require('fs');
const JSONStream = require('JSONStream');
const es = require('event-stream');

fs.createReadStream('build.json')
  .pipe(JSONStream.parse([true]))
  .pipe(es.map((data, cb) => {
    fixDangles(data, () => cb(null, data));
  }));

function fixDangles(data, cb) {
  if (!data.errorCount) {
    return cb(null, data);
  }
  fs.readFile(data.filePath, 'utf8', function(err, contents) {
    console.log('Found dangles in', data.filePath);

    if (err) {
      return console.log(err);
    }

    let result = contents;
    data.messages.forEach((message) => {
      const current = getVar(message);
      result = result.replace(new RegExp(current, 'g'), current.substring(1));
    });

    fs.writeFile(data.filePath, result, 'utf8', function(err) {
      if (err) return console.log(err);
      return cb(null, data);
    });
  });
}

function getPosition(data) {
  return {
    line: data.line,
    column: data.column,
  };
}

function getVar(data) {
  const matches = data.message && data.message.match(/\'(_.[a-zA-Z]+)\'/);
  if (matches) {
    return matches[1];
  }

  return undefined;
}
