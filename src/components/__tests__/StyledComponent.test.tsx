import { render } from '@testing-library/react';
import { StyledDiv, Example } from '../StyledComponent';

describe('StyledComponent', () => {
  it('should not forward internal props to DOM', () => {
    const { container } = render(
      <StyledDiv
        customProp="test"
        variant="primary"
        color="blue"
        sx={{ margin: 2 }}
      />
    );
    
    const div = container.firstChild as HTMLElement;
    
    // Check internal props are not forwarded
    expect(div.getAttribute('sx')).toBeNull();
    expect(div.getAttribute('as')).toBeNull();
    expect(div.getAttribute('theme')).toBeNull();
    expect(div.getAttribute('component')).toBeNull();
    
    // Check custom props are not forwarded
    expect(div.getAttribute('customProp')).toBeNull();
    expect(div.getAttribute('variant')).toBeNull();
    
    // Check styles are applied
    expect(div).toHaveStyle({ backgroundColor: 'blue' });
  });
}); 