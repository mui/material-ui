import * as React from 'react';
import Image from 'docs/src/modules/branding/MaterialUixImage';

// PriorityButton start
interface CustomButtonProps {
  title: string;
  firstTitle?: string;
  secondTitle?: string;
  firstOn?: number;
  secondOn?: number;
  clickSecondOn?: any;
  clickFirstOn?: any;
  defaultColor?: string;
  Button1: any;
  isImage?: boolean;
}

export default function CustomButton(props: CustomButtonProps) {
  const {
    firstTitle,
    title = props.firstTitle,
    secondTitle,
    secondOn,
    firstOn = 1,
    clickSecondOn,
    clickFirstOn,
    defaultColor,
    Button1,
    isImage = false,
  } = props;

  return (
    <Button1
      color="inherit"
      variant="contained"
      size="small"
      sx={
        (firstOn === 1 && title === firstTitle) || (secondOn === 1 && title === secondTitle)
          ? { background: 'white', color: 'text.primary' }
          : {
              background: 'transparent',
              color: defaultColor,
            }
      }
      onClick={() => {
        if (title === firstTitle) {
          clickFirstOn();
        } else {
          clickSecondOn();
        }
      }}
    >
      {isImage && (
        <Image
          src={
            title === 'Light' ? '/static/branding/home/Light.svg' : '/static/branding/home/Dark.svg'
          }
          sx={{
            mr: 0.7,
            '& img': {
              verticalAlign: 'middle',
              marginTop: '-1px',
            },
          }}
        />
      )}
      {title}
    </Button1>
  );
}
