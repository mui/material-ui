// testing docs/src/pages/customization/theme-components/theme-components.md
import { blue, red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',
            border: `2px dashed grey${blue[500]}`,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: `4px dashed ${red[500]}`,
          },
        },
      ],
    },
  },
});
