import { ThemeOptions } from '@material-ui/core/styles';

declare module "@material-ui/core/Badge" {
  interface BadgePropsVariantOverrides {
    action: true;
  }
}

export const theme: ThemeOptions = {
  components: {
    MuiBadge: {
      variants: [
        {
          style: {},
          props: { variant: "action" }
        }
      ]
    },
  }
};