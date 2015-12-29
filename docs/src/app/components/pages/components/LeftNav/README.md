## Left Nav

The [Left Nav](https://www.google.com/design/spec/patterns/navigation-drawer.html) slides in from the left.
It is a common pattern found in Google apps and follows the keylines and metrics for lists.

The API of `LeftNav` has been changed to be declarative and composable.
The methods `close()`, `open()` and `toggle()` have been deprecated.
In order to control the `LeftNav` use the `open` property
and handle the `onRequestChange` event. Also, as you have
noticed there are no examples for uncontrolled mode.
That is because uncontrolled `LeftNav` can only be opened
with swipe. The doc site has an uncontrolled `LeftNav`,
swipe left with a touch device to see it.
Also, `menuItems` and all related props have been deprecated too.
As a result, it is now possible to shape the contents of
`LeftNav` however you wish.

### Examples
