import { expect } from 'chai';
import { createVariantStyle, isVariantPalette } from './variantUtils';

describe('variant utils', () => {
  it('isVariantPalette', () => {
    expect(
      isVariantPalette({
        100: '',
        200: '',
      }),
    ).to.equal(false);
    expect(
      isVariantPalette({
        textColor: '',
      }),
    ).to.equal(true);
    expect(
      isVariantPalette({
        lightBg: '',
      }),
    ).to.equal(true);
    expect(
      isVariantPalette({
        containedBg: '',
      }),
    ).to.equal(true);
  });

  describe('initial state', () => {
    it('[color] should create a variant', () => {
      expect(
        createVariantStyle('text', {
          textColor: 'var(--any-token)',
        }),
      ).to.deep.equal({
        color: 'var(--any-token)',
      });
    });

    it('[bg] should create a variant', () => {
      expect(
        createVariantStyle('light', {
          lightBg: 'var(--any-token)',
        }),
      ).to.deep.equal({
        backgroundColor: 'var(--any-token)',
      });
    });

    it('[border] should create a variant', () => {
      expect(
        createVariantStyle('outlined', {
          outlinedBorder: 'var(--any-token)',
        }),
      ).to.deep.equal({
        border: '1px solid',
        borderColor: 'var(--any-token)',
      });
    });
  });

  describe('hover state', () => {
    it('[color] should create a variant', () => {
      expect(
        createVariantStyle('textHover', {
          textHoverColor: 'var(--any-token)',
        }),
      ).to.deep.equal({
        cursor: 'pointer',
        '&:hover': {
          color: 'var(--any-token)',
        },
      });
    });

    it('[bg] should create a variant', () => {
      expect(
        createVariantStyle('lightHover', {
          lightHoverBg: 'var(--any-token)',
        }),
      ).to.deep.equal({
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--any-token)',
        },
      });
    });

    it('[border] should create a variant', () => {
      expect(
        createVariantStyle('outlinedHover', {
          outlinedHoverBorder: 'var(--any-token)',
        }),
      ).to.deep.equal({
        cursor: 'pointer',
        '&:hover': {
          border: '1px solid',
          borderColor: 'var(--any-token)',
        },
      });
    });
  });

  describe('active state', () => {
    it('[color] should create a variant', () => {
      expect(
        createVariantStyle('textActive', {
          textActiveColor: 'var(--any-token)',
        }),
      ).to.deep.equal({
        '&:active': {
          color: 'var(--any-token)',
        },
      });
    });

    it('[bg] should create a variant', () => {
      expect(
        createVariantStyle('lightActive', {
          lightActiveBg: 'var(--any-token)',
        }),
      ).to.deep.equal({
        '&:active': {
          backgroundColor: 'var(--any-token)',
        },
      });
    });

    it('[border] should create a variant', () => {
      expect(
        createVariantStyle('outlinedActive', {
          outlinedActiveBorder: 'var(--any-token)',
        }),
      ).to.deep.equal({
        '&:active': {
          border: '1px solid',
          borderColor: 'var(--any-token)',
        },
      });
    });
  });

  describe('disabled state', () => {
    it('[color] should create a variant', () => {
      expect(
        createVariantStyle('textDisabled', {
          textDisabledColor: 'var(--any-token)',
        }),
      ).to.deep.equal({
        '&.Mui-disabled': {
          color: 'var(--any-token)',
          pointerEvents: 'none',
          cursor: 'default',
        },
      });
    });

    it('[bg] should create a variant', () => {
      expect(
        createVariantStyle('lightDisabled', {
          lightDisabledBg: 'var(--any-token)',
        }),
      ).to.deep.equal({
        '&.Mui-disabled': {
          backgroundColor: 'var(--any-token)',
          pointerEvents: 'none',
          cursor: 'default',
        },
      });
    });

    it('[border] should create a variant', () => {
      expect(
        createVariantStyle('outlinedDisabled', {
          outlinedDisabledBorder: 'var(--any-token)',
        }),
      ).to.deep.equal({
        '&.Mui-disabled': {
          border: '1px solid',
          borderColor: 'var(--any-token)',
          pointerEvents: 'none',
          cursor: 'default',
        },
      });
    });
  });

  it('should create a variant with all states', () => {
    const vars = {
      outlinedColor: 'var(--any-token)',
      outlinedBorderColor: 'var(--any-token)',
      outlinedBg: 'var(--any-token)',
      outlinedHoverColor: 'var(--any-token)',
      outlinedHoverBorder: 'var(--any-token)',
      outlinedHoverBg: 'var(--any-token)',
      outlinedActiveColor: 'var(--any-token)',
      outlinedActiveBorder: 'var(--any-token)',
      outlinedActiveBg: 'var(--any-token)',
      outlinedDisabledColor: 'var(--any-token)',
      outlinedDisabledBorder: 'var(--any-token)',
      outlinedDisabledBg: 'var(--any-token)',
    };
    expect({
      outlined: {
        primary: createVariantStyle('outlined', vars),
      },
      outlinedHover: {
        primary: createVariantStyle('outlinedHover', vars),
      },
      outlinedActive: {
        primary: createVariantStyle('outlinedActive', vars),
      },
      outlinedDisabled: {
        primary: createVariantStyle('outlinedDisabled', vars),
      },
    }).to.deep.equal({
      outlined: {
        primary: {
          color: 'var(--any-token)',
          border: '1px solid',
          borderColor: 'var(--any-token)',
          backgroundColor: 'var(--any-token)',
        },
      },
      outlinedHover: {
        primary: {
          cursor: 'pointer',
          '&:hover': {
            color: 'var(--any-token)',
            border: '1px solid',
            borderColor: 'var(--any-token)',
            backgroundColor: 'var(--any-token)',
          },
        },
      },
      outlinedActive: {
        primary: {
          '&:active': {
            color: 'var(--any-token)',
            border: '1px solid',
            borderColor: 'var(--any-token)',
            backgroundColor: 'var(--any-token)',
          },
        },
      },
      outlinedDisabled: {
        primary: {
          '&.Mui-disabled': {
            color: 'var(--any-token)',
            border: '1px solid',
            borderColor: 'var(--any-token)',
            backgroundColor: 'var(--any-token)',
            pointerEvents: 'none',
            cursor: 'default',
          },
        },
      },
    });
  });

  it('should not include invalid value to variant', () => {
    expect(
      createVariantStyle('text', {
        textColor: 'var(--any-token)',
        textHoverColor: '',
        textActiveColor: null,
        textDisabledColor: undefined,
      }),
    ).to.deep.equal({
      color: 'var(--any-token)',
    });
  });

  it('create correct context color for text variant', () => {
    const vars = {
      textColor: 'var(--joy-variant-textColor)',
      textHoverColor: `var(--joy-variant-textHoverColor, var(--joy-variant-textColor))`,
      textHoverBg: 'var(--joy-variant-textHoverBg)',
      textActiveColor: 'var(--joy-variant-textActiveColor, var(--joy-variant-textHoverColor))',
      textDisabledColor: 'var(--joy-variant-textDisabledColor)',
    };
    expect(createVariantStyle('text', vars)).to.deep.equal({
      color: 'var(--joy-variant-textColor)',
    });
    expect(createVariantStyle('textHover', vars)).to.deep.equal({
      cursor: 'pointer',
      '&:hover': {
        color: 'var(--joy-variant-textHoverColor, var(--joy-variant-textColor))',
        backgroundColor: 'var(--joy-variant-textHoverBg)',
      },
    });
    expect(createVariantStyle('textActive', vars)).to.deep.equal({
      '&:active': {
        color: 'var(--joy-variant-textActiveColor, var(--joy-variant-textHoverColor))',
      },
    });
    expect(createVariantStyle('textDisabled', vars)).to.deep.equal({
      '&.Mui-disabled': {
        pointerEvents: 'none',
        cursor: 'default',
        color: 'var(--joy-variant-textDisabledColor)',
      },
    });
  });
});
