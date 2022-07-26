---
product: joy-ui
title: React Tabs component
githubLabel: 'component: tabs'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/
unstyled: /base/react-tabs/
---

# Tabs

<p class="description">Tabs make it easy to explore and switch between different views.</p>

Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Introduction

{{"demo": "TabsUsage.js", "hideToolbar": true}}

Joy UI provides four menu-related components:

- `Tabs`: A context provider that synchronize the selected `Tab` with the correspond `TabPanel`.
- `TabList`: A container that consists of `Tab` items.
- `Tab`: A button for toggle a selected tab.
- `TabPanel` A pane that displays on the screen when its value matches with the selected tab.

## Component

### Basic

The simplest way to render the tabs is to follow this structure.

{{"demo": "BasicTabs.js"}}
