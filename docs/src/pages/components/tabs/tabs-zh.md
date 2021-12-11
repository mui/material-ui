---
title: React Tabs（选项卡）组件
components: Tabs, Tab, TabScrollButton, TabContext, TabList, TabPanel, TabsUnstyled, TabUnstyled, TabPanelUnstyled, TabsListUnstyled
githubLabel: 'component: Tabs'
materialDesign: https://material.io/components/tabs
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#tabpanel'
---

# Tabs 选项卡

<p class="description">使用选项卡，你可以轻松地浏览和切换不同的视图。</p>

对于在同一层次，并且息息相关的内容组，使用选项卡能够将它们分组并且在其之间切换。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基础选项卡

A basic example with tab panels.

{{"demo": "pages/components/tabs/BasicTabs.js"}}

## 实验性的 API

`@mui/lab` offers utility components that inject props to implement accessible tabs following [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/#tabpanel).

{{"demo": "pages/components/tabs/LabTabs.js"}}

## 包装的标签

对于那些比较长的标签，它们会被自动包装成选项卡。 If the label is too long for the tab, it will overflow, and the text will not be visible.

{{"demo": "pages/components/tabs/TabsWrappedLabel.js"}}

## Colored tab

{{"demo": "pages/components/tabs/ColorTabs.js"}}

## 禁用选项卡

A tab can be disabled by setting the `disabled` prop.

{{"demo": "pages/components/tabs/DisabledTabs.js"}}

## 固定的选项卡

Fixed tabs should be used with a limited number of tabs, and when a consistent placement will aid muscle memory.

### 全宽

若是较小的视图，则应使用 `variant="fullWidth"` 属性。 在这个演示中你还可以借鉴用 [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) 来设置选项卡的过渡动画，并且在使用触摸设备时滑动标签。

{{"demo": "pages/components/tabs/FullWidthTabs.js", "bg": true}}

### 居中对齐

而对于较大的视图，则应使用 `centered` 此属性。

{{"demo": "pages/components/tabs/CenteredTabs.js", "bg": true}}

## 可滚动的选项卡

### 自动显示滚动按钮

左右滚动按钮将自动在桌面显示，并在移动设备上隐藏。 （基于视图宽度）

{{"demo": "pages/components/tabs/ScrollableTabsButtonAuto.js", "bg": true}}

### 强制显示滚动按钮

通过使用 `scrollButtons={true}` `allowScrollButtonsMobile` 属性，无论当前视图宽度如何，都会显示左右的滚动按钮（保留空间）

{{"demo": "pages/components/tabs/ScrollableTabsButtonForce.js", "bg": true}}

如果你想确保按钮始终可见，那么你应该自定义不透明度：

```css
.MuiTabs-scrollButtons.Mui-disabled {
  opacity: 0.3;
}
```

{{"demo": "pages/components/tabs/ScrollableTabsButtonVisible.js", "bg": true}}

### 永久隐藏滚动按钮

你可以使用 `scrollButtons={false}` 属性来永远隐藏左右的滚动按钮。 All scrolling must be initiated through user agent scrolling mechanisms (e.g. left/right swipe, shift mouse wheel, etc.)

{{"demo": "pages/components/tabs/ScrollableTabsButtonPrevent.js", "bg": true}}

## Customization

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/how-to-customize/).

{{"demo": "pages/components/tabs/CustomizedTabs.js"}}

🎨 如果您还在寻找灵感，您可以看看 [MUI Treasury 特别定制的一些例子](https://mui-treasury.com/styles/tabs/)。

## 垂直的选项卡

使用 `orientation="vertical"` 来使垂直标签代替默认的水平标签。

{{"demo": "pages/components/tabs/VerticalTabs.js", "bg": true}}

请注意，你可以使用 `visibleScrollbar` 来恢复显示滚动条。

## Nav tabs

By default, tabs use a `button` element, but you can provide your custom tag or component. 下面是一个实现导航选项卡的例子：

{{"demo": "pages/components/tabs/NavTabs.js"}}

## Icon tabs

选项卡的标签可以是所有的图标或者所有的文本。

{{"demo": "pages/components/tabs/IconTabs.js"}}

{{"demo": "pages/components/tabs/IconLabelTabs.js"}}

## Icon position

By default, the icon is positioned at the `top` of a tab. Other supported positions are `start`, `end`, `bottom`.

{{"demo": "pages/components/tabs/IconPositionTabs.js"}}

## Third-party routing library

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. The `Tab` component provides the `component` prop to handle this use case. Here is a [more detailed guide](/guides/routing/#tabs).

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tabpanel)

您需要采取以下步骤，来为无障碍技术提供一些必要的信息：

1. 在 `Tabs` 上应用 `aria-label` 或 `aria-labelledby` 标签。
2. 通过设置 `id`、`aria-controls` 和 `aria-labelledby` ，`Tab` 需要连接到其对应的 `[role="tabpanel"]`。

实现这样的设计例子可以在本页面的演示中找到。 We've also published [an experimental API](#experimental-api) in `@mui/lab` that does not require extra work.

### 键盘导航

该组件使用“手动激活”的行为来实现键盘导航。 如果你想切换到“选择自动跟随焦点”（selection automatically follows focus）的行为，你必须将 `selectionFollowsFocus` 传递给 `Tabs` 组件。 WAI-ARIA 项目实践中有一个详细的指南关于  [how to decide when to make selection automatically follow focus](https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus)。

#### 演示

下面的两个演示只是在键盘导航行为上有所区别。 Focus a tab and navigate with arrow keys to notice the difference, e.g. <kbd class="key">Arrow Left</kbd>.

```jsx
/* Tabs where selection follows focus */
<Tabs selectionFollowsFocus />
```

{{"demo": "pages/components/tabs/AccessibleTabs1.js", "defaultCodeOpen": false}}

```jsx
/* Tabs where each tab needs to be selected manually */
<Tabs />
```

{{"demo": "pages/components/tabs/AccessibleTabs2.js", "defaultCodeOpen": false}}

## Unstyled

The Tabs also come with an unstyled version. It's ideal for doing heavy customizations and minimizing bundle size.

### Unstyled component

```js
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
```

{{"demo": "pages/components/tabs/UnstyledTabsBasic.js"}}

#### Customizing the root element

By default, the `TabUnstyled` renders a native `button` element. You are free to override this by setting the `component` or `components.Root` prop. If a non-interactive element (such as a span) is provided this way, the `TabUnstyled` will take care of adding accessibility attributes.

The `TabPanelUnstyled` on the other hand renders a native `div` element by default. You are free to override this as well by setting the `component` or `components.Root` prop on the `TabPanelUnstyled`.

{{"demo": "pages/components/tabs/UnstyledTabsCustomized.js"}}
