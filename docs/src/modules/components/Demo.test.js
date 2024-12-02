const { expect } = require('chai');
const { createRenderer,test } = require('@mui/internal-test-utils');
import Demo from './Demo'

describe('Function execution time test', function () {
  this.timeout(15000); // Ensure that Mocha itself does not end tests due to the default timeout.
  const { render } = createRenderer();
  var str = "";
  for (var i = 0; i < 1000000; i++) {
  str += ".";
  }
  str += "\n@.ts";

  it('should complete within 10 seconds', async function () {
    const start = Date.now();
      try {
        expect(() => {
          render(
            <Demo
            mode={""}
            demo={""}
            disableAd={""}
            demoOptions={{
              hideToolbar: "a",
              demo: str,
              defaultCodeOpen: false,
              disableAd: false,
            }}
            githubLocation={""}
          />
          );
        }).toErrorDev('Any errors do not affect a DoS attack; only time is crucial.');
      } catch (error) { }
      const end = Date.now();
      const duration = (end - start) / 1000; // turn to seconds
      expect(duration).to.be.lessThan(10);
    });
});
