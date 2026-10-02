import PropTypes from 'prop-types';
import { describe, expect, it } from 'vitest';
import Menu2 from './Menu2';
import Menu2Popup from './Menu2Popup';
import Menu2SubmenuPopup from './Menu2SubmenuPopup';
import Menu2Submenu from '../Unstable_Menu2Submenu';
import Menu2CheckboxItem from '../Unstable_Menu2CheckboxItem';
import Menu2RadioGroup from '../Unstable_Menu2RadioGroup';

const popupProps = [
  'align',
  'alignOffset',
  'anchor',
  'classes',
  'className',
  'collisionAvoidance',
  'collisionBoundary',
  'collisionPadding',
  'container',
  'disableAnchorTracking',
  'elevation',
  'finalFocus',
  'keepMounted',
  'positionMethod',
  'side',
  'sideOffset',
  'sticky',
  'style',
  'sx',
  'transitionDuration',
];

describe('Menu2 selection callback prop validation', () => {
  [
    { Component: Menu2CheckboxItem, name: 'Menu2CheckboxItem', prop: 'onCheckedChange' },
    { Component: Menu2RadioGroup, name: 'Menu2RadioGroup', prop: 'onValueChange' },
  ].forEach(({ Component, name, prop }) => {
    it(`validates ${name}.${prop}`, () => {
      expect(Component.propTypes).to.have.property(prop);
      expect(Component.propTypes).not.to.have.property('onChange');

      PropTypes.resetWarningCache();
      expect(() =>
        PropTypes.checkPropTypes(Component.propTypes, { [prop]: () => {} }, 'prop', name),
      ).not.toErrorDev();
      expect(() =>
        PropTypes.checkPropTypes(Component.propTypes, { [prop]: 42 }, 'prop', name),
      ).toErrorDev(`Invalid prop \`${prop}\` of type \`number\` supplied to \`${name}\``);
    });
  });
});

describe('Menu2 public popup prop validation', () => {
  it('does not define duplicate validators on the private popup components', () => {
    expect(Menu2Popup).not.to.have.property('propTypes');
    expect(Menu2SubmenuPopup).not.to.have.property('propTypes');
  });

  [
    { Component: Menu2, name: 'Menu2' },
    { Component: Menu2Submenu, name: 'Menu2Submenu' },
  ].forEach(({ Component, name }) => {
    function checkProps(props: Record<string, unknown>) {
      PropTypes.resetWarningCache();
      // Check directly because React 19 does not validate propTypes on render.
      PropTypes.checkPropTypes(Component.propTypes, props, 'prop', name);
    }

    describe(`${name}`, () => {
      it('declares the popup validators on the public component', () => {
        expect(Component.propTypes).to.include.all.keys(popupProps);
        expect(Component.propTypes).not.to.have.property('arrowPadding');
        expect(Component.propTypes).not.to.have.property('backdrop');
      });

      if (Component === Menu2) {
        it('accepts a null backdrop slot', () => {
          expect(() => checkProps({ slots: { backdrop: null } })).not.toErrorDev();
        });
      }

      it('validates the current slot and slot-prop names', () => {
        const slots = ['root', 'paper', 'list', 'transition'];
        if (Component === Menu2) {
          slots.push('backdrop');
        }
        slots.forEach((slot) => {
          expect(() => checkProps({ slots: { [slot]: 42 } })).toErrorDev(`supplied to \`${name}\``);
          expect(() => checkProps({ slotProps: { [slot]: 42 } })).toErrorDev(
            `supplied to \`${name}\``,
          );
          expect(() => checkProps({ slotProps: { [slot]: {} } })).not.toErrorDev();
          expect(() => checkProps({ slotProps: { [slot]: () => ({}) } })).not.toErrorDev();
        });
      });

      it('does not retain validators for removed slot names', () => {
        // shape ignores unknown keys. Old validators would reject these values.
        const removedSlots = { popup: 42, portal: 42, positioner: 42 };
        expect(() => checkProps({ slots: removedSlots, slotProps: removedSlots })).not.toErrorDev();
      });

      it('accepts the public alignment, elevation, and transition duration values', () => {
        expect(() =>
          checkProps({ align: 'end', elevation: 8, transitionDuration: 'auto' }),
        ).not.toErrorDev();
        expect(() => checkProps({ transitionDuration: 200 })).not.toErrorDev();
        expect(() =>
          checkProps({ transitionDuration: { enter: 200, exit: 100 } }),
        ).not.toErrorDev();
      });

      it('reports invalid popup values with the public component name', () => {
        expect(() => checkProps({ align: 'middle' })).toErrorDev(
          `Invalid prop \`align\` of value \`middle\` supplied to \`${name}\``,
        );
        expect(() => checkProps({ elevation: 'high' })).toErrorDev(
          `Invalid prop \`elevation\` of type \`string\` supplied to \`${name}\``,
        );
        expect(() => checkProps({ transitionDuration: 'fast' })).toErrorDev(
          `Invalid prop \`transitionDuration\` supplied to \`${name}\``,
        );
      });

      it('accepts DOM elements, refs, callbacks, and virtual anchors', () => {
        const element = document.createElement('button');
        const virtualAnchor = { getBoundingClientRect: () => element.getBoundingClientRect() };
        [
          element,
          { current: element },
          () => element,
          virtualAnchor,
          () => virtualAnchor,
          null,
          undefined,
        ].forEach((anchor) => {
          expect(() => checkProps({ anchor })).not.toErrorDev();
        });
      });

      it('accepts DOM elements, arrays, and rectangles as collision boundaries', () => {
        const element = document.createElement('div');
        [
          'clipping-ancestors',
          element,
          [element, document.createElement('div')],
          { x: 0, y: 0, width: 300, height: 200 },
          null,
          undefined,
        ].forEach((collisionBoundary) => {
          expect(() => checkProps({ collisionBoundary })).not.toErrorDev();
        });
      });

      it('accepts DOM and shadow-root containers, refs, and legacy callbacks', () => {
        const element = document.createElement('div');
        const shadowRoot = element.attachShadow({ mode: 'open' });
        [
          element,
          shadowRoot,
          { current: element },
          { current: shadowRoot },
          { current: null },
          () => element,
          null,
          undefined,
        ].forEach((container) => {
          expect(() => checkProps({ container })).not.toErrorDev();
        });
      });

      it('accepts final-focus flags, DOM refs, and callbacks', () => {
        const element = document.createElement('button');
        [
          true,
          false,
          { current: element },
          { current: null },
          () => element,
          () => false,
          null,
          undefined,
        ].forEach((finalFocus) => {
          expect(() => checkProps({ finalFocus })).not.toErrorDev();
        });
      });

      it('rejects invalid primitives for the DOM and positioning props', () => {
        ['anchor', 'collisionBoundary', 'container', 'finalFocus'].forEach((prop) => {
          [42, 'invalid'].forEach((value) => {
            expect(() => checkProps({ [prop]: value })).toErrorDev(
              `Invalid prop \`${prop}\` supplied to \`${name}\``,
            );
          });
        });
      });
    });
  });
});
