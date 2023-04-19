import * as React from 'react';
import SelectUnstyled from '@mui/base/SelectUnstyled';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import Box, { BoxProps } from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';
// import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import GradientText from 'docs/src/components/typography/GradientText';
import ROUTES from 'docs/src/route';
// import DragIndicator from '@mui/icons-material/DragIndicator';
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded';
import ToggleOn from '@mui/icons-material/ToggleOn';
// import { useResizeHandle } from '../productCore/CoreStyling';
import GetStartedButtons2 from '../home/GetStartedButtons2';

const Div = React.forwardRef<
  HTMLDivElement,
  { anchorEl?: any; ownerState?: any; open?: any; placement?: any }
>(function Div({ anchorEl, ownerState, open, placement, ...props }, ref) {
  return <div ref={ref} {...props} />;
});

function Demo({ label }: { label: string }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 'var(--Select-width)',
        '& > button': {
          width: '100%',
          '&:empty:before': { content: '"Select an option"', color: 'text.tertiary' },
        },
        '&:is(ul)': {
          margin: 0,
        },
      }}
    >
      <Typography sx={{ mb: 0.75, fontSize: 12, color: 'text.tertiary', fontWeight: 'bold' }}>
        {label}
      </Typography>
      <SelectUnstyled
        listboxOpen
        defaultValue="3"
        autoFocus={false}
        renderValue={(option) => (
          <React.Fragment>
            <Box sx={{ color: option ? undefined : 'grey.600' }}>
              {option?.label ?? 'choose an option'}
            </Box>
            <ArrowDropDownRounded />
          </React.Fragment>
        )}
        slots={{ popper: Div }}
      >
        <li role="none">
          <ul role="group" aria-label="input components">
            <li role="presentation">Input components</li>
            <OptionUnstyled value="1">Button</OptionUnstyled>
            <OptionUnstyled value="2">Input</OptionUnstyled>
            <OptionUnstyled value="3">Select</OptionUnstyled>
            <OptionUnstyled value="4">
              <ToggleOn /> Switch
            </OptionUnstyled>
            <OptionUnstyled value="5">Slider</OptionUnstyled>
          </ul>
        </li>
        <li role="none">
          <ul role="group" aria-label="Utils">
            <li role="presentation">Utils</li>
            <OptionUnstyled value="6">Click-away listener</OptionUnstyled>
            <OptionUnstyled value="7">Form control</OptionUnstyled>
            <OptionUnstyled value="8">Modal</OptionUnstyled>
            <OptionUnstyled value="9">No SSR</OptionUnstyled>
            <OptionUnstyled value="10">Textarea autosize</OptionUnstyled>
          </ul>
        </li>
      </SelectUnstyled>
    </Box>
  );
}

function Wrapper({ sx, children, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        { width: '100%', height: '100%', overflow: 'hidden' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          width: 'var(--frame-width)',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

// function Resizable({ sx, ...props }: BoxProps) {
//   const container = React.useRef<HTMLDivElement | null>(null);
//   const { dragging, getDragHandlers } = useResizeHandle(container, { minWidth: '64px' });
//   return (
//     <Box
//       ref={container}
//       {...props}
//       sx={[
//         {
//           borderRight: '1px solid',
//           borderColor: dragging ? 'primary.400' : 'primary.200',
//         },
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//     >
//       <Wrapper>{props.children}</Wrapper>
//       <Tooltip
//         title="Drag it over to see it unstyled!"
//         open={!dragging}
//         placement="left"
//         arrow
//         PopperProps={{ sx: { zIndex: 1000 } }}
//       >
//         <IconButton
//           sx={{
//             border: '1px solid',
//             borderColor: 'primary.200',
//             bgcolor: 'background.paper',
//             position: 'absolute',
//             right: 0,
//             bottom: 'min(80px, 8%)',
//             transform: 'translateX(50%)',
//             '&:hover': {
//               bgcolor: 'background.paper',
//               borderColor: 'primary.400',
//             },
//           }}
//           {...getDragHandlers()}
//         >
//           <DragIndicator />
//         </IconButton>
//       </Tooltip>
//     </Box>
//   );
// }

export default function BaseUIHero() {
  return (
    <HeroContainer
      enablePattern
      left={
        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, ml: { xl: '-40px' } }}>
          <Typography
            fontWeight="bold"
            variant="body2"
            sx={(theme) => ({
              color: 'primary.600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' },
              '& > *': { mr: 1 },
              ...theme.applyDarkStyles({
                color: 'primary.300',
              }),
            })}
          >
            <IconImage width={28} height={28} name="product-core" /> MUI Core{' '}
            <Typography component="span" variant="inherit" sx={{ color: 'text.primary' }}>
              &nbsp;&nbsp;
              <Typography component="span" variant="inherit" sx={{ color: 'divider' }}>
                /
              </Typography>
              &nbsp;&nbsp;Base UI
            </Typography>
          </Typography>
          <Typography
            variant="h1"
            sx={{
              my: 2,
              maxWidth: { xs: 500, md: 'unset' },
              minWidth: { lg: 650 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            A <GradientText>blank canvas</GradientText> for <br />
            total flexibility
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
            Base UI gives you a set of foundational &quot;headless&quot; components that you can
            build with using any styling solution you choose—no need to override any default style
            engine or theme.
          </Typography>
          <GetStartedButtons2
            getStartedUrl={ROUTES.baseDocs}
            learnUrl=""
            learnLabel="Learn Base UI"
            installation="npm install @mui/base"
          />
        </Box>
      }
      right={
        <Box
          sx={{
            '--frame-width': 'min(570px, 36vw)',
            '--Select-width': '320px',
            '--Select-radius': '12px',
            '--Select-spacing': {
              xs: '8px',
              lg: '12px',
            },
            position: 'relative',
            width: 'var(--frame-width)',
            height: '100%',
          }}
        >
          <Wrapper
            sx={[
              (theme) => ({
                inset: 0,
                position: 'absolute',
                backgroundColor: 'inherit',
                '& .MuiSelect-root': {
                  width: '100%',
                  maxWidth: '100%',
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 'var(--Select-radius)',
                  height: '45px',
                  padding: 'var(--Select-spacing) calc(var(--Select-spacing) * 1.5)',
                  bgcolor: 'background.paper',
                  display: 'flex',
                  color: 'text.secondary',
                  alignItems: 'center',
                  ...theme.typography.body2,
                  '& svg:last-child': {
                    marginLeft: 'auto',
                  },
                  '& svg:first-child': {
                    marginRight: 'var(--Select-spacing)',
                  },
                  '&:not(:empty)': {
                    fontWeight: 500,
                  },
                },
                '& .MuiSelect-popper': {
                  width: '100%',
                  margin: 'var(--Select-spacing) 0',
                },
                '& .MuiSelect-listbox': {
                  display: 'flex',
                  flexDirection: 'column',
                  margin: 0,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 'var(--Select-radius)',
                  bgcolor: 'background.paper',
                  boxShadow: '0px 4px 40px rgba(62, 80, 96, 0.05)',
                  padding: 'calc(var(--Select-spacing) * 1.5)',
                  gap: 'calc(var(--Select-spacing) * 1.5)',
                  ...theme.typography.body2,
                  '& ul': {
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                  },
                  '& li': {
                    minHeight: 32,
                    display: 'flex',
                    borderRadius: '4px',
                    '&[role="none"]': {
                      flexDirection: 'column',
                      padding: 0,
                      '& > ul': {
                        padding: 0,
                      },
                    },
                    '&[role="presentation"]': {
                      fontSize: 10,
                      color: 'text.tertiary',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      alignItems: 'center',
                    },
                    '&[role="option"]': {
                      border: '1px solid transparent',
                      padding: 'calc(var(--Select-spacing) * 0.75)',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'text.secondary',
                      alignItems: 'center',
                      cursor: 'pointer',
                      '&:hover, &.MuiOption-highlighted': {
                        bgcolor: 'grey.50',
                        color: 'text.primary',
                      },
                      '&.Mui-selected': {
                        bgcolor: 'grey.50',
                        borderColor: 'grey.100',
                        color: 'text.primary',
                      },
                      '& svg:first-child': {
                        color: 'primary.main',
                        marginRight: 'var(--Select-spacing)',
                        fontSize: 18,
                      },
                    },
                  },
                },
              }),
              (theme) =>
                theme.applyDarkStyles({
                  '& .MuiSelect-root': {
                    color: '#fff',
                    borderColor: 'primaryDark.700',
                  },
                  '& svg': { color: 'primary.300' },
                  '& .MuiSelect-listbox': {
                    borderColor: 'primaryDark.700',
                    '& li[role="presentation"]': {
                      color: 'grey.600',
                    },
                    '& li[role="option"]': {
                      color: 'grey.500',
                      '&:hover, &.MuiOption-highlighted': {
                        bgcolor: 'primaryDark.700',
                      },
                      '&.Mui-selected': {
                        color: '#fff',
                        bgcolor: 'primaryDark.700',
                        borderColor: 'primaryDark.500',
                      },
                    },
                  },
                }),
            ]}
          >
            <Demo label="Select a component" />
          </Wrapper>
        </Box>
      }
      // right={
      //   <Box
      //     sx={{
      //       '--frame-width': 'min(570px, 36vw)',
      //       '--Select-width': '240px',
      //       '--Select-radius': '12px',
      //       '--Select-spacing': '8px',
      //       position: 'relative',
      //       width: 'var(--frame-width)',
      //       height: '100%',
      //       backgroundColor: 'inherit',
      //     }}
      //   >
      //     <Wrapper
      //       sx={(theme) => ({
      //         bgcolor: 'rgba(0 0 0 / 0.04)',
      //         ...theme.applyDarkStyles({ bgcolor: 'rgba(255 255 255 / 0.04)' }),
      //       })}
      //     >
      //       <Demo label="Unstyled select" />
      //     </Wrapper>
      //     <Resizable
      //       sx={(theme) => ({
      //         inset: 0,
      //         position: 'absolute',
      //         backgroundColor: 'inherit',
      //         '& .MuiSelect-root': {
      //           width: '100%',
      //           maxWidth: '100%',
      //           border: '1px solid',
      //           borderColor: 'grey.300',
      //           borderRadius: 'var(--Select-radius)',
      //           height: '45px',
      //           padding: 'var(--Select-spacing) calc(var(--Select-spacing) * 1.5)',
      //           bgcolor: 'background.paper',
      //           display: 'flex',
      //           color: 'text.secondary',
      //           alignItems: 'center',
      //           ...theme.typography.body2,
      //           '& svg:first-child': {
      //             marginRight: 'var(--Select-spacing)',
      //           },
      //           '&:not(:empty)': {
      //             fontWeight: 500,
      //           },
      //         },
      //         '& .MuiSelect-popper': {
      //           width: '100%',
      //           margin: 'var(--Select-spacing) 0',
      //         },
      //         '& .MuiSelect-listbox': {
      //           display: 'flex',
      //           flexDirection: 'column',
      //           margin: 0,
      //           border: '1px solid',
      //           borderColor: 'grey.300',
      //           borderRadius: 'var(--Select-radius)',
      //           bgcolor: 'background.paper',
      //           boxShadow: '0px 4px 40px rgba(62, 80, 96, 0.05)',
      //           padding: 'calc(var(--Select-spacing) * 1.5)',
      //           gap: 'calc(var(--Select-spacing) * 1.5)',
      //           ...theme.typography.body2,
      //           '& ul': {
      //             padding: 0,
      //             display: 'flex',
      //             flexDirection: 'column',
      //           },
      //           '& li': {
      //             minHeight: 32,
      //             display: 'flex',
      //             borderRadius: '4px',
      //             '&[role="none"]': {
      //               flexDirection: 'column',
      //               padding: 0,
      //               '& > ul': {
      //                 padding: 0,
      //               },
      //             },
      //             '&[role="presentation"]': {
      //               fontSize: 10,
      //               color: 'text.tertiary',
      //               fontWeight: 'bold',
      //               textTransform: 'uppercase',
      //               letterSpacing: '1px',
      //               alignItems: 'center',
      //             },
      //             '&[role="option"]': {
      //               border: '1px solid transparent',
      //               padding: 'calc(var(--Select-spacing) * 0.75)',
      //               fontSize: '14px',
      //               fontWeight: 500,
      //               color: 'text.secondary',
      //               alignItems: 'center',
      //               cursor: 'pointer',
      //               '&:hover, &.MuiOption-highlighted': {
      //                 bgcolor: 'grey.50',
      //                 color: 'text.primary',
      //               },
      //               '&.Mui-selected': {
      //                 bgcolor: 'grey.50',
      //                 borderColor: 'grey.100',
      //                 color: 'text.primary',
      //               },
      //               '& svg:first-child': {
      //                 color: 'primary.main',
      //                 marginRight: 'var(--Select-spacing)',
      //                 fontSize: 18,
      //               },
      //             },
      //           },
      //         },
      //       })}
      //     >
      //       <Demo label="Customized select" />
      //     </Resizable>
      //   </Box>
      // }
    />
  );
}
