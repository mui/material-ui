/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { CssVarsProvider, styled } from '@mui/joy/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';

const Prose = styled(Container)(({ theme }) => ({
  lineHeight: theme.vars.lineHeight.md,
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
    <CssVarsProvider>
      <Prose sx={{ maxWidth: '692px !important' }}>
        <Typography level="body2">Tuesday, Nov 1, 2022</Typography>
        <Typography level="h1">An introduction to the MUI ecosystem</Typography>
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
          deconstructed this library to expose its best parts as isolated open-source projects. More
          recent additions include Joy UI and MUI Base, as well as our in-house styling solution,
          MUI System.
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
          Material UI is beautiful by design and features a suite of customization options that make
          it easy to implement your own custom design system on top of our components.
        </Typography>

        <Typography>Get started in the Material UI docs.</Typography>

        <Typography level="h4">Key features</Typography>
        <List sx={{ pl: 2, '& > li': { display: 'list-item', listStyle: 'disc' } }}>
          <ListItem>
            <b>Material Design</b>: Your app will look and feel excellent by default, thanks to our
            meticulous implementation of Material Design (currently MD2; Material You is on the
            way).
          </ListItem>
          <ListItem>
            <b>Comprehensiveness</b>: With over 50 foundational components and counting, you've got
            everything you need to ship new features fast.
          </ListItem>
          <ListItem>
            <b>Maturity</b>: Material UI's age and maturity rival that of React itself, with its
            origins spanning all the way back to 2014.
          </ListItem>
          <ListItem>
            <b>Community</b>: Over 2,500 open-source contributors have made this library what it is
            today.
          </ListItem>
        </List>

        <Typography level="h4">Ideal use cases</Typography>
        <List sx={{ pl: 2, '& > li': { display: 'list-item', listStyle: 'disc' } }}>
          <ListItem>User interfaces that adhere closely to Material Design.</ListItem>
          <ListItem>Internal admin tools.</ListItem>
          <ListItem>Dev teams that need to ship features in hours rather than weeks.</ListItem>
        </List>
      </Prose>
    </CssVarsProvider>
  );
}
