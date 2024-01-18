---
title: How MUI uses Toolpad?
description: Explore how we use Toolpad for production use cases at MUI.
date: 2024-01-15T00:00:00.000Z
authors: ['prakhargupta']
card: true
tags: ['Product', 'News']
---

Toolpad helps full-stack engineers build internal tools quickly.
Internal tools encompass data-intensive CRUD interfaces, analytics dashboards, or custom apps that make teams productive.
Toolpad offers a low-code, GUI-based, code-friendly way of building apps and comes as a node package that can be imported in an existing codebase.

We have been dogfooding Toolpad at MUI to build our internal tools.
It has proven beneficial as we now have well-organized, centrally located KPI dashboards and operations apps. In this blog post, we'll discuss four such apps.

<a href="https://tools-public.mui.com/prod/pages/OverviewPage">
<img alt="MUI public app for tracking KPIs" src="/static/blog/2023-toolpad-usage-in-mui/tools-public.png"  loading="lazy" width="2400" height="1394" />
</a>

## Problems tacked through Toolpad

1. Our internal tooling is easy to use and less error prone now; earlier, some apps were a set of instructions written on a Google doc/Notion.
2. A user had to log into multiple services to update/manage their day-to-day chores. Now, one interface does it all.
3. We utilized Pipedream, Metabase, Google Sheets, and other tools to streamline our day-to-day operations.
   It meant we had distributed code at multiple places accessible to only a few.
   Now, we have everything on GitHub, and collaboration is easier.

Let's delve into four scenarios that Toolpad has successfully addressed:

## 1. Support key validator

We offer a priority support service to our MUI X premium customers, for their queries they get an expedited response under an SLA of 24 hours.
They share their issue through a **Priority Support: SLA** template on our repositories.
Upon creating an issue, they are redirected to validate the key, and upon validation, the SLA count starts and the correct labels get assigned to the issue.

   <a href="https://tools-public.mui.com/prod/pages/validateSupport">
    <img alt="Premium key validator support app" src="/static/blog/2023-toolpad-usage-in-mui/validate-support.png"  loading="lazy" width="2400" height="1394" />
    </a>

[Source code](https://github.com/mui/mui-public/blob/master/tools-public/toolpad/resources/updateMuiPaidSupport.ts)

The [updateMuiPaidSupport.ts](https://github.com/mui/mui-public/blob/master/tools-public/toolpad/resources/updateMuiPaidSupport.ts) file hosts all functions that are called from Toolpad.
It uses the [custom function](https://mui.com/toolpad/concepts/custom-functions/) feature and combines GitHub actions, Google Sheets, and Octokit to read and verify user-provided information.
The fetched data is then bound to the UI components.
It took one developer a few hours to build the app.
It uses [page parameters](https://mui.com/toolpad/concepts/page-properties/#page-parameters), [secrets handling](https://mui.com/toolpad/concepts/custom-functions/#secrets-handling), [shell removal](https://mui.com/toolpad/concepts/page-properties/#display-mode), and custom styling as additional features of Toolpad.

## 2. Customer support KPI tracker

The read-only page below uses [HTTP requests](https://mui.com/toolpad/concepts/http-requests/) data source feature of Toolpad.
Through the query builder UI we fetch the latest 100 support requests from Zendesk to calculate the average time we took to revert to the customers.
It uses a [custom component](https://mui.com/toolpad/concepts/custom-components/) which we named as 'health badge'.
Based on the metric value, the component shows three color-coded states: Problem (red), Warning (yellow), and OK (green).
Other KPI pages also use this health badge and pre-built charts component to compare stats, see trends, and spot anomalies.

   <a href="https://tools-public.mui.com/prod/pages/zendeskFirstReply">
   <img alt="Zendesk first reply" src="/static/blog/2023-toolpad-usage-in-mui/zendesk.png"  loading="lazy" width="2400" height="1394" />
   </a>

The above app in dev mode below:

  <video controls width="100%" height="auto" style="contain" alt="zendesk first reply in devmode">
  <source src="/static/blog/2023-toolpad-usage-in-mui/zendesk-first-reply-dev.mp4" type="video/mp4">
  Your browser does not support the video tag.
  </video>

We opted for Toolpad since Metabase doesn't support importing data from REST APIs.
It's possible in Google Sheets but it requires writing a lot of JS code and since we wanted to embed it in a [Notion page](https://www.notion.so/mui-org/KPIs-1ce9658b85ce4628a2a2ed2ae74ff69c#3974cb6ed12b4c5a9013bac63113e3bc), Toolpad was the ideal choice.
Toolpad handles state management, routing and simplifies query building, data binding, and removes the need to write glue code.

You can explore the above two apps in dev mode in your local by running the underlying [node app](https://github.com/mui/mui-public/tree/master/tools-public). The next two apps are private to MUI.

## 3. Manage overdue invoices

We have an internal operations process to remind our customers who have invoices overdue.
Based on the due date, a reminder email is required to be sent.
From the Toolpad app, the operations team sees a table for all customers who need to be contacted.
They select one, email them from Zendesk, and update the status = CONTACTED, which is then written back to the database.
This is a private app for internal use and can't be shared but the following video gives a quick demo:

<video controls width="100%" height="auto" style="contain" alt="overdue invoice page">
  <source src="/static/blog/2023-toolpad-usage-in-mui/overdue-invoice.mp4" type="video/mp4">
  Your browser does not support the video tag.
  </video>

Earlier, we used a combination of Metabase and Google Sheets to fetch and edit records but it was cumbersome to operate and sometimes caused data inconsistency issues.
Now through Toolpad we managed to bring it all under one roof, easing out our operations team's routine work, leading to increased productivity.

## 4. Contributor payout

We have a script to fetch monthly payout data for the contributors of MUI Store.
Our operations team is responsible for the task but they can't run the script and had to ask engineers to run it for them.
The solution was to import the script into Toolpad and create a UI for it.
The below video shows the app, on choosing the dates, the script runs and the output is a Slack copy that our team shares with our contributors:

  <video controls width="100%" height="auto" style="contain" alt="contributor payout page">
  <source src="/static/blog/2023-toolpad-usage-in-mui/contributor-payout.mp4" type="video/mp4">
  Your browser does not support the video tag.
  </video>

## What's next?

We are fixated on optimizing for the biggest pains that developers face when building admin apps.
We have recently revamped our UX and added [data provider](https://mui.com/toolpad/concepts/data-providers/) feature to add server-side capabilities to the datagrid.
We are currently working on adding authentication and authorization in Toolpad.
You can check out more [examples](https://mui.com/toolpad/examples/) and visit our [GitHub repo](https://github.com/mui/mui-toolpad/) to evaluate the product.
In case you need any further information, feel free to reach out to the team at toolpad@mui.com.
