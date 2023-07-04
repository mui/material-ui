---
title: Toolpad is now in Beta!
description: After working on it for more than a year, Toolpad is now in the next stage. Read more about it in this announcement.
date: 2023-07-03T00:00:00.000Z
authors: ['prakhargupta']
card: true
tags: ['Product', 'News']
---

It's been over a year since we released the first version of Toolpad. Today, we're excited to take the next step on that journey with the release of Toolpad Beta. If you aren't familiar with Toolpad yet, it's an admin panel builder catering to the internal tooling needs of an organization. It's for developers who want to build a functional application quickly. It harnesses the speed of a UI builder for the front-end and closely integrates with your normal development workflow. If this excites you, then read on!

## Why did we decide to build Toolpad?

Toolpad was created to meet the needs of the MUI community. We conducted surveys, did our market research, and concluded to make an internal tool builder because the idea resonates with MUI's mission of empowering developers to build app faster and more efficiently.

Internal tools are software applications that are developed and used within an organization itself. They can automate tasks, manage data, and help foster collaboration. Internal tools are a valuable asset for businesses of all sizes, as they help to improve efficiency, productivity, and communication.

A sub-optimal tool means a waste of time and effort for everyone. Maintaining them distracts developers from solving actual business problems. We've all had our fair share of wrestling with lousy internal tools that we hoped we'd never have to use more than once. In recent years, customer-facing software has moved quickly and is now flashy and sleek. It's time for internal tools to get this same upgrade.

## What is Toolpad exactly?

Toolpad is an open-source, low-code, drag-and-drop admin builder framework. The primary purpose of Toolpad is to create data-intensive React apps faster. Toolpad simplifies writing back-end logic, connecting to a data source, querying and mutating data, and deploying an app. It can quickly convert an API, script, or SQL query into a web UI.

Toolpad is not ideal for building static web pages, mobile apps, or customer-facing custom-designed front ends. It's for building admin applications, CRUD interfaces, custom internal tools, and analytics dashboards.

<img alt="Building an application on Toolpad " src="/static/blog/2023-toolpad-beta-announcement/toolpad.png" style="margin-bottom: 16px;" loading="lazy" width="2048" height="1536" />

## Who is Toolpad for?

Before the arrival of Toolpad, MUI primarily catered to the front-end needs of the development process. Our products were mostly useful for React engineers or designers. We saw many full-stack engineers use our advanced components for data-intensive apps. These highly customizable components are well-suited for complex apps, but not all apps require the same level of customization: for example, internal tools just need basic theming.

Toolpad is for full-stack and back-end developers. They build, manage, and integrate data pipelines, server-side logic, databases, microservices, and APIs—and know the most about them. Sharing these endpoints and maintaining the internal documentation with the front-end teams is a hassle that lasts forever. Toolpad empowers you to take the next step and build the UI you need using our drag-and-drop editor.

## What are the main features available today?

### Use MUI Core and MUI X Pro components

MUI Core provides all modern components; a chosen few are currently available inside Toolpad, and we're adding more all the time. MUI X Pro (Data Grid and Date Picker) components are also available for free in Toolpad.

<img alt="Building an application on Toolpad " src="/static/blog/2023-toolpad-beta-announcement/library.png" style="margin-bottom: 16px;" loading="lazy" width="2048" height="1536" />

### Bring your own components

Toolpad can import [external React components](https://mui.com/toolpad/concepts/custom-components/), ready to be used in its visual designer. Your past effort shouldn't go to waste and you shouldn't be limited by the stock component suite.

### Bring your own back end

Directly integrate with your Node.js back end and have your data available on the page without writing any REST endpoints or fetch logic. Need that prisma model on the page? Expose it through a serverless function and Toolpad does the rest.

### Own your code

Toolpad runs fully locally. You're not stuck with an online code editor or a suboptimal github integration. All configuration is stored in local files which you can version-control, edit, and deploy in any way you want.

<img alt="Building an application on Toolpad " src="/static/blog/2023-toolpad-beta-announcement/code.png" style="margin-bottom: 16px;" loading="lazy" width="2048" height="1536" />

## How is Toolpad different from similar products on the market?

Toolpad follows an open-core approach, meaning that the base version is open source. You can build an unlimited number of apps, and the basic service will be free forever. Among similar products like Retool, Appsmith, Budibase, Airplane, and Interval, only some are open source.

Another major area of difference is that Toolpad is solely focused on developers as users. As much as we are low-code, we are equally code-friendly. Providing basic functionalities that a developer expects from an open-source tool is non-negotiable for us—we will always prioritize the developer's best interests over all else. With nearly a decade of history building developer tools, we know the long-term benefits of cultivating a close relationship with our community of users.

Lastly, Toolpad is the only product that offers a drag-and-drop UI builder closely integrated with your favorite IDEs like VSCode. It's the best of both the worlds!

## How can I use Toolpad?

Toolpad is available as an NPM package—follow the [Installation guide](https://mui.com/toolpad/getting-started/installation/) in our docs to get started. You can learn more about Toolpad by visiting the [home page](https://mui.com/toolpad/).

## What's next?

We plan to continue to iterate on our vision of helping developers increase the speed and efficiency of their workflows. We want to optimize for the biggest pains that you face when building admin apps. Your input is crucial to helping us shape our roadmap from here.

The best places to stay up-to-date about what we're currently working on are [GitHub issues](https://github.com/mui/mui-toolpad) and our [public roadmap](https://github.com/orgs/mui/projects/9/views/1).

If you have any questions or would like to share feedback, you can directly contact the team at toolpad@mui.com. You can also engage in conversations in our [Discord](https://discord.gg/hHqtMP9Ckc) server.

If you'd like an in-depth demo and discussion of your use case, please feel free to [schedule a meeting with me on Calendly](https://calendly.com/prakhar-mui).
