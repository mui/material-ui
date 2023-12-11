---
title: How MUI uses Toolpad?
description: Explore how we use Toolpad for production usecases at MUI.
date: 2023-12-15T00:00:00.000Z
authors: ['prakhargupta']
card: true
tags: ['Product', 'News']
---

Toolpad helps full-stack engineers build internal tools fast while staying in control. These tools are internal-facing data-intensive CRUD interfaces, analytics dashboards that make internal teams productive. Many MUI users start building internal tools from scratch using our core or advanced components. We have challenged this approach through a faster, low-code way of building admin apps through Toolpad.

At MUI, we have been dogfooding Toolpad to build and manage our internal tools effectively. This has proven to be beneficial so far, now we have centrally located apps for all internal use cases. We have built our public and private KPI dashboards and operations apps on Toolpad.

In this blog post, we’ll discuss our publicly available Toolpad app. It is hosted on render and can be checked from the image below:

<a href="https://tools-public.mui.com/prod/pages/OverviewPage">
<img alt="MUI public app for tracking KPIs" src="/static/blog/2023-toolpad-usage-in-mui/tools-public.png"  loading="lazy" width="2400" height="1394" />
</a>

:::info
Note: Majority of pages are used to track our KPIs. These are embedded as iframes in our [KPIs tracker](https://www.notion.so/mui-org/KPIs-1ce9658b85ce4628a2a2ed2ae74ff69c) notion page.
::::

## Problems we had before using Toolpad

1. Our internal tools were not organized and were like a sequence of instructions written on a Google doc/Notion.
2. These instructions required an end user to log into multiple services to update/manage their day-to-day chores.
3. We were leveraging pipedream, metabase, google sheets and other tools to manage day to day work. This meant we had distributed code at multiple places, and only a few had access to it.

Let’s analyze two pages that we have built for our internal use case:

## 1. Support key validator

We offer a priority support service to our MUI X premium customers. Through this offering they get the first response under an SLA of 24 hours. They share their issue through a **Priority Support: SLA** template on our repositories. Along with GitHub actions, we leverage the above Toolpad app to help our premium customers get the best support UX. When they create the issue, they are redirected to validate the key, and upon validation, the SLA count starts the issue is assigned the right labels.

   <a href="https://tools-public.mui.com/prod/pages/validateSupport">
    <img alt="Premium key validator support app" src="/static/blog/2023-toolpad-usage-in-mui/validate-support.png"  loading="lazy" width="2400" height="1394" />
    </a>

[Source code](https://github.com/mui/mui-public/blob/master/tools-public/toolpad/resources/updateMuiPaidSupport.ts)

The [updateMuiPaidSupport.ts](https://github.com/mui/mui-public/blob/master/tools-public/toolpad/resources/updateMuiPaidSupport.ts) file is created from Toolpad and uses the [custom function](https://mui.com/toolpad/concepts/custom-functions/) feature, it combines GitHub actions, Google Sheets and Octokit to read and verify provided information. Once the data is available on the Toolpad page, the required components can be dragged on the canvas and can be further bound to the the data using respective component props. It took one developer less than 2 hours to build the app. It uses [page parameters](https://mui.com/toolpad/concepts/page-properties/#page-parameters), [secrets handling](https://mui.com/toolpad/concepts/custom-functions/#secrets-handling), [shell removal](https://mui.com/toolpad/concepts/page-properties/#display-mode), and custom styling of a typography component as additional features of Toolpad.

## 2. Customer support KPI tracker

This is a read-only page that uses [HTTP requests](https://mui.com/toolpad/concepts/http-requests/) data source feature of Toolpad. Through the query builder UI we fetch our recent 100 support queries from Zendesk, then we calculate the average time we took to revert to the customers.

   <a href="https://tools-public.mui.com/prod/pages/zendeskFirstReply">
   <img alt="Zendesk first reply" src="/static/blog/2023-toolpad-usage-in-mui/zendesk.png"  loading="lazy" width="2400" height="1394" />
   </a>

This page uses [custom component](https://mui.com/toolpad/concepts/custom-components/) feature of Toolpad, we named this component a health badge and it used in other pages as well. Based on the metric, it has three states; color-coded Problem (red), Warning (yellow), or Ok (green). The value prop of this component is bound to a query output. Other KPI pages use pre-built charts component to compare stats, see trends, and spot anomalies.

## 3. Manage overdue invoices

We have an internal operations process to remind our customers who have invoices overdue. Based on the due date, a reminder email is required to be sent. Before, we used to use a combination of Metabase to fetch the data and Google Sheet to keep track of the progress, which lead to a lot of data inconsistencies issues. But now through Toolpad we managed to bring it all under one roof easing out the operations team's routine work, leading to increased productivity.

-- add video with staging data --

From the Toolpad app, the operations team sees a table for all customers who need to be contacted. They select one, email them from Zendesk, and update the status = CONTACTED. This is a CRUD app for internal use and we can't share the code but the following video gives a quick demo:

## What's next?

We are currently working on adding Authentication and authorization in Toolpad. We are also improving the UX. We are fixated on optimizing for the biggest pains that you face when building admin apps. You can help us by participating in our annual survey (-insert link-) as it will help us shape our [product roadmap](https://github.com/orgs/mui/projects/9/views/1).
