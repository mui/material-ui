---
title: Oregon State University
description: How Oregon State University transformed course planning with the MUI X Data Grid.
image: 'https://deploy-preview-46416--material-ui.netlify.app/static/branding/companies/oregon.svg'
date: 2022-06-08T00:00:00.000Z
tags: ['Case Study', 'Customer']
manualCard: true
---

<style>
  #blog-responsive-image {
    height: 230px;
    @media (max-width: 600px) {
      height: 167px;
    }
  }
</style>

<img
    id="blog-responsive-image"
    src="/static/branding/companies/oregon.svg"
    alt=""
    style="width: 40%; height: auto; object-fit: cover; object-position: top left; border: 0px; margin-left: 0; margin-bottom: 20px; display: block; text-align: left;"
  />

## Overview

Oregon State University is developing Resource Insights, an application aimed at improving course planning and faculty assignment.
The project replaces outdated Excel-based methods with a modern online system that balances course sections, faculty availability, and student demand.
The tool integrates with existing university systems to provide real-time enrollment data, eliminating manual data entry.
Initial adoption is expected at around 30 users, with the potential to expand university-wide.

<span class="only-light-mode">
<blockquote style="margin: 32px 0; padding: 24px 32px; background: #f5f5f7; border-left: 6px solid var(--muidocs-palette-primary-main); border-radius: 8px; font-size: 1.15rem; font-style: italic;">
  MUI X provides the right balance of performance, customization, and React-native integration. If you need a scalable, spreadsheet-like experience in your web app, it's definitely worth considering.
  <br>
  <span style="display: block; margin-top: 12px; font-size: 1rem; font-style: normal; color: #555; font-weight: 500;">
    – Mark Clements, Senior Development Team Lead
  </span>
</blockquote>
</span>
<span class="only-dark-mode">
<blockquote style="margin: 32px 0; padding: 24px 32px; background: var(--muidocs-palette-background-default); border-left: 6px solid var(--muidocs-palette-primary-main); color: #f5f5f7; border-radius: 8px; font-size: 1.15rem; font-style: italic;">
  MUI X provides the right balance of performance, customization, and React-native integration. If you need a scalable, spreadsheet-like experience in your web app, it's definitely worth considering.
  <br>
  <span style="display: block; margin-top: 12px; font-size: 1rem; font-style: normal; color: #bbb; font-weight: 500;">
    – Mark Clements, Senior Development Team Lead
  </span>
</blockquote>
</span>

## Challenge

The university needed a robust solution to handle tabular data efficiently.
Planners and administrators required a system that could provide spreadsheet-like interactions, allowing them to filter, sort, and manipulate data dynamically.
Key challenges included:

- Lack of real-time data integration in current processes.
- The need for an Excel-like experience in a web-based tool.
- Finding a framework that was well-supported, actively maintained, and native to React.
- Ensuring high performance and customization while keeping the UI intuitive.
  While alternatives like AG Grid were considered, MUI X was preferred because it is deeply integrated with React, whereas AG Grid's approach spans multiple frameworks, leading to inconsistencies in React-specific implementations.

## Solution

The team adopted MUI X's Data Grid as the core component for handling tabular data.
This choice was driven by its extensive feature set, including:

- Column manipulation – Moving, sorting, filtering, and grouping columns for enhanced usability.
- Row grouping – Organizing complex datasets for better visualization.
- Built-in editing – Allowing users to modify data directly within the grid.
- Custom components – Integration of an autocomplete feature within cells to handle thousands of course options efficiently.

The Data Grid's customization capabilities allowed the team to build an interface tailored to the university's needs, providing a seamless transition from Excel while leveraging MUI's robust React-native foundation.

## Results

- Faster and more intuitive workflows – Replacing spreadsheets with an interactive grid improved efficiency in faculty and course planning.
- Custom editing interfaces – In-cell editing for simple data and modal-based forms for complex changes streamlined data management.
- Seamless system integration – Real-time enrollment data updates reduced manual input errors.
- Developer-friendly implementation – MUI X's well-structured documentation and conventions enabled smooth adoption.

## Recommendation

The Resource Insights team sees MUI X as a powerful tool for projects requiring complex tabular interactions.
They believe more real-world examples in the documentation—such as integrating autocomplete in a data grid cell—would further enhance usability for advanced implementations.
Additionally, they expressed interest in future features like pivot tables, which would further support their data-heavy use case.
