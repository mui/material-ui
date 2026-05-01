import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

type CardBrand = 'Visa' | 'Mastercard' | 'American Express' | 'Discover';

interface PaymentMethod {
  brand: CardBrand;
  number: string;
}

export default function CustomSingleValueRendering() {
  return (
    <Autocomplete
      sx={{ width: 360 }}
      options={paymentMethods}
      autoHighlight
      defaultValue={paymentMethods[0]}
      getOptionLabel={(option) =>
        `${option.brand} ending in ${getLastFourDigits(option.number)}`
      }
      isOptionEqualToValue={(option, value) => option.number === value.number}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box key={key} component="li" {...optionProps}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2,
                width: '100%',
              }}
            >
              <span>{option.brand}</span>
              <Box component="span" sx={{ color: 'text.secondary' }}>
                *{getLastFourDigits(option.number)}
              </Box>
            </Box>
          </Box>
        );
      }}
      renderValue={(value, getItemProps) => {
        const itemProps = getItemProps();

        return (
          <Box
            component="span"
            className={itemProps.className}
            data-item-index={itemProps['data-item-index']}
            tabIndex={itemProps.tabIndex}
            aria-disabled={itemProps.disabled ? 'true' : undefined}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              minWidth: 0,
              maxWidth: '100%',
            }}
          >
            <CardBrandIcon brand={value.brand} />
            <Box
              component="span"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {value.brand} ending in {getLastFourDigits(value.number)}
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => <TextField {...params} label="Payment method" />}
    />
  );
}

function getLastFourDigits(cardNumber: string) {
  return cardNumber.slice(-4);
}

// Stripe test card numbers.
// https://docs.stripe.com/testing?testing-method=card-numbers#cards
const paymentMethods: readonly PaymentMethod[] = [
  {
    brand: 'Visa',
    number: '4242424242424242',
  },
  {
    brand: 'Mastercard',
    number: '5555555555554444',
  },
  {
    brand: 'American Express',
    number: '378282246310005',
  },
  {
    brand: 'Discover',
    number: '6011111111111117',
  },
];

function CardBrandIcon(props: { brand: CardBrand }) {
  const { brand } = props;

  if (brand === 'Visa') {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        height={22}
        viewBox="0 0 34 22"
        width={34}
      >
        <rect width="34" height="22" rx="3" fill="#fff" />
        <rect
          width="33"
          height="21"
          x="0.5"
          y="0.5"
          rx="2.5"
          fill="none"
          stroke="#d9dee7"
        />
        <text
          x="7"
          y="14.5"
          fill="#1434cb"
          fontFamily="Arial, sans-serif"
          fontSize="8"
          fontWeight="700"
          letterSpacing="0"
        >
          VISA
        </text>
      </svg>
    );
  }

  if (brand === 'Mastercard') {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        height={22}
        viewBox="0 0 34 22"
        width={34}
      >
        <rect width="34" height="22" rx="3" fill="#fff" />
        <rect
          width="33"
          height="21"
          x="0.5"
          y="0.5"
          rx="2.5"
          fill="none"
          stroke="#d9dee7"
        />
        <circle cx="14" cy="11" r="6" fill="#eb001b" />
        <circle cx="20" cy="11" r="6" fill="#f79e1b" fillOpacity="0.9" />
      </svg>
    );
  }

  if (brand === 'American Express') {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        height={22}
        viewBox="0 0 34 22"
        width={34}
      >
        <rect width="34" height="22" rx="3" fill="#2e77bc" />
        <path d="M0 14h34v5a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3z" fill="#1f5f9f" />
        <text
          x="6"
          y="13.5"
          fill="#fff"
          fontFamily="Arial, sans-serif"
          fontSize="7"
          fontWeight="700"
          letterSpacing="0"
        >
          AMEX
        </text>
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height={22}
      viewBox="0 0 34 22"
      width={34}
    >
      <rect width="34" height="22" rx="3" fill="#fff" />
      <rect
        width="33"
        height="21"
        x="0.5"
        y="0.5"
        rx="2.5"
        fill="none"
        stroke="#d9dee7"
      />
      <path d="M19 4a7 7 0 0 1 0 14h-5a7 7 0 0 0 0-14z" fill="#f58220" />
      <text
        x="4.5"
        y="13.5"
        fill="#111827"
        fontFamily="Arial, sans-serif"
        fontSize="5.6"
        fontWeight="700"
        letterSpacing="0"
      >
        DISC
      </text>
    </svg>
  );
}
