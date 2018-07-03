---
components: RefreshIndicator
---

# Refresh Indicators

A `RefreshIndicator` is used to indicate pull-to-refresh behavior.

## Ready

The `ready` status can be used in response to a pull-to-refresh action, with the `percentage` tracking the depth of the "pull". The `size` property determines the icon size in pixels, and the `color` property its color when pulled down.

{{"demo": "pages/lab/refresh-indicator/ReadyIndicator.js"}}

## Loading

The `loading` status displays an indeterminate indicator, intended to to be used while content is loading. The `color` determines the indicator color.

{{"demo": "pages/lab/refresh-indicator/LoadingIndicator.js"}}
