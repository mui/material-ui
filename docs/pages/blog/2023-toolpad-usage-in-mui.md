---
title: How MUI uses Toolpad?
description: Explore how we use Toolpad for production usecases at MUI.
date: 2023-12-15T00:00:00.000Z
authors: ['prakhargupta']
card: true
tags: ['Product', 'News']
---

Toolpad helps full-stack engineers build internal tools quickly. These are internal-facing data-intensive CRUD interfaces, analytics dashboards, and custom apps that make teams productive. Many MUI users build these from scratch using our core or advanced components. Through Toolpad, we interated on this approach through a low-code, GUI-based, code-friendly app builder that you can use locally and be more productive.

We have been dogfooding Toolpad at MUI to build our KPI dashboards and operations apps. It has proven beneficial as we now have well-organized, centrally located apps. In this blog post, we’ll discuss four such apps.

<a href="https://tools-public.mui.com/prod/pages/OverviewPage">
<img alt="MUI public app for tracking KPIs" src="/static/blog/2023-toolpad-usage-in-mui/tools-public.png"  loading="lazy" width="2400" height="1394" />
</a>

:::info
Note: Majority of pages are used to track our KPIs. These are embedded as iframes in our [KPIs tracker](https://www.notion.so/mui-org/KPIs-1ce9658b85ce4628a2a2ed2ae74ff69c) notion page.
::::

## Problems tacked through Toolpad

1. Our internal tooling is organized now; earlier, some apps were a set of instructions written on a Google doc/Notion.
2. These instructions required an end user to log into multiple services to update/manage their day-to-day chores. Now, one interface does it all.
3. We leveraged Pipedream, Metabase, Google Sheets and other tools to manage day-to-day work. It meant we had distributed code at multiple places, and only a few had access. Now, we have everything on GitHub, and collaboration is easier.

Let’s analyze four use cases below:

## 1. Support key validator

We offer a priority support service to our MUI X premium customers. Through this offering, they get the first response under an SLA of 24 hours. They share their issue through a **Priority Support: SLA** template on our repositories. When they create the issue, they are redirected to validate the key, and upon validation, the SLA count starts and the correct labels get assigned to the issue.

   <a href="https://tools-public.mui.com/prod/pages/validateSupport">
    <img alt="Premium key validator support app" src="/static/blog/2023-toolpad-usage-in-mui/validate-support.png"  loading="lazy" width="2400" height="1394" />
    </a>

[Source code](https://github.com/mui/mui-public/blob/master/tools-public/toolpad/resources/updateMuiPaidSupport.ts)

The [updateMuiPaidSupport.ts](https://github.com/mui/mui-public/blob/master/tools-public/toolpad/resources/updateMuiPaidSupport.ts) file is created from Toolpad and uses the [custom function](https://mui.com/toolpad/concepts/custom-functions/) feature; it combines GitHub actions, Google Sheets, and Octokit to read and verify user-provided information. Once the data is available on the Toolpad page, the components can be dragged on the canvas, and the required props can be further bound to the function output. It took one developer less than 2 hours to build the app. It uses [page parameters](https://mui.com/toolpad/concepts/page-properties/#page-parameters), [secrets handling](https://mui.com/toolpad/concepts/custom-functions/#secrets-handling), [shell removal](https://mui.com/toolpad/concepts/page-properties/#display-mode), and custom styling of a typography component as additional features of Toolpad.

## 2. Customer support KPI tracker

This read-only page uses [HTTP requests](https://mui.com/toolpad/concepts/http-requests/) data source feature of Toolpad. Through the query builder UI we fetch our recent 100 support queries from Zendesk, then we calculate the average time we took to revert to the customers. It uses a [custom component](https://mui.com/toolpad/concepts/custom-components/) which we call a 'health badge'. Based on the metric value, it shows three states: color-coded Problem (red), Warning (yellow), and OK (green). Other KPI pages also use this health badge and pre-built charts component to compare stats, see trends, and spot anomalies.

   <a href="https://tools-public.mui.com/prod/pages/zendeskFirstReply">
   <img alt="Zendesk first reply" src="/static/blog/2023-toolpad-usage-in-mui/zendesk.png"  loading="lazy" width="2400" height="1394" />
   </a>

We used Toolpad as Metabase doesn't allow importing data from REST APIs. It's possible in Google Sheets but it requires writing a lot of JS code and since we wanted to embed it in a [Notion page](https://www.notion.so/mui-org/KPIs-1ce9658b85ce4628a2a2ed2ae74ff69c), Toolpad was the ideal choice. Toolpad handles state management, routing and simplifies query building, data binding for developers.

## 3. Manage overdue invoices

We have an internal operations process to remind our customers who have invoices overdue. Based on the due date, a reminder email is required to be sent. From the Toolpad app, the operations team sees a table for all customers who need to be contacted. They select one, email them from Zendesk, and update the status = CONTACTED. This is a CRUD app for internal use and we can't share the code but the following video gives a quick demo:

-- add video with staging data --

Earlier, we used a combination of Metabase and Google Sheets to fetch and edit data and it would lead to a lot of data inconsistencies issues. But now through Toolpad we managed to bring it all under one roof, easing out our operations team's routine work, leading to increased productivity.

## 4. Contributor payout

We have a script to fetch monthly payout data for the contributors of MUI Store. Our operations team is responsible for the job but they can't run it and have to ask engineers to run it for them. The solution was to quickly import the script into Toolpad and create a UI for it. The below video shows the app, the output is a Slack copy that our team shares with our contributors:

  <video controls width="100%" height="auto" style="contain" alt="contributor payout page">
  <source src="/static/blog/2023-toolpad-usage-in-mui/contributor-payout.mp4" type="video/mp4">
  Your browser does not support the video tag.
  </video>

## What's next?

We are currently working on adding Authentication and authorization in Toolpad. We are also improving the UX. We are fixated on optimizing for the biggest pains that you face when building admin apps. You can help us by participating in our annual survey (-insert link-) as it will help us shape our [product roadmap](https://github.com/orgs/mui/projects/9/views/1).
