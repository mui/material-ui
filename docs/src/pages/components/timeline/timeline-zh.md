---
title: React 时间轴组件
components: Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent
---

# Timeline 时间轴

<p class="description">时间轴组件按时间顺序来展示了一系列的事件。</p>

**请注意：**该组件不再出现在 [Material Design 指南](https://material.io/)中, 但 Material-UI 会继续支持此组件。

## 基础的时间轴

一个基本的时间轴，显示事件列表。

{{"demo": "pages/components/timeline/BasicTimeline.js"}}

## 靠右对齐的时间轴

您也可以将时间轴放置在事件的右侧。

{{"demo": "pages/components/timeline/RightAlignedTimeline.js"}}

## 交替的时间轴

时间轴可以显示在事件的两侧。

{{"demo": "pages/components/timeline/AlternateTimeline.js"}}

## Color 颜色

`TimelineDot（时间点）` 可以以不同的颜色呈现。

{{"demo": "pages/components/timeline/ColorsTimeline.js"}}

## 描边

{{"demo": "pages/components/timeline/OutlinedTimeline.js"}}

## 相反的内容

时间线可以在另外一侧呈现内容。

{{"demo": "pages/components/timeline/OppositeContentTimeline.js"}}

## 定制的时间轴

以下是自定义组件的一个示例。 您可以在 [重写文档页面](/customization/components/) 中了解更多有关此内容的信息。

{{"demo": "pages/components/timeline/CustomizedTimeline.js"}}
