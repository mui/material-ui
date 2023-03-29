import * as React from 'react';
import PropTypes from 'prop-types';
import FormControlUnstyled, {
  useFormControlUnstyledContext,
} from '@mui/base/FormControlUnstyled';

import useInput from '@mui/base/useInput';

import { useTheme } from '@mui/system';
import clsx from 'clsx';
import validateCard from './validateCard';

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const css = `
  .root {
    display: flex;
    flex-flow: row nowrap;
    background: ${grey[50]};
    border: 1px solid ${grey[300]};
    border-radius: 8px;
  }

  .dark .root {
    background: ${grey[900]};
    border-color: ${grey[800]};
  }

  .root:hover {
    background: ${grey[100]};
    border-color: ${grey[400]};
  }

  .dark .root:hover {
    background: ${grey[800]};
    border-color: ${grey[700]};
  }

  .root.focused {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${blue[100]};
  }

  .dark .root.focused {
    box-shadow: 0 0 0 3px ${grey[800]};
  }

  .input {
    width: 320px;
    font-size: 0.875rem;
    font-family: system-ui, IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.4;
    border: 0;
    border-radius: 8px;
    padding: 8px 10px;
    outline: 0;
    background: inherit;
    color: ${grey[900]}
  }

  .dark .input {
    color: ${grey[300]}
  }

  .label {
    font-family: system-ui, IBM Plex Sans, sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 1px;
    opacity: 0.8;
  }

  .label.invalid {
    opacity: 1;
    color: red;
  }

  .icons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    column-gap: 4px;
    padding: 0 12px;
  }

  .icons svg {
    width: 1.5rem;
    height: 1rem;
  }

  .icons.visa svg:not(.visa),
  .icons.mastercard svg:not(.mastercard),
  .icons.amex svg:not(.amex) {
    filter: grayscale(100%);
    opacity: 0.25;
  }

  .helper-text {
    font-family: system-ui, IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
  }
`;

function Label({ children, className, htmlFor }) {
  const formControlContext = useFormControlUnstyledContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <label
      htmlFor={htmlFor ?? 'card'}
      className={clsx(
        'label',
        className,
        error || showRequiredError ? 'invalid' : '',
      )}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
};

function HelperText(props) {
  const formControlContext = useFormControlUnstyledContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? (
    <p className="helper-text" {...props}>
      This field is required.
    </p>
  ) : null;
}

function CardTypes(props) {
  const formControlContext = useFormControlUnstyledContext();

  if (formControlContext === undefined) {
    return null;
  }

  const { brand } = validateCard(formControlContext.value ?? '');

  return (
    <div {...props} className={clsx('icons', brand && brand)}>
      <svg viewBox="0 0 24 16" className="visa">
        <g fillRule="nonzero" fill="none">
          <rect
            strokeOpacity=".2"
            stroke="#000"
            strokeWidth=".5"
            fill="#FFF"
            x=".25"
            y=".25"
            width="23.5"
            height="15.5"
            rx="2"
          />
          <path
            d="M2.788 5.914A7.201 7.201 0 0 0 1 5.237l.028-.125h2.737c.371.013.672.125.77.519l.595 2.836.182.854 1.666-4.21h1.799l-2.674 6.167H4.304L2.788 5.914Zm7.312 5.37H8.399l1.064-6.172h1.7L10.1 11.284Zm6.167-6.021-.232 1.333-.153-.066a3.054 3.054 0 0 0-1.268-.236c-.671 0-.972.269-.98.531 0 .29.365.48.96.762.98.44 1.435.979 1.428 1.681-.014 1.28-1.176 2.108-2.96 2.108-.764-.007-1.5-.158-1.898-.328l.238-1.386.224.099c.553.23.917.328 1.596.328.49 0 1.015-.19 1.022-.604 0-.27-.224-.466-.882-.769-.644-.295-1.505-.788-1.491-1.674C11.878 5.84 13.06 5 14.74 5c.658 0 1.19.138 1.526.263Zm2.26 3.834h1.415c-.07-.308-.392-1.786-.392-1.786l-.12-.531c-.083.23-.23.604-.223.59l-.68 1.727Zm2.1-3.985L22 11.284h-1.575s-.154-.71-.203-.926h-2.184l-.357.926h-1.785l2.527-5.66c.175-.4.483-.512.889-.512h1.316Z"
            fill="#1434CB"
          />
        </g>
      </svg>

      <svg viewBox="0 0 24 16" className="mastercard">
        <g fill="none" fillRule="evenodd">
          <rect fill="#252525" height="16" rx="2" width="24" />
          <circle cx="9" cy="8" fill="#eb001b" r="5" />
          <circle cx="15" cy="8" fill="#f79e1b" r="5" />
          <path
            d="M12 4c1.214.912 2 2.364 2 4s-.786 3.088-2 4c-1.214-.912-2-2.364-2-4s.786-3.088 2-4z"
            fill="#ff5f00"
          />
        </g>
      </svg>

      <svg viewBox="0 0 24 16" className="amex">
        <g fill="none" fillRule="evenodd">
          <rect fill="#016fd0" height="16" rx="2" width="24" />
          <path
            d="M13.764 13.394V7.692l10.148.01v1.574l-1.173 1.254 1.173 1.265v1.608h-1.873l-.995-1.098-.988 1.102z"
            fill="#fffffe"
          />
          <path
            d="M14.442 12.769v-4.45h3.772v1.026h-2.55v.695h2.49v1.008h-2.49v.684h2.55v1.037z"
            fill="#016fd0"
          />
          <path
            d="m18.195 12.769 2.088-2.227-2.088-2.222h1.616l1.275 1.41 1.28-1.41h1.546v.035l-2.043 2.187 2.043 2.164v.063H22.35l-1.298-1.424-1.285 1.424z"
            fill="#016fd0"
          />
          <path
            d="M14.237 2.632h2.446l.86 1.95v-1.95h3.02l.52 1.462.523-1.462h2.306v5.701H11.725z"
            fill="#fffffe"
          />
          <g fill="#016fd0">
            <path d="m14.7 3.251-1.974 4.446h1.354l.373-.89h2.018l.372.89h1.387L16.265 3.25zm.17 2.558.592-1.415.592 1.415z" />
            <path d="M18.212 7.696V3.25l1.903.006.98 2.733.985-2.74h1.832v4.446l-1.179.01V4.653L21.62 7.696h-1.075l-1.136-3.054v3.054z" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function CheckoutHook() {
  const [cardNum, setCardNum] = React.useState('4242424242424242');

  const theme = useTheme();

  const { getRootProps, getInputProps, focused } = useInput({ value: cardNum });

  const handleChange = (ev) => {
    const val = ev.target.value;

    if (!val) {
      setCardNum('');
    }

    if (/^[0-9]{0,16}$/.test(val)) {
      setCardNum(val);
    }
  };

  return (
    <React.Fragment>
      <style type="text/css">{css}</style>

      <FormControlUnstyled
        value={cardNum}
        onChange={handleChange}
        className={clsx('field', theme.palette.mode ?? 'light')}
      >
        <Label htmlFor="cardNum">Card number</Label>
        <div {...getRootProps()} className={clsx('root', focused && 'focused')}>
          <input {...getInputProps()} id="cardNum" className="input" />
          <CardTypes />
        </div>
        <HelperText />
      </FormControlUnstyled>
    </React.Fragment>
  );
}
