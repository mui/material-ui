---
title: How does MUI use Toolpad?
description: Explore how we use Toolpad for production use cases at MUI.
date: 2024-01-15T00:00:00.000Z
authors: ['prakhargupta']
card: true
tags: ['Product', 'News']
---

Toolpad helps full-stack engineers build internal tools quickly.
Internal tools encompass data-intensive CRUD interfaces, analytics dashboards, or custom apps that make teams productive.
Toolpad offers a low-code, GUI-based, code-friendly way of building apps and comes as an npm package that can be imported in an existing codebase.

We've been dogfooding Toolpad at MUI to build our internal tools, and it has proven beneficial for us to easily assemble well-organized, centrally located KPI dashboards and operations apps.
In this blog post we'll discuss four such apps, and explain how we used Toolpad to turn our ideas into reality.

<a href="https://tools-public.mui.com/prod/pages/OverviewPage">
<img alt="MUI public app for tracking KPIs" src="/static/blog/2023-toolpad-usage-in-mui/tools-public.png"  loading="lazy" width="2400" height="1394" />
</a>

## Problems tackled through Toolpad

Our internal tooling is easier to use and less prone to errors now; before we built these apps, some of these necessary functions were no more than a set of instructions in a Google doc or on Notion.
A user had to log into multiple services to manage their day-to-day chores. Now, one interface does it all.
We utilized Pipedream, Metabase, Google Sheets, and other tools to streamline our day-to-day operations.
This meant we had distributed code in multiple places, accessible to only a few.
Now we have everything on GitHub and collaboration is much simpler.

Let's delve into four scenarios that Toolpad has successfully addressed:

## 1. Support key validator

We offer a priority support service to our MUI X premium customers: their queries get an expedited response within 24 hours.
They share their issue through a Priority Support template in our repo where they're directed to validate their license key, and once it's validated, the 24-hour countdown starts.

   <a href="https://tools-public.mui.com/prod/pages/validateSupport">
    <img alt="Premium key validator support app" src="/static/blog/2023-toolpad-usage-in-mui/validate-support.png"  loading="lazy" width="2400" height="1394" />
    </a>

[Source code](https://github.com/mui/mui-public/blob/master/tools-public/toolpad/resources/updateMuiPaidSupport.ts)

Here's how we built an app for this:

The [`updateMuiPaidSupport.ts`](https://github.com/mui/mui-public/blob/master/tools-public/toolpad/resources/updateMuiPaidSupport.ts) file hosts all functions that are called from Toolpad.
It uses the [custom function](https://mui.com/toolpad/concepts/custom-functions/) feature and combines GitHub actions, Google Sheets, and Octokit to read and verify user information.
The fetched data is then bound to the UI components.
It uses [page parameters](https://mui.com/toolpad/concepts/page-properties/#page-parameters), [secrets handling](https://mui.com/toolpad/concepts/custom-functions/#secrets-handling), [shell removal](https://mui.com/toolpad/concepts/page-properties/#display-mode), and custom styling as additional features of Toolpad.
This app took one developer just a few hours to build which otherwise would have taken a couple of days.

## 2. Customer support KPI tracker

The read-only page illustrated below uses [HTTP requests](https://mui.com/toolpad/concepts/http-requests/) for its data source.
Through the query builder UI we fetch the 100 latest support tickets from Zendesk to calculate the average time it takes us to respond to and resolve customer requests.
It uses a [custom component](https://mui.com/toolpad/concepts/custom-components/) which we call the "health badge."
Based on the metric value, the component shows three color-coded states: Problem (red), Warning (yellow), and OK (green).
Other KPI pages also use this health badge and pre-built Chart components to compare stats, observe trends, and spot anomalies.

The video below demonstrates the usage of this app in dev mode:

  <video controls width="100%" height="auto" style="contain" alt="zendesk first reply in devmode">
  <source src="/static/blog/2023-toolpad-usage-in-mui/zendesk-first-reply-dev.mp4" type="video/mp4">
  Your browser does not support the video tag.
  </video>

We opted for Toolpad since Metabase doesn't support importing data from REST APIs.
This is possible in Google Sheets but it requires writing a lot of JS code, and since we wanted to embed it in a [Notion page](https://www.notion.so/mui-org/KPIs-1ce9658b85ce4628a2a2ed2ae74ff69c#3974cb6ed12b4c5a9013bac63113e3bc), Toolpad was the ideal choice.
Toolpad handles state management and routing, and simplifies query building and data binding, removing the need to write glue code.

You can explore both of the aforementioned apps in dev mode on your device by running the underlying [node app](https://github.com/mui/mui-public/tree/master/tools-public).
The next two apps discussed are internal to MUI.

## 3. Manage overdue invoices

We have an internal operations process to remind customers about overdue invoices: reminder emails are sent out at regular intervals following the due date.
In the Toolpad app, the operations team can view a table of all customers who need to be contacted.
They select one, email them from Zendesk, and update the status to `CONTACTED`, which is then written back to the database.
This is a private app for internal use that can't be shared, but the following video gives a quick demo:

<video controls width="100%" height="auto" style="contain" alt="overdue invoice page">
  <source src="/static/blog/2023-toolpad-usage-in-mui/overdue-invoice.mp4" type="video/mp4">
  Your browser does not support the video tag.
  </video>

Before the Toolpad app, we relied on a combination of Metabase and Google Sheets to fetch and edit records—but this was cumbersome to operate and sometimes caused data inconsistency issues.
Thanks to Toolpad we've managed to bring it all under one roof, dramatically improving our operations team's efficiency and productivity.

## 4. Contributor payout

We have a script to fetch monthly payout data for contributors to the MUI Store.
Our operations team is responsible for paying contributors, but the script proved too technically challenging for them to run without help from our engineers.
We solved this problem by importing the script into Toolpad and creating a UI for it.
The video below shows how a user can select the dates, run the script, and receive text that's properly formatted to copy and paste directly into Slack communications:

  <video controls width="100%" height="auto" style="contain" alt="contributor payout page">
  <source src="/static/blog/2023-toolpad-usage-in-mui/contributor-payout.mp4" type="video/mp4">
  Your browser does not support the video tag.
  </video>

## What's next?

Our primary focus for Toolpad is to help developers avoid the most common pains associated with building admin apps.
We have recently revamped our UX and added the [data provider](https://mui.com/toolpad/concepts/data-providers/) feature to add server-side capabilities to the Data Grid.
We are currently working on adding authentication and authorization in Toolpad.
You can check out more [examples](https://mui.com/toolpad/examples/) and visit our [GitHub repo](https://github.com/mui/mui-toolpad/) to evaluate the product.
In case you need any further information, feel free to reach out to the team at toolpad@mui.com.
