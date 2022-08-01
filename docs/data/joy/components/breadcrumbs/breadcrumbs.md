---
product: joy-ui
title: React Breadcrumbs component
---

# Breadcrumbs

<p class="description">Breadcrumbs consist of a list of links that help a user visualize a page's location within the hierarchical structure of a website, and allow navigation up to any of its "ancestors".</p>

## Introduction

The `Breadcrumbs` shows where in the site hierarchy the user is.

{{"demo": "BreadcrumbsUsage.js", "hideToolbar": true}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Breadcrumbs from '@mui/joy/Breadcrumbs';

export default function MyApp() {
  return <Breadcrumbs />;
}
```

### Basic usage

`Breadcrumbs` is a navigation component that should be used with other components.
The most common components you'd use with it are `Typography` and `Link`.

{{"demo": "BasicBreadcrumbs.js"}}
