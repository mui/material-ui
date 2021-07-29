/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import NextLink, { LinkProps } from 'next/link';
import { styled, alpha } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import SvgProductCore from 'docs/src/icons/SvgProductCore';
import SvgProductAdvanced from 'docs/src/icons/SvgProductAdvanced';
import SvgProductTemplates from 'docs/src/icons/SvgProductTemplates';
import SvgProductDesign from 'docs/src/icons/SvgProductDesign';
import SvgMuiX from 'docs/src/icons/SvgMuiX';

const Navigation = styled('nav')(({ theme }) => ({
  '& ul': {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'flex',
  },
  '& li': {
    color: theme.palette.text.secondary,
    ...theme.typography.body2,
    fontWeight: 600,
    '& > a, & > div': {
      display: 'inline-block',
      color: 'inherit',
      textDecoration: 'none',
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      '&:hover, &:focus': {
        backgroundColor:
          theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[50],
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'initial',
        },
      },
    },
    '& > div': {
      cursor: 'default',
    },
  },
}));

const PRODUCT_IDS = ['product-core', 'product-advanced', 'product-templates', 'product-design'];

type ProductSubMenuProps = {
  icon: React.ReactElement;
  name: React.ReactNode;
  description: React.ReactNode;
  href: LinkProps['href'];
} & Omit<JSX.IntrinsicElements['a'], 'ref'>;

const ProductSubMenu = React.forwardRef<HTMLAnchorElement, ProductSubMenuProps>(
  function ProductSubMenu({ icon, name, description, href, ...props }, ref) {
    return (
      <NextLink href={href} passHref>
        <Box
          component="a"
          ref={ref}
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: 2,
            '&:hover, &:focus': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.50',
              outline: 'none',
              '@media (hover: none)': {
                backgroundColor: 'initial',
                outline: 'initial',
              },
            },
          }}
          {...props}
        >
          <Box sx={{ px: 2 }}>{icon}</Box>
          <Box>
            <Typography color="text.primary" variant="body2" fontWeight={700}>
              {name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {description}
            </Typography>
          </Box>
        </Box>
      </NextLink>
    );
  },
);

export default function HeaderNavBar() {
  const [subMenuOpen, setSubMenuOpen] = React.useState(false);
  const [subMenuIndex, setSubMenuIndex] = React.useState<number | null>(null);
  const productsMenuRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (typeof subMenuIndex === 'number') {
      document.getElementById(PRODUCT_IDS[subMenuIndex])?.focus();
    }
  }, [subMenuIndex]);
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.target !== productsMenuRef.current && event.key === 'Tab') {
      event.preventDefault();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (event.target === productsMenuRef.current) {
        setSubMenuOpen(true);
      }
      setSubMenuIndex((prevValue) => {
        if (prevValue === null) return 0;
        if (prevValue === PRODUCT_IDS.length - 1) {
          return 0;
        }
        return prevValue + 1;
      });
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSubMenuIndex((prevValue) => {
        if (prevValue === null) return 0;
        if (prevValue === 0) {
          return PRODUCT_IDS.length - 1;
        }
        return prevValue - 1;
      });
    }
    if (event.key === 'Escape') {
      setSubMenuOpen(false);
      setSubMenuIndex(null);
    }
  }
  return (
    <Navigation>
      <ul role="menubar">
        <li
          role="none"
          onMouseOver={() => setSubMenuOpen(true)}
          onFocus={() => setSubMenuOpen(true)}
          onMouseOut={() => setSubMenuOpen(false)}
          onBlur={() => setSubMenuOpen(false)}
        >
          <div
            role="menuitem"
            tabIndex={0}
            id="products-menu"
            ref={productsMenuRef}
            aria-haspopup
            aria-expanded={subMenuOpen ? 'true' : 'false'}
            onKeyDown={handleKeyDown}
          >
            Products
          </div>
          <Popper
            open={subMenuOpen}
            anchorEl={productsMenuRef.current}
            transition
            placement="bottom-start"
            style={{ zIndex: 1200 }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  variant="outlined"
                  sx={{
                    minWidth: 498,
                    overflow: 'hidden',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'primaryDark.900' : 'background.paper',
                    boxShadow: (theme) =>
                      `0px 4px 20px ${
                        theme.palette.mode === 'dark'
                          ? alpha(theme.palette.background.paper, 0.72)
                          : 'rgba(170, 180, 190, 0.3)'
                      }`,
                    '& ul': {
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',
                    },
                    '& li:not(:last-of-type)': {
                      borderBottom: '1px solid',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.100',
                    },
                    '& a': { textDecoration: 'none' },
                  }}
                >
                  <ul role="menu">
                    <li role="none">
                      <ProductSubMenu
                        id={PRODUCT_IDS[0]}
                        role="menuitem"
                        href="/products/core"
                        icon={<SvgProductCore />}
                        name="Core"
                        description="Ready to use, forever free, out-of-the-box, components."
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                    <li role="none">
                      <ProductSubMenu
                        id={PRODUCT_IDS[1]}
                        role="menuitem"
                        href="/products/advanced"
                        icon={<SvgProductAdvanced />}
                        name={
                          <Box component="span" display="inline-flex" alignItems="center">
                            Advanced&nbsp; <SvgMuiX />
                          </Box>
                        }
                        description="Powerful components for your complex apps."
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                    <li role="none">
                      <ProductSubMenu
                        id={PRODUCT_IDS[2]}
                        role="menuitem"
                        href="/products/templates"
                        icon={<SvgProductTemplates />}
                        name="Templates"
                        description="Get a fully built template for you application."
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                    <li role="none">
                      <ProductSubMenu
                        id={PRODUCT_IDS[3]}
                        role="menuitem"
                        href="/products/design-kits"
                        icon={<SvgProductDesign />}
                        name="Design Kits"
                        description="Pick your favorite design tool to enjoy."
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                  </ul>
                </Paper>
              </Fade>
            )}
          </Popper>
        </li>
        <li role="none">
          <NextLink href="/">
            <a role="menuitem">Docs</a>
          </NextLink>
        </li>
        <li role="none">
          <NextLink href="/branding/pricing">
            <a role="menuitem">Pricing</a>
          </NextLink>
        </li>
        <li role="none">
          <NextLink href="/branding/about">
            <a role="menuitem">About us</a>
          </NextLink>
        </li>
      </ul>
    </Navigation>
  );
}
