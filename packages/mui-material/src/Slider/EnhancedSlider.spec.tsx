import * as React from 'react';
import { EnhancedSlider } from '@mui/material/Slider';

function testOnChange() {
  function handleSliderChange(event: Event, value: unknown) {}
  function handleSliderChangeCommitted(event: React.SyntheticEvent | Event, value: unknown) {}
  <EnhancedSlider onChange={handleSliderChange} onChangeCommitted={handleSliderChangeCommitted} />;
}

<EnhancedSlider track="inverted" />;

// color types
<EnhancedSlider color="primary" />;
<EnhancedSlider color="secondary" />;
<EnhancedSlider color="error" />;
<EnhancedSlider color="success" />;
<EnhancedSlider color="info" />;
<EnhancedSlider color="warning" />;

// Enhanced features
<EnhancedSlider showMarks />;
<EnhancedSlider showTooltips />;
<EnhancedSlider range />;
<EnhancedSlider customMarks={[{ value: 25, label: 'Quarter' }]} />;
<EnhancedSlider formatValueLabel={(value: number) => `${value}%`} />;

// slotProps and componentsProps as objects
<EnhancedSlider
  slotProps={{
    root: { onMouseDown: () => 'onMouseDown event triggered' },
    input: { disabled: true },
    mark: { onClick: () => 'clicked' },
    markLabel: { className: 'markLabel' },
    rail: { className: 'rail' },
    thumb: { className: 'thumb' },
    valueLabel: { valueLabelDisplay: 'auto' },
  }}
  componentsProps={{
    root: { onMouseDown: () => 'onMouseDown event triggered' },
    input: { disabled: true },
    mark: { onClick: () => 'clicked' },
    markLabel: { className: 'markLabel' },
    rail: { className: 'rail' },
    thumb: { className: 'thumb' },
    valueLabel: { valueLabelDisplay: 'auto' },
  }}
/>;

// slotProps and componentsProps as functions
<EnhancedSlider
  slotProps={{
    root: ({ color }: any) => ({ className: color === 'primary' ? 'root_primary' : 'root_secondary' }),
    input: ({ size }: any) => ({ disabled: size === 'medium' }),
    mark: ({ marked }: any) => ({ 'data-marked': marked }),
    markLabel: ({ marked }: any) => ({ 'data-marked': marked }),
    rail: ({ orientation }: any) => ({ 'data-orientation': orientation }),
    thumb: ({ dragging }: any) => ({ 'data-dragging': dragging }),
    track: ({ inverted }: any) => ({ 'data-inverted': inverted }),
    valueLabel: ({ open }: any) => ({ 'data-open': open }),
  }}
  componentsProps={{
    root: ({ color }: any) => ({ className: color === 'primary' ? 'root_primary' : 'root_secondary' }),
    input: ({ size }: any) => ({ disabled: size === 'medium' }),
    mark: ({ marked }: any) => ({ 'data-marked': marked }),
    markLabel: ({ marked }: any) => ({ 'data-marked': marked }),
    rail: ({ orientation }: any) => ({ 'data-orientation': orientation }),
    thumb: ({ dragging }: any) => ({ 'data-dragging': dragging }),
    track: ({ inverted }: any) => ({ 'data-inverted': inverted }),
    valueLabel: ({ open }: any) => ({ 'data-open': open }),
  }}
/>;