/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { CssVarsProvider, styled } from '@mui/joy/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import CheckCircle from '@mui/icons-material/CheckCircle';

const Prose = styled(Box)(({ theme }) => ({
  lineHeight: theme.vars.lineHeight.md,
  maxWidth: 692,
  '& p': {
    '--Typography-margin': '1.25em 0',
  },
  '& h1': {
    '--Typography-margin': '0 0 0.75em 0',
  },
  '& h2': {
    '--Typography-margin': '0 0 1em 0',
  },
  '& h3': {
    '--Typography-margin': '0 0 0.6em 0',
  },
}));

export default function ProsePage() {
  return (
    <CssVarsProvider defaultMode="system">
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          px: 5,
        }}
      >
        <Prose>
          <Typography level="body-sm">Tuesday, Nov 1, 2022</Typography>
          <Typography level="h1">An introduction to the MUI ecosystem</Typography>
          <Typography level="body-lg">
            Until now, trying to style an article, document, or blog post with Joy UI has been a
            tedious task that required a keen eye for typography and a lot of complex custom CSS.
          </Typography>
          <AspectRatio variant="outlined" sx={{ borderRadius: 'sm' }}>
            <img src="/static/blog/mui-product-comparison/ecosystem.png" alt="" />
          </AspectRatio>

          <Typography>MUI is so much more than Material UI!</Typography>
          <Typography>
            You'll be forgiven if you thought MUI was merely shorthand for our most popular product.
            In fact, MUI as an organization was founded to meet the growing needs of the Material UI
            community, and is now responsible for a whole suite of related products.
          </Typography>
          <Typography>
            Material UI is the flagship; but it's also the gateway to MUI's ever-expanding ecosystem
            of UI tools.
          </Typography>
          <Typography>
            Though our roots are in <Link href="https://material.io/">Material Design</Link>, we're
            branching out well beyond those constraints these days to deliver a wider range of tools
            for developers to ship new features faster.
          </Typography>
          <Typography>
            Our primary offerings fall into two product lines: Core and X. MUI Core contains our
            foundational component libraries (like Material UI), while MUI X offers components that
            are significantly more complex (like the Data Grid).
          </Typography>
          <Typography>
            We're also in the early stages of developing a low-code internal tool builder called MUI
            Toolpad, which enables you to build with every Core and X component in a drag-and-drop
            interface.
          </Typography>
          <Typography>Read on for more details on each of our products.</Typography>

          <Typography level="h2">MUI Core</Typography>

          <Typography>
            The Core is MUI's foundational product line. It grew out of Material UI, and that
            library's legacy lives on in the name of the repo on GitHub: mui/material-ui.
          </Typography>

          <Typography>
            But this repo contains much more than just Material UI these days. We've carefully
            deconstructed this library to expose its best parts as isolated open-source projects.
            More recent additions include Joy UI and MUI Base, as well as our in-house styling
            solution, MUI System.
          </Typography>

          <Typography>
            MUI Core is open-source, and we invite you to contribute wherever you see fit!
          </Typography>

          <Typography level="h3">Material UI</Typography>
          <Typography>
            Material UI is an open-source React component library that implements Google's Material
            Design. It includes a comprehensive collection of prebuilt components that are ready for
            use in production right out of the box.
          </Typography>

          <Typography>
            Material UI is beautiful by design and features a suite of customization options that
            make it easy to implement your own custom design system on top of our components.
          </Typography>

          <Typography>Get started in the Material UI docs.</Typography>

          <Typography level="h4">Key features</Typography>
          <List sx={{ pl: 2, '& > li': { display: 'list-item', listStyle: 'disc' } }}>
            <ListItem>
              <b>Material Design</b>: Your app will look and feel excellent by default, thanks to
              our meticulous implementation of Material Design (currently MD2; Material You is on
              the way).
            </ListItem>
            <ListItem>
              <b>Comprehensiveness</b>: With over 50 foundational components and counting, you've
              got everything you need to ship new features fast.
            </ListItem>
            <ListItem>
              <b>Maturity</b>: Material UI's age and maturity rival that of React itself, with its
              origins spanning all the way back to 2014.
            </ListItem>
            <ListItem>
              <b>Community</b>: Over 2,500 open-source contributors have made this library what it
              is today.
            </ListItem>
          </List>

          <Typography level="h4">Ideal use cases</Typography>
          <List sx={{ pl: 2, '& > li': { display: 'list-item', listStyle: 'disc' } }}>
            <ListItem>User interfaces that adhere closely to Material Design.</ListItem>
            <ListItem>Internal admin tools.</ListItem>
            <ListItem>Dev teams that need to ship features in hours rather than weeks.</ListItem>
          </List>
        </Prose>
        <Box
          sx={{
            flex: 1,
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(343px, 100%), 1fr))',
            gridAutoRows: 'min-content',
            alignItems: 'flex-start',
          }}
        >
          <Sheet variant="outlined" sx={{ display: 'flex', gap: 2, p: 2 }}>
            <CheckCircle fontSize="xl" />
            <div>
              <Typography level="title-sm">Title topic</Typography>
              <Typography level="body-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography component="div" sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <Typography level="body-sm" variant="outlined">
                  Lorem Ipsum
                </Typography>
                <Typography level="body-sm" variant="outlined">
                  Lorem Ipsum
                </Typography>
              </Typography>
            </div>
          </Sheet>
          <Sheet variant="outlined" sx={{ display: 'flex', gap: 2, p: 2 }}>
            <CheckCircle />
            <div>
              <Typography level="title-md">Title topic</Typography>
              <Typography>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
              </Typography>
              <Divider sx={{ mt: 1, mb: 1.5 }} />
              <Typography component="div" sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <Typography level="body-sm" variant="outlined">
                  Lorem Ipsum
                </Typography>
                <Typography level="body-sm" variant="outlined">
                  Lorem Ipsum
                </Typography>
              </Typography>
            </div>
          </Sheet>

          <Sheet variant="outlined" sx={{ display: 'flex', gap: 2, p: 2 }}>
            <CheckCircle fontSize="xl3" />
            <div>
              <Typography level="title-lg">Title topic</Typography>
              <Typography level="body-md">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
              </Typography>
              <Divider sx={{ mt: 1.5, mb: 2 }} />
              <Typography component="div" sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <Typography variant="outlined">Lorem Ipsum</Typography>{' '}
                <Typography variant="outlined">Lorem Ipsum</Typography>
              </Typography>
            </div>
          </Sheet>

          <Sheet variant="outlined" sx={{ display: 'flex', gap: 2, p: 2 }}>
            <CheckCircle fontSize="xl3" />
            <div>
              <Typography level="title-lg">Title topic</Typography>
              <Typography level="body-lg">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
              </Typography>
              <Divider sx={{ mt: 1.5, mb: 2 }} />
              <Typography component="div" sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <Typography variant="outlined">Lorem Ipsum</Typography>{' '}
                <Typography variant="outlined">Lorem Ipsum</Typography>
              </Typography>
            </div>
          </Sheet>

          <Card variant="outlined">
            <div>
              <Typography level="title-md" fontSize="md">
                Yosemite National Park
              </Typography>
              <Typography level="body-sm">April 24 to May 02, 2021</Typography>
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
              >
                <BookmarkAdd />
              </IconButton>
            </div>
            <AspectRatio minHeight="120px" maxHeight="200px">
              <img
                src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
            <CardContent orientation="horizontal">
              <div>
                <Typography level="body-sm">Total price:</Typography>
                <Typography level="title-lg">$2,900</Typography>
              </div>
              <Button
                variant="solid"
                size="sm"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: 'auto', fontWeight: 600 }}
              >
                Explore
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
