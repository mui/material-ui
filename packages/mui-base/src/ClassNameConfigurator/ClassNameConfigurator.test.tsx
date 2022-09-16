import * as React from 'react';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import ClassNameConfigurator from '@mui/base/ClassNameConfigurator';
import { createRenderer } from 'test/utils';
import { expect } from 'chai';

describe('ClassNameConfigurator', () => {
  const { render } = createRenderer();

  it('should apply default classes when not configured', () => {
    const { container } = render(<SwitchUnstyled defaultChecked disabled />);

    const switchComponent = container.firstChild!;

    expect(switchComponent).to.have.class(switchUnstyledClasses.root);
    expect(switchComponent).to.have.class(switchUnstyledClasses.checked);
    expect(switchComponent).to.have.class(switchUnstyledClasses.disabled);

    expect(switchComponent.childNodes[0]).to.have.class(switchUnstyledClasses.track);
    expect(switchComponent.childNodes[1]).to.have.class(switchUnstyledClasses.thumb);
    expect(switchComponent.childNodes[2]).to.have.class(switchUnstyledClasses.input);
  });

  it('should override the default class names when configured', () => {
    function classNameGenerator(component: string, slot: string) {
      return `test:${component.toLowerCase()}/${slot}`;
    }

    const { container } = render(
      <ClassNameConfigurator generator={classNameGenerator}>
        <SwitchUnstyled defaultChecked disabled />
      </ClassNameConfigurator>,
    );

    const switchComponent = container.firstChild!;

    expect(switchComponent).to.have.class('test:switch/root');
    expect(switchComponent).not.to.have.class(switchUnstyledClasses.root);
    expect(switchComponent).to.have.class('test:switch/checked');
    expect(switchComponent).not.to.have.class(switchUnstyledClasses.checked);
    expect(switchComponent).to.have.class('test:switch/disabled');
    expect(switchComponent).not.to.have.class(switchUnstyledClasses.disabled);

    expect(switchComponent.childNodes[0]).to.have.class('test:switch/track');
    expect(switchComponent.childNodes[0]).not.to.have.class(switchUnstyledClasses.track);
    expect(switchComponent.childNodes[1]).to.have.class('test:switch/thumb');
    expect(switchComponent.childNodes[1]).not.to.have.class(switchUnstyledClasses.thumb);
    expect(switchComponent.childNodes[2]).to.have.class('test:switch/input');
    expect(switchComponent.childNodes[2]).not.to.have.class(switchUnstyledClasses.input);
  });

  it('should not generate any classes when configured as such', () => {
    const { container } = render(
      <ClassNameConfigurator disableClasses>
        <SwitchUnstyled defaultChecked disabled />
      </ClassNameConfigurator>,
    );

    const switchComponent = container.firstChild!;

    expect(switchComponent).not.to.have.class(switchUnstyledClasses.root);
    expect(switchComponent).not.to.have.class(switchUnstyledClasses.checked);
    expect(switchComponent).not.to.have.class(switchUnstyledClasses.disabled);

    expect(switchComponent.childNodes[0]).not.to.have.class(switchUnstyledClasses.track);
    expect(switchComponent.childNodes[1]).not.to.have.class(switchUnstyledClasses.thumb);
    expect(switchComponent.childNodes[2]).not.to.have.class(switchUnstyledClasses.input);
  });

  it('should not remove custom classes when disableClasses is set', () => {
    const { container } = render(
      <ClassNameConfigurator disableClasses>
        <SwitchUnstyled
          className="custom-switch"
          componentsProps={{
            track: { className: 'custom-track' },
            thumb: { className: 'custom-thumb' },
            input: { className: 'custom-input' },
          }}
        />
      </ClassNameConfigurator>,
    );

    const switchComponent = container.firstChild!;

    expect(switchComponent).to.have.class('custom-switch');
    expect(switchComponent.childNodes[0]).to.have.class('custom-track');
    expect(switchComponent.childNodes[1]).to.have.class('custom-thumb');
    expect(switchComponent.childNodes[2]).to.have.class('custom-input');
  });
});
