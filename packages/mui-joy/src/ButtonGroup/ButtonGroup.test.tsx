import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { ThemeProvider } from '@mui/joy/styles';
import ButtonGroup, {
  buttonGroupClasses as classes,
  ButtonGroupClassKey,
} from '@mui/joy/ButtonGroup';
import Button, { buttonClasses, ButtonClassKey } from '@mui/joy/Button';
import IconButton, { iconButtonClasses, IconButtonClassKey } from '@mui/joy/IconButton';
import describeConformance from '../../test/describeConformance';

describe('<ButtonGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<ButtonGroup />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyButtonGroup',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'fieldset',
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: ['classesRoot', 'componentsProp'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describe('prop: variant', () => {
    it('has role group', () => {
      const { getByRole } = render(<ButtonGroup />);

      expect(getByRole('group')).toBeVisible();
    });

    it('plain by default', () => {
      const { getByTestId } = render(
        <ButtonGroup data-testid="root">
          <Button />
          <IconButton />
        </ButtonGroup>,
      );

      expect(getByTestId('root')).to.have.class(classes.variantOutlined);
    });

    (['plain', 'outlined', 'soft', 'solid'] as const).forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByTestId, container } = render(
          <ButtonGroup data-testid="root" variant={variant}>
            <Button />
            <IconButton />
          </ButtonGroup>,
        );

        expect(getByTestId('root')).to.have.class(
          classes[`variant${capitalize(variant)}` as ButtonGroupClassKey],
        );

        expect(container.firstChild?.firstChild).to.have.class(
          buttonClasses[`variant${capitalize(variant)}` as ButtonClassKey],
        );
        expect(container.firstChild?.lastChild).to.have.class(
          iconButtonClasses[`variant${capitalize(variant)}` as IconButtonClassKey],
        );
      });
    });

    it('should override button group value', () => {
      const { getAllByRole } = render(
        <ButtonGroup variant="soft">
          <Button variant="solid" />
          <IconButton variant="plain" />
        </ButtonGroup>,
      );
      expect(getAllByRole('button')[0]).to.have.class(buttonClasses.variantSolid);
      expect(getAllByRole('button')[1]).to.have.class(iconButtonClasses.variantPlain);
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { getByTestId } = render(
        <ButtonGroup data-testid="root">
          <Button />
          <IconButton />
        </ButtonGroup>,
      );

      expect(getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    (['primary', 'success', 'danger', 'neutral', 'warning'] as const).forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByTestId, container } = render(
          <ButtonGroup data-testid="root" color={color}>
            <Button />
            <IconButton />
          </ButtonGroup>,
        );

        expect(getByTestId('root')).to.have.class(
          classes[`color${capitalize(color)}` as ButtonGroupClassKey],
        );

        expect(container.firstChild?.firstChild).to.have.class(
          buttonClasses[`color${capitalize(color)}` as ButtonClassKey],
        );
        expect(container.firstChild?.lastChild).to.have.class(
          iconButtonClasses[`color${capitalize(color)}` as IconButtonClassKey],
        );
      });
    });

    it('should override button group value', () => {
      const { getAllByRole } = render(
        <ButtonGroup color="primary">
          <Button color="danger" />
          <IconButton color="success" />
        </ButtonGroup>,
      );
      expect(getAllByRole('button')[0]).to.have.class(buttonClasses.colorDanger);
      expect(getAllByRole('button')[1]).to.have.class(iconButtonClasses.colorSuccess);
    });
  });

  it('can change size', () => {
    const { container, getAllByRole, rerender } = render(
      <ButtonGroup>
        <Button />
        <IconButton />
      </ButtonGroup>,
    );

    expect(container.firstChild).to.have.class(classes.sizeMd);
    expect(getAllByRole('button')[0]).to.have.class(buttonClasses.sizeMd);
    expect(getAllByRole('button')[1]).to.have.class(iconButtonClasses.sizeMd);

    rerender(
      <ButtonGroup size="lg">
        <Button />
        <IconButton />
      </ButtonGroup>,
    );

    expect(container.firstChild).to.have.class(classes.sizeLg);
    expect(getAllByRole('button')[0]).to.have.class(buttonClasses.sizeLg);
    expect(getAllByRole('button')[1]).to.have.class(iconButtonClasses.sizeLg);

    rerender(
      <ButtonGroup size="lg">
        <Button size="sm" />
        <IconButton size="sm" />
      </ButtonGroup>,
    );
    expect(getAllByRole('button')[0]).to.have.class(buttonClasses.sizeSm);
    expect(getAllByRole('button')[1]).to.have.class(iconButtonClasses.sizeSm);
  });

  it('add data-attribute to the first and last child', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
      </ButtonGroup>,
    );
    expect(container.querySelector('[data-first-child]')).to.have.text('First');
    expect(container.querySelector('[data-last-child]')).to.have.text('Third');
  });

  it('should not add data-attribute to single child', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>Single</Button>
      </ButtonGroup>,
    );
    expect(container.querySelector('[data-first-child]')).to.equal(null);
    expect(container.querySelector('[data-last-child]')).to.equal(null);
  });

  it('pass disabled to buttons', () => {
    const { getAllByRole } = render(
      <ButtonGroup disabled>
        <Button />
        <IconButton />
      </ButtonGroup>,
    );
    expect(getAllByRole('button')[0]).to.have.property('disabled', true);
    expect(getAllByRole('button')[1]).to.have.property('disabled', true);
  });

  it('pass disabled to buttons unless it is overriden', () => {
    const { getAllByRole } = render(
      <ButtonGroup disabled>
        <Button disabled={false} />
        <IconButton disabled={false} />
      </ButtonGroup>,
    );
    expect(getAllByRole('button')[0]).not.to.have.property('disabled', true);
    expect(getAllByRole('button')[1]).not.to.have.property('disabled', true);
  });
});
