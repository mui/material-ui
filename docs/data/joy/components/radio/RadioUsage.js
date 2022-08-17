import * as React from 'react';
import JoyUsageDemo, {
  prependLinesSpace,
} from 'docs/src/modules/components/JoyUsageDemo';
import FormLabel from '@mui/joy/FormLabel';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';

export default function RadioUsage() {
  return (
    <JoyUsageDemo
      componentName="Radio"
      data={[
        {
          propName: 'variant',
          knob: 'select',
          defaultValue: 'outlined',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'row',
          knob: 'switch',
          defaultValue: false,
          codeBlockDisplay: false,
        },
      ]}
      getCodeBlock={(code, props) => `<RadioGroup${props.row ? ` row` : ''}>
${prependLinesSpace(code, 2)}
</RadioGroup>`}
      renderDemo={({ row, ...props }) => (
        <div>
          <FormLabel
            id="radio-button-usage-label"
            sx={{
              mb: 2,
              fontWeight: 'xl',
              textTransform: 'uppercase',
              fontSize: 'xs',
              letterSpacing: '0.15rem',
              color: 'text.secondary',
            }}
          >
            Pizza crust
          </FormLabel>
          <RadioGroup
            row={row}
            defaultValue="1"
            name="radio-button-usage"
            aria-labelledby="radio-button-usage-label"
          >
            <Radio label="Regular crust" value="1" {...props} />
            <Radio label="Deep dish" value="2" {...props} />
            <Radio label="Thin crust" value="3" {...props} disabled />
          </RadioGroup>
        </div>
      )}
    />
  );
}
