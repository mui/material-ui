import { assert } from 'chai';
import responsiveProperty from './responsiveProperty';

describe('responsiveProperty', () => {
  describe('when providing two breakpoints and pixel units', () => {
    it('should respond with three styles in pixels', () => {
      const result = responsiveProperty({
        cssProperty: 'fontSize',
        min: 15,
        max: 20,
        unit: 'px',
        breakpoints: [300, 600],
      });

      assert.deepEqual(result, {
        fontSize: '15px',
        '@media (min-width:300px)': {
          fontSize: '17.5px',
        },
        '@media (min-width:600px)': {
          fontSize: '20px',
        },
      });
    });
  });

  describe('when providing one breakpoint and requesting rem units', () => {
    it('should respond with two styles in rem', () => {
      const result = responsiveProperty({
        cssProperty: 'fontSize',
        min: 0.875,
        max: 1,
        unit: 'rem',
        breakpoints: [500],
      });

      assert.deepEqual(result, {
        fontSize: '0.875rem',
        '@media (min-width:500px)': {
          fontSize: '1rem',
        },
      });
    });
  });
});
