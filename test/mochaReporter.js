const mocha = require('mocha');
const Junit = require('mocha-junit-reporter');

const Base = mocha.reporters.Base;
const Dot = mocha.reporters.Dot;

class CiReporter extends Base {
  constructor(runner, options) {
    super(runner, options);
    this.dotReporter = new Dot(runner, options);
    if (options.reporterOption.mochaFile) {
      this.junitReporter = new Junit(runner, options);
    }
  }
}

module.exports = CiReporter;
