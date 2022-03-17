/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Sheet from '@mui/joy/Sheet';
import Info from '@mui/icons-material/InfoOutlined';
import HistoryEdu from '@mui/icons-material/HistoryEdu';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import ViewCompact from '@mui/icons-material/ViewCompact';
import PermMedia from '@mui/icons-material/PermMedia';
import Extension from '@mui/icons-material/Extension';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Settings from '@mui/icons-material/Settings';
import Apps from '@mui/icons-material/Apps';
import VpnKey from '@mui/icons-material/VpnKey';
import Webhook from '@mui/icons-material/Webhook';
import Add from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import Visibility from '@mui/icons-material/Visibility';
import Person from '@mui/icons-material/Person';
import Badge from 'docs/src/_experiment/joy/Badge';

export default function WebhookPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.level1',
        display: 'flex',
        my: '5rem',
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: 65,
          display: 'flex',
          flexDirection: 'column',
          borderWidth: '0 1px 0 0',
        }}
      >
        <Box
          sx={{
            px: '0.75rem',
            py: '1rem',
            borderBottom: '1px solid',
            borderColor: 'neutral.outlinedBorder',
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--XsZRGi5O--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/763/988af53b-5d7e-435a-98eb-dd4aff5299d2.png"
            sx={{
              borderRadius: '4px',
              width: 40,
              height: 40,
              display: 'block',
            }}
          />
        </Box>
        <List
          size="sm"
          sx={{
            flexGrow: 1,
            '--List-padding': '12px',
            '--List-radius': '8px',
            '--List-gap': '8px',
            '--List-divider-gap': '8px',
            '& .MuiListItemDecorator-root': {
              justifyContent: 'center',
            },
          }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <HistoryEdu />
              </ListItemDecorator>
            </ListItemButton>
          </ListItem>
          <ListDivider inset="gutter" />
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <ViewCompact />
              </ListItemDecorator>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <PermMedia />
              </ListItemDecorator>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Info />
              </ListItemDecorator>
            </ListItemButton>
          </ListItem>
          <ListDivider inset="gutter" />
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <Extension />
              </ListItemDecorator>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <ShoppingCart />
              </ListItemDecorator>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton selected variant="light" sx={{ position: 'relative' }}>
              <Badge
                variant="contained"
                sx={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-8px',
                }}
              >
                2
              </Badge>
              <ListItemDecorator>
                <Settings />
              </ListItemDecorator>
            </ListItemButton>
          </ListItem>
        </List>
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'neutral.outlinedBorder',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            py: '1.5rem',
            px: '1rem',
          }}
        >
          <Avatar size="sm">SK</Avatar>
          <Button
            color="neutral"
            variant="outlined"
            size="sm"
            sx={{
              px: 0,
              position: 'absolute',
              right: '-10px',
              bgcolor: 'background.body',
            }}
          >
            <KeyboardArrowRight />
          </Button>
        </Box>
      </Sheet>
      <Box
        sx={{
          width: 230,
          borderRight: '1px solid',
          borderColor: (theme) => theme.vars.palette.neutral.outlinedBorder,
        }}
      >
        <nav aria-labelledby="settings">
          <Box sx={{ py: '1.5rem', px: '1.5rem' }}>
            <Typography id="settings" level="header2">
              <b>Settings</b>
            </Typography>
          </Box>
          <Box
            sx={{
              ml: '1.5rem',
              borderBottom: '1px solid',
              borderColor: 'neutral.outlinedBorder',
              width: '24px',
            }}
          />
          <List
            aria-labelledby="settings"
            size="sm"
            sx={{
              mt: 2,
              pl: '22px',
              '--List-background': 'initial',
              '--List-nestedInsetStart': '0px',
              '--List-gap': '16px',
              '--List-decorator-width': '26px',
              '& .MuiListItemButton-root.Mui-selected': {
                borderRight: '1px solid',
                borderColor: 'currentColor',
              },
            }}
          >
            <ListItem nested>
              <ListItem
                id="global-settings"
                component="div"
                sx={{ typography: 'tableLabel', color: 'text.secondary', mb: 0.5 }}
              >
                Global settings
              </ListItem>
              <List aria-labelledby="global-settings" sx={{ '--List-gap': '0px' }}>
                <ListItem>
                  <ListItemButton>
                    <ListItemDecorator>
                      <Apps />
                    </ListItemDecorator>
                    Application
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemDecorator>
                      <VpnKey />
                    </ListItemDecorator>
                    API Tokens
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemDecorator>
                      <HistoryEdu />
                    </ListItemDecorator>
                    Content manager
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton variant="light" selected>
                    <ListItemDecorator>
                      <Webhook />
                    </ListItemDecorator>
                    Webhooks
                  </ListItemButton>
                </ListItem>
              </List>
            </ListItem>
            <ListItem nested>
              <ListItem
                id="admin-panel"
                component="div"
                sx={{ typography: 'tableLabel', color: 'text.secondary', mb: 0.5 }}
              >
                Administration panel
              </ListItem>
              <List aria-labelledby="admin-panel" sx={{ '--List-gap': '0px' }}>
                <ListItem>
                  <ListItemButton>
                    <ListItemDecorator>
                      <Visibility />
                    </ListItemDecorator>
                    Roles
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemDecorator>
                      <Person />
                    </ListItemDecorator>
                    Users
                  </ListItemButton>
                </ListItem>
              </List>
            </ListItem>
          </List>
        </nav>
      </Box>
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Box
          sx={{
            px: '3.5rem',
            pt: '2.25rem',
            pb: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Typography level="header1">Webhooks</Typography>
            <Typography color="text.tertiary">Get POST changes notifications</Typography>
          </div>
          <Button startIcon={<Add />} sx={{ alignSelf: 'center' }}>
            Add new webhook
          </Button>
        </Box>
        <Box sx={{ px: '3.5rem', pb: '1rem', width: 400 }}>
          <Sheet>
            <Input
              placeholder="Search for an entry"
              startAdornment={<Search fontSize="md" sx={{ color: 'text.primary' }} />}
              sx={{ '--Input-minHeight': '2rem' }}
            />
          </Sheet>
        </Box>
        <Box sx={{ px: '3.5rem', pb: '1rem' }}>
          <Sheet
            sx={{
              display: 'grid',
              gridTemplateColumns: 'min-content minmax(100px, 20%) 1fr 12% min-content',
              boxShadow: 'sm',
              borderRadius: 'xs',
              '& > div': {
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              },
              '& > div:nth-child(6n + 1)': {
                pl: '24px',
                py: '18px',
                pr: '18px',
              },
              '& > div:nth-child(6n + 5)': {
                pr: '1rem',
              },
            }}
          >
            <Box>
              <Checkbox />
            </Box>
            <Box>
              <Link component="button" variant="light" level="tableLabel">
                Name <ArrowDropDown />
              </Link>
            </Box>
            <Box>
              <Link component="button" color="neutral" level="tableLabel">
                URL <ArrowDropDown />
              </Link>
            </Box>
            <Box>
              <Link component="button" color="neutral" level="tableLabel">
                Status <ArrowDropDown />
              </Link>
            </Box>
            <Box />
            <Box
              sx={{
                gridColumn: '1 / -1',
                mx: '0.75rem',
                borderBottom: '1px solid',
                borderColor: 'neutral.outlinedBorder',
                opacity: 0.5,
              }}
            />
            <Box>
              <Checkbox />
            </Box>
            <Box>
              <Typography level="bodyHighlight">Gatsby</Typography>
            </Box>
            <Box>
              <Typography>https://www.gatsbyjs.com/features/jamstack/875ggfDq54juhn98/</Typography>
            </Box>
            <Box>
              <Switch checked />{' '}
              <Typography level="smallText" color="success.textColor">
                Enabled
              </Typography>
            </Box>
            <Box>
              <Button variant="text" color="neutral">
                <Edit fontSize="md" />
              </Button>
              <Button variant="text" color="neutral">
                <Delete fontSize="md" />
              </Button>
            </Box>
            <Box
              sx={{
                gridColumn: '1 / -1',
                mx: '0.75rem',
                borderBottom: '1px solid',
                borderColor: 'neutral.outlinedBorder',
                opacity: 0.5,
              }}
            />
            <Box>
              <Checkbox />
            </Box>
            <Box>
              <Typography level="bodyHighlight">Netlify</Typography>
            </Box>
            <Box>
              <Typography>https://www.gatsbyjs.com/features/jamstack/875ggfDq54juhn98/</Typography>
            </Box>
            <Box>
              <Switch />{' '}
              <Typography level="smallText" color="danger.textColor">
                Disabled
              </Typography>
            </Box>
            <Box>
              <Button variant="text" color="neutral">
                <Edit fontSize="md" />
              </Button>
              <Button variant="text" color="neutral">
                <Delete fontSize="md" />
              </Button>
            </Box>
            <Box
              sx={{
                gridColumn: '1 / -1',
                mx: '0.75rem',
                borderBottom: '1px solid',
                borderColor: 'neutral.outlinedBorder',
                opacity: 0.5,
              }}
            />
            <Box>
              <Checkbox />
            </Box>
            <Box>
              <Typography level="bodyHighlight">Blog</Typography>
            </Box>
            <Box>
              <Typography>https://www.gatsbyjs.com/features/jamstack/875ggfDq54juhn98/</Typography>
            </Box>
            <Box>
              <Switch />{' '}
              <Typography level="smallText" color="danger.textColor">
                Disabled
              </Typography>
            </Box>
            <Box>
              <Button variant="text" color="neutral">
                <Edit fontSize="md" />
              </Button>
              <Button variant="text" color="neutral">
                <Delete fontSize="md" />
              </Button>
            </Box>
            <Box
              sx={{
                gridColumn: '1 / -1',
                mx: '0.75rem',
                borderBottom: '1px solid',
                borderColor: 'neutral.outlinedBorder',
                opacity: 0.5,
              }}
            />
            <Button
              variant="light"
              startIcon={
                <Box
                  sx={{
                    borderRadius: '50%',
                    display: 'inline-flex',
                    p: '0.25rem',
                    bgcolor: 'primary.lightHoverBg',
                  }}
                >
                  <Add />
                </Box>
              }
              sx={{
                '--Button-iconOffsetStep': 0,
                '--Button-gap': '1rem',
                p: '20px',
                justifyContent: 'flex-start',
                gridColumn: '1 / -1',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
            >
              Add new webhook
            </Button>
          </Sheet>
        </Box>
      </Box>
    </Box>
  );
}
