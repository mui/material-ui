import * as React from 'react';
import { expect } from 'chai';
import { stub, spy } from 'sinon';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import Rating, { ratingClasses as classes } from '@mui/material/Rating';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<Rating />', () => {
  const { render } = createRenderer();

  describeConformance(<Rating />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    muiName: 'MuiRating',
    testVariantProps: { variant: 'foo' },
    testDeepOverrides: { slotName: 'label', slotClassName: classes.label },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render', () => {
    const { container } = render(<Rating />);

    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should round the value to the provided precision', () => {
    const { container } = render(<Rating name="rating-test" value={3.9} precision={0.2} />);

    expect(container.querySelector('input[name="rating-test"]:checked')).to.have.property(
      'value',
      '4',
    );
  });

  it('should handle mouse hover correctly', () => {
    const { container } = render(<Rating />);
    stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
      left: 0,
      right: 100,
      width: 100,
    }));
    fireEvent.mouseMove(container.firstChild, {
      clientX: 19,
    });
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(1);
    fireEvent.mouseMove(container.firstChild, {
      clientX: 21,
    });
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(2);
  });

  it('should handle mouse hover correctly for icons with spacing', () => {
    const { container } = render(
      <Rating
        sx={{
          [`.${classes.decimal}`]: { marginRight: 2 },
        }}
        precision={0.5}
      />,
    );
    stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
      left: 0,
      right: 200,
      width: 200,
    }));

    fireEvent.mouseMove(container.firstChild, {
      clientX: 19,
    });
    // half star highlighted
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(1);

    fireEvent.mouseMove(container.firstChild, {
      clientX: 21,
    });
    // one full star highlighted
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(2);

    fireEvent.mouseMove(container.firstChild, {
      clientX: 39,
    });
    // Still one star remains highlighted as the total item width (40px) has not been reached yet, considering 24px for the icon width and 16px for margin-right.
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(2);

    fireEvent.mouseMove(container.firstChild, {
      clientX: 41,
    });
    // one and half star highlighted
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(3);

    fireEvent.mouseMove(container.firstChild, {
      clientX: 60,
    });
    // two full stars highlighted
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(4);
  });

  it('should clear the rating', () => {
    const handleChange = spy();
    const { container } = render(<Rating name="rating-test" onChange={handleChange} value={2} />);

    fireEvent.click(container.querySelector('input[name="rating-test"][value="2"]'), {
      clientX: 1,
    });

    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.deep.equal(null);
  });

  it('should select the rating', () => {
    const handleChange = spy();
    const { container } = render(<Rating name="rating-test" onChange={handleChange} value={2} />);
    fireEvent.click(container.querySelector('input[name="rating-test"][value="3"]'));
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.deep.equal(3);
    const checked = container.querySelector('input[name="rating-test"]:checked');
    expect(checked.value).to.equal('2');
  });

  it('should change the value to null', () => {
    const handleChange = spy();
    render(<Rating name="rating-test" onChange={handleChange} value={2} />);
    fireEvent.click(document.querySelector('#rating-test-empty'));
    expect(handleChange.args[0][1]).to.equal(null);
  });

  it('should select the empty input if value is null', () => {
    const { container } = render(<Rating name="rating-test" value={null} />);
    const input = container.querySelector('#rating-test-empty');
    const checked = container.querySelector('input[name="rating-test"]:checked');
    expect(input).to.equal(checked);
    expect(input.value).to.equal('');
  });

  it('should support a defaultValue', () => {
    const { container } = render(<Rating defaultValue={3} name="rating-test" />);
    let checked;
    checked = container.querySelector('input[name="rating-test"]:checked');
    expect(checked.value).to.equal('3');

    fireEvent.click(container.querySelector('input[name="rating-test"][value="2"]'));
    checked = container.querySelector('input[name="rating-test"]:checked');
    expect(checked.value).to.equal('2');
  });

  it('has a customization point for the label of the empty value when it is active', () => {
    const { container } = render(
      <Rating classes={{ labelEmptyValueActive: 'customized' }} name="" value={null} />,
    );

    expect(container.querySelector('.customized')).to.equal(null);

    act(() => {
      const noValueRadio = screen.getAllByRole('radio').find((radio) => {
        return radio.checked;
      });

      noValueRadio.focus();
    });

    expect(container.querySelector('.customized')).to.have.tagName('label');
  });

  it('should apply labelEmptyValueActive styles from theme', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const theme = createTheme({
      components: {
        MuiRating: {
          styleOverrides: {
            labelEmptyValueActive: {
              height: '120px',
            },
          },
        },
      },
    });
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Rating value={null} />
      </ThemeProvider>,
    );

    act(() => {
      const noValueRadio = screen.getAllByRole('radio').find((radio) => {
        return radio.checked;
      });

      noValueRadio.focus();
    });

    expect(container.querySelector(`.${classes.labelEmptyValueActive}`)).toHaveComputedStyle({
      height: '120px',
    });
  });

  // Internal test that only applies if Rating is implemented using `input[type"radio"]`
  // It ensures that keyboard navigation for Arrow and TAB keys is handled by the browser
  it('should ensure a `name`', () => {
    render(<Rating value={null} />);

    const [arbitraryRadio, ...radios] = document.querySelectorAll('input[type="radio"]');
    // `name` **property** will always be a string even if the **attribute** is omitted
    expect(arbitraryRadio.name).not.to.equal('');
    // all input[type="radio"] have the same name
    expect(new Set(radios.map((radio) => radio.name))).to.have.length(1);
  });

  describe('prop: readOnly', () => {
    it('renders a role="img"', () => {
      render(<Rating readOnly value={2} />);

      expect(screen.getByRole('img')).toHaveAccessibleName('2 Stars');
    });

    it('can be labelled with getLabelText', () => {
      render(<Rating getLabelText={(value) => `Stars: ${value}`} readOnly value={2} />);

      expect(screen.getByRole('img')).toHaveAccessibleName('Stars: 2');
    });

    it('should have a correct label when no value is set', () => {
      render(<Rating readOnly />);

      expect(screen.getByRole('img')).toHaveAccessibleName('0 Stars');
    });

    it('should have readOnly class applied', () => {
      render(<Rating readOnly value={2} />);

      expect(screen.getByRole('img')).to.have.class(classes.readOnly);
    });
  });

  describe('<form> integration', () => {
    before(function beforeHook() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // JSDOM has issues with form validation for certain elements.
        // We could address them individually but that doesn't add much value if we already have a working environment.
        this.skip();
      }
    });

    [
      {
        ratingProps: { name: 'rating', defaultValue: 2 },
        formData: [['rating', '2']],
      },
      {
        ratingProps: { name: 'rating', defaultValue: 2, disabled: true },
        formData: [],
      },
      {
        ratingProps: { name: 'rating', defaultValue: 2, readOnly: true },
        // native <input type="radio" /> and our Radio/Checkbox don't implement readOnly as well
        formData: [],
      },
      {
        ratingProps: { name: 'rating', required: true },
        // FIXME: `Rating` does not implement `required`.
        //        Native <input type="radio" /> would not pass validation
        // formData: undefined,
        formData: [['rating', '']],
      },
    ].forEach((testData, testNumber) => {
      it(`submits the expected form data #${testNumber + 1}`, () => {
        /**
         * @type FormData
         */
        let data;
        const handleSubmit = spy((event) => {
          // Prevent navigation
          event.preventDefault();
          // populate FormData with the submitted form
          data = new FormData(event.target);
        });
        render(
          <form onSubmit={handleSubmit}>
            <Rating {...testData.ratingProps} />
            <button type="submit" />
          </form>,
        );
        const submitter = document.querySelector('button[type="submit"]');

        act(() => {
          // form.submit() would not run form validation
          submitter.click();
        });

        if (testData.formData === undefined) {
          expect(handleSubmit.callCount).to.equal(0);
        } else {
          expect(Array.from(data.entries())).to.deep.equal(testData.formData);
        }
      });
    });
  });
});
