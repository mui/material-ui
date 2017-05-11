// @flow weak
/**
 * Commented out temporarily as this is kicking up
 * on travis with very strange output -- needs debugging
 */

// import React from 'react';
// import TimeWaster from './fixtures/perf/TimeWaster';
// import {assert} from 'chai';
// import {createMount} from 'test/utils';
// import Button from 'src/Button';

// describe('Button Perf', () => {
//   let mount;

//   before(() => mount = createMount());
//   after(() => mount.cleanUp());

//   it('TouchRipple should not waste rendering time', function() {
//     this.timeout(10000);
//     return new Promise((resolve) => {
//       mount(
//         <TimeWaster onComplete={(summary) => resolve(summary)}>
//           <Button>Hello World</Button>
//         </TimeWaster>
//       );
//     })
//     .then((summary) => {
//       ['TouchRipple'].forEach((component) => {
//         assert.strictEqual(summary.hasWastedTime(component), false, 'should not waste time');
//       });
//     });
//   });
// });
