# Migration from v4 to v5

<p class="description">Yeah, v5 has been released!</p>

Looking for the v4 docs? [Find them here](https://material-ui.com/versions/).

> This document is a work in progress.
> Have you upgraded your site and run into something that's not covered here?
> [Add your changes on GitHub](https://github.com/mui-org/material-ui/blob/master/docs/src/pages/guides/migration-v3/migration-v3.md).

## Introduction

This is a reference for upgrading your site from Material-UI v4 to v5.
While there's a lot covered here, you probably won't need to do everything for your site.
We'll do our best to keep things easy to follow, and as sequential as possible so you can quickly get rocking on v5!

## Why you should migrate

This documentation page covers the _how_ of migrating from v4 to v5.
The _why_ is covered in the [release blog post on Medium](https://medium.com/material-ui/material-ui-v4-is-out-4b7587d1e701).

## Updating your dependencies

The very first thing you will need to do is to update your dependencies.

### Update Material-UI version

You need to update your `package.json` to use the latest version of Material-UI.

```json
"dependencies": {
  "@material-ui/core": "^5.0.0"
}
```

Or run

```sh
npm install @material-ui/core

or

yarn add @material-ui/core
```

## Handling breaking changes

### BottomNavigation

- typescript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.
  ```diff
  -<BottomNavigation onChange={(event: React.ChangEvent<{}>) => {}} />
  +<BottomNavigation onChange={(event: React.SyntheticEvent) => {}} />
  ```

### Divider

- Use border instead of background color. It prevents inconsistent height on scaled screens. For people customizing the color of the border, the change requires changing the override CSS property:

  ```diff
  .MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### Rating

- Rename `visuallyhidden` to `visuallyHidden`

```diff
<Rating
  classes={{
-    visuallyhidden: 'custom-visually-hidden-classname',
+    visuallyHidden: 'custom-visually-hidden-classname',
  }}
/>
```

### Slider

- typescript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.
  ```diff
  -<Slider onChange={(event: React.ChangEvent<{}>, value: unknown) => {}} />
  +<Slider onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  ```

### TablePagination

- The customization of the table pagination's actions labels must be done with the `getItemAriaLabel` prop.

  ```diff
  <TablePagination
  - backIconButtonText="Avant"
  - nextIconButtonText="Après
  + getItemAriaLabel={…}
  ```

### Tabs

- typescript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.
  ```diff
  -<Tabs onChange={(event: React.ChangEvent<{}>, value: unknown) => {}} />
  +<Tabs onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  ```

### Typography

- Replace `srOnly` prop support with a style util:

  ```diff
  -import Typography from '@material-ui/core/Typography';
  +import { visuallyHidden } from '@material-ui/system';
  +import styled from 'styled-component';

  +const Span = styled('span')(visuallyHidden);

  -<Typography variant="srOnly">Create a user</Typography>
  +<Span>Create a user</Span>
  ```

### Expansion Panel

- Rename the `ExpansionPanel` components with `Accordion` to match the naming convention of the community:

  ```diff
  -import ExpansionPanel from '@material-ui/core/ExpansionPanel';
  -import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
  -import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
  -import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
  +import Accordion from '@material-ui/core/Accordion';
  +import AccordionSummary from '@material-ui/core/AccordionSummary';
  +import AccordionDetails from '@material-ui/core/AccordionDetails';
  +import AccordionActions from '@material-ui/core/AccordionActions';  

  -<ExpansionPanel>
  +<Accordion>
  -  <ExpansionPanelSummary>  
  +  <AccordionSummary>
       <Typography>Location</Typography>
       <Typography>Select trip destination</Typography>
  -  </ExpansionPanelSummary>  
  +  </AccordionSummary>
  -  <ExpansionPanelDetails>
  +  <AccordionDetails>
       <Chip label="Barbados" onDelete={() => {}} />
       <Typography variant="caption">Select your destination of choice</Typography>
  -  </ExpansionPanelDetails>  
  +  </AccordionDetails>
     <Divider />
  -  <ExpansionPanelActions>  
  +  <AccordionActions>
       <Button size="small">Cancel</Button>
       <Button size="small" color="primary">Save</Button>
  -  </ExpansionPanelActions>   
  +  </AccordionActions>
  -</ExpansionPanel>
  +</Accordion>
  ```

- typescript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.
  ```diff
  -<Accordion onChange={(event: React.ChangEvent<{}>, expanded: boolean) => {}} />
  +<Accordion onChange={(event: React.SyntheticEvent, expanded: boolean) => {}} />
  ```
