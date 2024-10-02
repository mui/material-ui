import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import { expect } from 'chai';
import { Switch, switchClasses } from '@mui/base/Switch';
import { ClassNameConfigurator } from '@mui/base/utils/ClassNameConfigurator';

describe('ClassNameConfigurator', () => {
  const { render } = createRenderer();

  it('should apply default classes when not configured', () => {
    const { container } = render(<Switch defaultChecked disabled />);

    const switchComponent = container.firstChild!;

    expect(switchComponent).to.have.class(switchClasses.root);
    expect(switchComponent).to.have.class(switchClasses.checked);
    expect(switchComponent).to.have.class(switchClasses.disabled);

    expect(switchComponent.childNodes[0]).to.have.class(switchClasses.track);
    expect(switchComponent.childNodes[1]).to.have.class(switchClasses.thumb);
    expect(switchComponent.childNodes[2]).to.have.class(switchClasses.input);
  });

  it('should not generate any classes when configured as such', () => {
    const { container } = render(
      <ClassNameConfigurator disableDefaultClasses>
        <Switch defaultChecked disabled />
      </ClassNameConfigurator>,
    );

    const switchComponent = container.firstChild!;

    expect(switchComponent).not.to.have.class(switchClasses.root);
    expect(switchComponent).not.to.have.class(switchClasses.checked);
    expect(switchComponent).not.to.have.class(switchClasses.disabled);

    expect(switchComponent.childNodes[0]).not.to.have.class(switchClasses.track);
    expect(switchComponent.childNodes[1]).not.to.have.class(switchClasses.thumb);
    expect(switchComponent.childNodes[2]).not.to.have.class(switchClasses.input);
  });

  it('should not remove custom classes when disableDefaultClasses is set', () => {
    const { container } = render(
      <ClassNameConfigurator disableDefaultClasses>
        <Switch
          className="custom-switch"
          slotProps={{
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
