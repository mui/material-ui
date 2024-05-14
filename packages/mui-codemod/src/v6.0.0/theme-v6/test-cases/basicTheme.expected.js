export default function getCheckoutTheme(mode) {
  return {
    ...getDesignTokens(mode),
    components: {
      MuiAlert: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 10,
            backgroundColor: orange[100],
            color: theme.palette.text.primary,
            border: `1px solid ${alpha(orange[300], 0.5)}`,
            '& .MuiAlert-icon': {
              color: orange[500],
            },
            ...theme.applyStyles("dark", {
              backgroundColor: `${alpha(orange[900], 0.5)}`,
              border: `1px solid ${alpha(orange[800], 0.5)}`,
            }),
          }),
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            boxSizing: 'border-box',
            transition: 'all 100ms ease',
            '&:focus-visible': {
              outline: `3px solid ${alpha(brand[400], 0.5)}`,
              outlineOffset: '2px',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({
            theme
          }) => ({
            boxShadow: 'none',
            borderRadius: theme.shape.borderRadius,
            textTransform: 'none',
            variants: [{
              props: {
                size: 'small'
              },
              style: {
                height: '2rem', // 32px
                padding: '0 0.5rem',
              }
            }, {
              props: {
                size: 'medium'
              },
              style: {
                height: '2.5rem', // 40px
              }
            }, {
              props: {
                color: 'primary',
                variant: 'contained'
              },
              style: {
                  color: 'white',
                  backgroundColor: brand[300],
                  backgroundImage: `linear-gradient(to bottom, ${alpha(brand[400], 0.8)}, ${brand[500]})`,
                  boxShadow: `inset 0 2px 0 ${alpha(brand[200], 0.2)}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
                  border: `1px solid ${brand[500]}`,
                  '&:hover': {
                    backgroundColor: brand[700],
                    boxShadow: 'none',
                  },
                  '&:active': {
                    backgroundColor: brand[700],
                    boxShadow: `inset 0 2.5px 0 ${alpha(brand[700], 0.4)}`,
                  },
                }
            }, {
              props: {
                variant: 'outlined'
              },
              style: {
                color: brand[700],
                backgroundColor: alpha(brand[300], 0.1),
                borderColor: alpha(brand[200], 0.8),
                boxShadow: `inset 0 2px ${alpha(brand[50], 0.5)}, inset 0 -2px ${alpha(brand[200], 0.2)}`,
                '&:hover': {
                  backgroundColor: alpha(brand[300], 0.2),
                  borderColor: alpha(brand[300], 0.5),
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: alpha(brand[300], 0.3),
                  boxShadow: `inset 0 2.5px 0 ${alpha(brand[400], 0.2)}`,
                  backgroundImage: 'none',
                },
              }
            }, {
              props: {
                color: 'secondary',
                variant: 'outlined'
              },
              style: {
                  backgroundColor: alpha(gray[300], 0.1),
                  borderColor: alpha(gray[300], 0.5),
                  color: gray[700],
                  '&:hover': {
                    backgroundColor: alpha(gray[300], 0.3),
                    borderColor: alpha(gray[300], 0.5),
                    boxShadow: 'none',
                  },
                  '&:active': {
                    backgroundColor: alpha(gray[300], 0.4),
                    boxShadow: `inset 0 2.5px 0 ${alpha(gray[400], 0.2)}`,
                    backgroundImage: 'none',
                  },
                }
            }, {
              props: {
                color: 'primary',
                variant: 'text'
              },
              style: {
                  color: brand[700],
                  '&:hover': {
                    backgroundColor: alpha(brand[300], 0.3),
                  },
                }
            }, {
              props: {
                color: 'info',
                variant: 'text'
              },
              style: {
                  color: gray[700],
                  '&:hover': {
                    backgroundColor: alpha(gray[300], 0.3),
                  },
                }
            }, {
              props: {
                variant: 'outlined'
              },
              style: {
                ...theme.applyStyles("dark", {
                  color: brand[200],
                  backgroundColor: alpha(brand[600], 0.1),
                  borderColor: alpha(brand[600], 0.6),
                  boxShadow: `inset 0 2.5px ${alpha(brand[400], 0.1)}, inset 0 -2px ${alpha(gray[900], 0.5)}`,
                  '&:hover': {
                    backgroundColor: alpha(brand[700], 0.2),
                    borderColor: alpha(brand[700], 0.5),
                    boxShadow: 'none',
                  },
                  '&:active': {
                    backgroundColor: alpha(brand[800], 0.2),
                    boxShadow: `inset 0 2.5px 0 ${alpha(brand[900], 0.4)}`,
                    backgroundImage: 'none',
                  },
                })
              }
            }, {
              props: {
                color: 'info',
                variant: 'text'
              },
              style: {
                ...theme.applyStyles("dark", {
                    color: gray[200],
                    '&:hover': {
                      backgroundColor: alpha(gray[700], 0.3),
                    },
                  })
              }
            }, {
              props: {
                color: 'secondary',
                variant: 'outlined'
              },
              style: {
                ...theme.applyStyles("dark", {
                    color: gray[300],
                    backgroundColor: alpha(gray[600], 0.1),
                    borderColor: alpha(gray[700], 0.5),
                    boxShadow: `inset 0 2.5px ${alpha(gray[600], 0.1)}, inset 0 -2px ${alpha(gray[900], 0.5)}`,
                    '&:hover': {
                      backgroundColor: alpha(gray[700], 0.2),
                      borderColor: alpha(gray[700], 0.5),
                      boxShadow: 'none',
                    },
                    '&:active': {
                      backgroundColor: alpha(gray[800], 0.2),
                      boxShadow: `inset 0 2.5px 0 ${alpha(gray[900], 0.4)}`,
                      backgroundImage: 'none',
                    },
                  })
              }
            }, {
              props: {
                color: 'primary',
                variant: 'text'
              },
              style: {
                ...theme.applyStyles("dark", {
                    color: brand[200],
                    '&:hover': {
                      backgroundColor: alpha(brand[700], 0.3),
                    },
                  })
              }
            }]
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({
            theme
          }) => ({
            transition: 'all 100ms ease',
            backgroundColor: gray[50],
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${alpha(gray[200], 0.5)}`,
            boxShadow: 'none',
            ...theme.applyStyles("dark", {
              backgroundColor: alpha(gray[800], 0.6),
              border: `1px solid ${alpha(gray[700], 0.3)}`
            }),
            variants: [{
              props: {
                variant: 'outlined'
              },
              style: {
                border: `1px solid ${gray[200]}`,
                boxShadow: 'none',
                background: `linear-gradient(to bottom, hsl(0, 0%, 100%), ${gray[50]})`,
              }
            }, {
              props: {
                variant: 'outlined'
              },
              style: {
                ...theme.applyStyles("dark", {
                  border: `1px solid ${alpha(gray[700], 0.4)}`,
                  boxShadow: 'none',
                  background: `linear-gradient(to bottom, ${gray[900]}, ${alpha(gray[800], 0.5)})`,
                })
              }
            }]
          }),
        },
      },
      MuiCheckbox: {
        defaultProps: {
          disableRipple: true,
          icon: <CheckBoxOutlineBlankRoundedIcon sx={{ color: 'hsla(210, 0%, 0%, 0.0)' }} />,
          checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            margin: 10,
            height: 16,
            width: 16,
            borderRadius: 5,
            border: '1px solid ',
            borderColor: alpha(gray[300], 0.8),
            boxShadow: '0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset',
            transition: 'border-color 120ms ease-in',
            backgroundColor: alpha(gray[100], 0.4),
            '&:hover': {
              borderColor: brand[300],
            },
            '&.Mui-focusVisible': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              borderColor: brand[400],
            },
            '&.Mui-checked': {
              color: 'white',
              backgroundColor: brand[500],
              borderColor: brand[500],
              boxShadow: `none`,
              '&:hover': {
                backgroundColor: brand[600],
              },
            },
            ...theme.applyStyles("dark", {
              borderColor: alpha(gray[700], 0.5),
              boxShadow: '0 0 0 1.5px hsl(210, 0%, 0%) inset',
              backgroundColor: alpha(gray[900], 0.8),
              '&:hover': {
                borderColor: brand[300],
              },
              '&.Mui-focusVisible': {
                borderColor: brand[400],
                outline: `3px solid ${alpha(brand[500], 0.5)}`,
                outlineOffset: '2px',
              },
            }),
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: `${alpha(gray[200], 0.8)}`,
            ...theme.applyStyles("dark", {
              borderColor: `${alpha(gray[700], 0.4)}`,
            }),
          }),
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            typography: theme.typography.caption,
            marginBottom: 8,
          }),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({
            theme
          }) => ({
            color: brand[500],
            '&:hover': {
              backgroundColor: alpha(brand[300], 0.3),
              borderColor: brand[200],
            },
            ...theme.applyStyles("dark", {
              color: brand[200],
              '&:hover': {
                backgroundColor: alpha(brand[600], 0.3),
                borderColor: brand[700],
              },
            }),
            variants: [{
              props: {
                size: 'small'
              },
              style: {
                height: '2rem',
                width: '2rem',
              }
            }, {
              props: {
                size: 'medium'
              },
              style: {
                height: '2.5rem',
                width: '2.5rem',
              }
            }]
          }),
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            border: 'none',
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: ({ theme }) => ({
            color: brand[700],
            fontWeight: 500,
            position: 'relative',
            textDecoration: 'none',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: 0,
              height: '1px',
              bottom: 0,
              left: 0,
              backgroundColor: brand[200],
              opacity: 0.7,
              transition: 'width 0.3s ease, opacity 0.3s ease',
            },
            '&:hover::before': {
              width: '100%',
              opacity: 1,
            },
            '&:focus-visible': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '4px',
              borderRadius: '2px',
            },
            ...theme.applyStyles("dark", {
              color: brand[200],
            }),
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            border: 'none',
          },
          input: {
            paddingLeft: 10,
          },
          root: ({
            theme
          }) => ({
            'input:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 1000px ${brand[100]} inset, 0 0 0 1px ${brand[200]}`,
              maxHeight: '4px',
              borderRadius: '8px',
            },
            '& .MuiInputBase-input': {
              fontSize: '1rem',
              '&::placeholder': {
                opacity: 0.7,
                color: gray[500],
              },
            },
            boxSizing: 'border-box',
            flexGrow: 1,
            height: '40px',
            borderRadius: theme.shape.borderRadius,
            border: '1px solid',
            borderColor: alpha(gray[300], 0.8),
            boxShadow: '0 0 0 1.5px hsla(210, 0%, 0%, 0.02) inset',
            transition: 'border-color 120ms ease-in',
            backgroundColor: alpha(gray[100], 0.4),
            '&:hover': {
              borderColor: brand[300],
            },
            '&.Mui-focused': {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: '2px',
              borderColor: brand[400],
            },
            ...theme.applyStyles("dark", {
              'input:-webkit-autofill': {
                WebkitBoxShadow: `0 0 0 1000px ${brand[900]} inset, 0 0 0 1px ${brand[600]}`,
                maxHeight: '6px',
                borderRadius: '8px',
              },
              '& .MuiInputBase-input': {
                fontSize: '1rem',
                '&::placeholder': {
                  opacity: 1,
                  color: gray[500],
                },
              },
              borderColor: alpha(gray[700], 0.5),
              boxShadow: '0 0 0 1.5px hsl(210, 0%, 0%) inset',
              backgroundColor: alpha(gray[900], 0.8),
              transition: 'border-color 120ms ease-in',
              '&:hover': {
                borderColor: brand[300],
              },
              '&.Mui-focused': {
                borderColor: brand[400],
                outline: `3px solid ${alpha(brand[500], 0.5)}`,
                outlineOffset: '2px',
              }
            }),
            variants: [{
              props: {
                color: 'error'
              },
              style: {
                borderColor: red[200],
                color: red[500],
                '& + .MuiFormHelperText-root': {
                  color: red[500],
                },
              }
            }, {
              props: {
                color: 'error'
              },
              style: {
                ...theme.applyStyles("dark", {
                  borderColor: red[700],
                  color: red[300],
                  '& + .MuiFormHelperText-root': {
                    color: red[300],
                  },
                })
              }
            }]
          }),
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
      },
      MuiStack: {
        defaultProps: {
          useFlexGap: true,
        },
      },
      MuiStepConnector: {
        styleOverrides: {
          line: ({ theme }) => ({
            borderTop: '1px solid',
            borderColor: theme.palette.divider,
            flex: 1,
            borderRadius: '99px',
          }),
        },
      },
      MuiStepIcon: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: 'transparent',
            border: `1px solid ${gray[400]}`,
            width: 12,
            height: 12,
            borderRadius: '50%',
            '& text': {
              display: 'none',
            },
            '&.Mui-active': {
              border: 'none',
              color: theme.palette.primary.main,
            },
            '&.Mui-completed': {
              border: 'none',
              color: theme.palette.success.main,
            },
            ...theme.applyStyles("dark", {
              border: `1px solid ${gray[700]}`,
              '&.Mui-active': {
                border: 'none',
                color: theme.palette.primary.light,
              },
              '&.Mui-completed': {
                border: 'none',
                color: theme.palette.success.light,
              },
            }),
            variants: [
              {
                props: { completed: true },
                style: ({
                  width: 12,
                  height: 12
                }),
              },
            ]
          }),
        }
      },
      MuiStepLabel: {
        styleOverrides: {
          label: ({ theme }) => ({
            '&.Mui-completed': {
              opacity: 0.6,
              ...theme.applyStyles("dark", { opacity: 0.5 }),
            },
          }),
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
            boxShadow: `0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px ${alpha(brand[200], 0.5)}`,
            '& .Mui-selected': {
              color: brand[500],
            },
            ...theme.applyStyles("dark", {
              '& .Mui-selected': {
                color: 'hsl(0, 0%, 100%)',
              },
              boxShadow: `0 0 0 1px hsla(210, 0%, 0%, 0.5), 0 2px 12px ${alpha(brand[700], 0.5)}`,
            }),
          }),
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: '12px 16px',
            textTransform: 'none',
            borderRadius: theme.shape.borderRadius,
            fontWeight: 500,
            ...theme.applyStyles("dark", {
              color: gray[400],
              '&.Mui-selected': { color: brand[300] },
            }),
          }),
        },
      },
    },
  };
}
