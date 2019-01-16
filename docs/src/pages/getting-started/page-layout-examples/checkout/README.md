# Checkout layout

## Usage

Simply copy the files into your project, or one of the [example applications](https://github.com/mui-org/material-ui/tree/master/examples), and import and use the `Checkout` component.

You can customize the Stepper logic and steps to suit your specific checkout workflow and data requirements.

## Files

| File  | Purpose  |
|---    |---       |
| `Checkout.js` | Main file with Stepper logic. |
| `AddressForm.js` | Capture the shipping address. Repeat this step to capture the Billing address. |
| `PaymentForm.js` | Capture the payment details. You may have to embed your payment provider's form here. |
| `ReviewForm.js` | Final step to confirm the details provided before purchase. |

## Dependencies

- `@material-ui/core`
- `@material-ui/icons`
