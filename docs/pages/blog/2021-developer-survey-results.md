---
title: 2021 MUI Developer Survey results
description: Results for our yearly developer survey, 2021 edition.
date: 2021-02-08T00:00:00.000Z
authors: ['danilo-leal']
tags: ['Developer survey']
---

Keeping up with the tradition, a few months ago we opened the 2021 MUI Developer Survey, to which we received 1,589 responses, 7% more answers than last year. This time, we have almost doubled the survey size, adding more depth to each covered topic, especially opening space for more open-ended questions. We wholeheartedly appreciate everyone who contributed, you are all helping shape the future of MUI as a company, so, thank you!

Just like the previous iterations, the survey was chopped into three sections: ["Your needs"](#your-needs), ["Your product"](#your-product), and "About you". Let’s dive into each one of them.

## Your needs

This section's objective is to check MUI’s ability to cover your needs.

### How would you feel if you could no longer use MUI?

Fortunately, and similar to 2019 and 2020, over 93% of the respondents would be disappointed if they could no longer use MUI (a sum of _"Very disappointed"_ with _“Somewhat disappointed”_). A very slight 1% decrease from 2020 (94%) but still as encouraging as it can be. MUI’s team will continue to grow to keep you all even more satisfied.

<img src="/static/blog/2021-survey/1.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 62.7% Very disappointed, 30.4% Somewhat disappointed, 6.9% Not disappointed." />

<p class="blog-description">1567 out of 1589 answered.</p>

On the flip side though, the amount of "Very disappointed” alone fell by 10,3%, and the number of "Not disappointed" grew by 1,1%, in comparison with 2020. When choosing the last option, respondents were able to write a free-form answer to justify the choice. Based on the data, here are the main reasons we noticed and possible explanations for why these came to be:

**The number of available alternatives**

Lately, with every new sunrise, there's a new UI component library. Naturally, considering the amount of iteration each one does on the same problems, patterns start to become more and more established. It's common to see libraries with very simmilar implementations of components, styling solutions, theming, etc. It gets harder to find ways to differentiate, to find something that would make one's iteration more compelling. That's a main reason we do this survey yearly, to shed light into improvements opportunities. Now that we have uncovered a bunch of spaces to explore, and together with our steadily growing team, we hope to focus on more than one scope at once with the same level of attention to detail and quality we've strived to have.

**The introduction of a paid product**

A big challenge with open-source is that the proportion of value captured by maintainers is close to zero. The MIT licensed model enabled a lot of growth but it naturally has reached a limit. In order to push our mission as much as we believe it's possible, we needed to introduce a way to capture more value. This was made by making MUI X open-core, instead of open-source, meaning having a full-time team of maintainers for the open-source and providing you with the most outstanding set of advanced components.

It’s still the early days of MUI X, though. We introduced it at the end of 2020 and have been iterating on not only the components but on the model itself. We still have a lot more ground to cover, only ~0,1% of our developer community has been convinced to upgrade to the Pro plan so far. So, if you have more feedback about it, we'd be happy to hear. And if you want to understand more about our view of the MIT/open-source landscape, check our [Stewardship page](https://www.notion.so/Stewardship-542a2226043d4f4a96dfb429d16cf5bd).

**The breaking changes made in v5**

Our most recent release, MUI Core v5, introduced some important breaking changes. The main problem we wanted to tackle with it was customizability, something we have been hearing as an improvement opportunity for a while. The changes done are meant to unlock more styling capacity while not deprioritizing performance. We understand that it introduced a considerable amount of work to migrate but, we’re still in the early days of maturing this new styling solution. There are a lot of opportunities to expand on the reason why the change was made, how to get the most out of it, best practices, tutorials, automation tools, and, generally, how-to guide those concerned about migrating to v5 because of it. If you have any ideas or suggestions, you’re always welcome to share your thoughts by opening an issue on our repository.

### How likely is it that you would recommend MUI to a friend or colleague?

As for the Net Promoter Score, this year we also saw a decrease. Last year, we had 62,2% of the respondents as Promoters whereas now we had 56,4%. NPS itself moved from 62 in 2020 to 46 in 2021. If we consider the scale, we're still at the great level, though (30 to 70 is considered great), which makes us glad. We definitely have much more to do to achieve an excellent score. The reasoning for the previous and next question might fit to explain NPS data.

<img src="/static/blog/2021-survey/2.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Detractors: 10.88%, Neutrals: 32.69%, Promoters: 56.43%, Overall NPS: 46. Scale: -100 to 0 needs improvements, 0 to 30 is good, 30 to 70 is great, and 70 to 100 is excellent." />

<p class="blog-description">1563 out of 1589 answered.</p>

### What is the main benefit you get from using MUI?

wip

### Please rate how much you agree or disagree with the following statements:

<img src="/static/blog/2021-survey/4.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="I can find most of the components I need (Strongly agree: 45.5%, Agree: 45.9%, Neutral: 6.2%, Disagree: 1.5%, Strongly Disagree 0.8%); I can easily customize the components to match the desired design (Strongly agree: 23.4%, Agree: 46.1%, Neutral: 18.6%, Disagree: 9%, Strongly Disagree 2.9%); I can find the answers to most of my questions in the documentation (Strongly agree: 24.1%, Agree: 50.1%, Neutral: 16.3%, Disagree: 7.6%, Strongly Disagree 1.9%); I find the library's performance to be great (Strongly agree: 26.4%, Agree: 44.3%, Neutral: 22.6%, Disagree: 4.7%, Strongly Disagree 2%); Whenever I needed to get help, I received helpful responses, StackOverflow or GitHub (Strongly agree: 20.9%, Agree: 36.7%, Neutral: 36%, Disagree: 4.6%, Strongly Disagree 1.8%)" />

<p class="blog-description">1534 out of 1589 answered</p>

It's definitely a good thing to have a general sense of agreement to most of the statements. However, there's a considerably big gap between _Strongly agree_ and _Agree_ for all but the first statement, which maybe showcases that we need to push for even more quality and focus in each of these dimensions (customizability, customization, performance, and support).

### What are your most important criteria for choosing a UI library?

<img src="/static/blog/2021-survey/5.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Ranked list: 1. The design - look and feel; 2. Customizability; 3. Documentation quality; 4. Comprehensiveness; 5. Performance; 6. Popularity; 7. Accessibility; 8. Offered support and help; 9. Bundle size" />

<p class="blog-description">1500 out of 1589 answered - Check <a href="https://www.typeform.com/help/a/ranking-question-360052767651/">Typeform's documentation</a> to understand ranking average calculations.</p>

This year we experimented using Typeform to run the survey, which allowed developers to rank the criteria available - something that wasn't possible with Google Forms. That way, we didn't have to limit the answers to 3, making for an even richer perspective. But, even so, the results weren’t too different from last year. Design (look and feel) remains the most important criterion for choosing UI libraries, and customization and documentation quality are still there in the top 3.

The notable difference this year seems to be performance climbing its way up, it has been ranked as the fifth most important aspect. We are aware of some improvements opportunities and now that v5 is out, we’ll definitely look into tackling them to make it even more stable.

### What else can we do to improve MUI for you?

<img src="/static/blog/2021-survey/6.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Word cloud of what we can do to improve MUI" />

Here are the most recurring topics:

- **More components**. There will naturally always be requests for more and we hope to keep up with them. We continue to see requests for more advanced components, as last year, such as Charts, Forms, and Calendar, to name a few.
- **More examples**. Knowing the "officially recommended" ways of using any product is always helpful. We know that many of the learning resources you find out there right now are outdated (v4), so that's a huge space to explore and update to the latest best practices.
- **Provide more themes**. Even with the launch of Material v3, Material Design has long been a design language that some find outdated. That's why we are working on a second design system, thought to offer everything that the current Material package does (component quantity and quality) but with an alternative design direction.
- **Fewer breaking changes**. MUI Core v5 definitely introduced some important breaking changes, especially because of the new styling solution. We’ll continue to explore the v5 migration topic across the post but, for now, it's good to share that we don’t expect to release any major this year. In fact, we aim for majors happening with at least 18 months apart from each other.
- **Improve customization**. Many of the entries for customization ask for making it easier, to add more examples of common customization use-cases (like font-family and primary/secondary color change), and improvements to theme capabilities. Even with the popularity of emotion and styled-components, there continues to be an enourmous need to facilitate customization.

If you have requests or ideas for improving the above-discussed topics, here are a few tips to have them prioritized faster:

- In both MUI Core and X repositories, you should label a request issue with `Waiting for upvotes`. If your issue gains a significant amount of upvotes, it will definitely get our attention and consideration.
- When requesting more components, make sure to benchmark existing implementations of it in the wild as it’s very helpful to see where they succeed and fail, as upfront learning content. It’s also great to explain as best as you can what is the problem you’re trying to solve. Oftentimes, an already available component might already solve it.
- If you're requesting easier customization, make sure to demonstrate the desired outcome and explain as detailed as you can the doubts you're facing. Very frequently these questions showcase opportunities to increase documentation quality.

## Your product

### What were you primarily using before MUI?

<img src="/static/blog/2021-survey/7.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Bootstrap: 40.6%; Started with MUI: 37.4%; Tailwind:: 4.8%; Ant Design: 4.8%; Angular Material: 4%; Semantic-UI: 4%; Other: 3.8%; Chakra UI: 0.7%" />

Not too different from last year with the exception that, this time, we’ve seen way fewer developers claiming to be using custom systems before. Very encouraging to know the number of people starting their products off with MUI!

### Are you using any of these in addition to MUI?

<img src="/static/blog/2021-survey/8.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Nope, just MUI: 70.7%; Tailwind: 10.3%; Bootstrap: 9.8%; Ant Design: 4%; Semantic-UI: 1.7%; Other: 1.6%; Chakra UI: 1.2%; Angular Material: 0.8%" />

We're glad to see that for many developers MUI seems to be covering all the needs as far as component UI libraries are concerned. This is definitely something we optimize for.

### Who are you building for?

<img src="/static/blog/2021-survey/9.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="For the company I work at: 65.6%; For my personal side project: 20.8%; For a client: 12.9%; Other: 0.7%" />

MUI for client work and for personal use have swapped places this year. Maybe v5 got developers interested enough to try it on their own sites and apps? Interesting to see.

### Who do you collaborate most with?

<img src="/static/blog/2021-survey/10.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Other developers: 67.2%; Designers: 34.3%; Product managers: 29.2%; No one, it's just me: 28.9%; Other: 0.9%" />

We didn’t ask this question on the previous iteration but thought that doing so now would be a good idea, given we know that our documentation is not only visited by developers. Optimizing our language, and even the code itself, to be understandable by other team members such as designers and product managers makes the whole design system conversation way more inclusive and approachable. And the results illustrate that this thinking might make a lot of sense indeed.

### How many web applications did you or your team deliver using MUI this year?

<img src="/static/blog/2021-survey/11.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="0-1: 494; 2-3: 381; 4-5: 122; 6-10: 26; 10+: 28" />

When discussing potential indicators we could track, perhaps one of the hardest ones is efficacy - or, in other words, how much does MUI actually help shipping products? The only way to properly know, since this is usually private, is by asking developers. The number of apps delivered is, of course, contextual, but, regardless, it's encouraging to know that we might be enabling these applications to be built faster than they would've if developers were to build it all from scratch.

### Which MUI products do you use in your application?

<img src="/static/blog/2021-survey/12.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="MUI Core: MIT licensed foundational components, right now available with Material Design: 96.6%; MUI X: collection of advanced components available under MIT and commercial licenses: 14.7%; MIT License: 126 responses; Commercial licenses: 99 responses" />

Definitely not a very surprising answer, we know that most of our user base is here for MUI Core. The proportion of MUI X users in the MIT and commercial license might not be true, though. We emailed those who bought the MUI X commercial license asking to answer the survey, so they had this plus one ad of it.

However, there is a lot of opportunities in the MUI X space to unpack, let's explore a little bit further below.

### Did you know what MUI X was prior to this survey?

<img src="/static/blog/2021-survey/13.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Yes: 54.5%; No: 45.5%" />

A large chunk of you didn’t know what MUI X is prior to the survey, which makes it clear that we still have a lot to do to expand its reach.

### Are you currently using any paid UI component library?

<img src="/static/blog/2021-survey/14.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Yes: 11.8%; No: 88.2%" />

The results are not very different from last year, aside from a slight increase of respondents saying yes. The majority of respondents don’t use any but out of those who do, it is mostly MUI X, which is great news.

### How can we improve the Data Grid for you?

<img src="/static/blog/2021-survey/15.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Customizability: 21.9%; Cheaper Pro plan: 17.2%; More features: 12.5%; Fix features: 9.4%; Improve docs: 6.3%; Look & feel: 6.3%; Maintain it: 4.7%; Bugs: 3.1%; DX: MUI Core consistency: 3.1%; Performance: 3.1%; Transition: 3.1%; SSR: 1.6%" />

- **Customizability.** We already touched on this topic before and the frequency that it shows up on the MUI X space is a definitely a hint to double down on efforts to make customizations easier to do. We're aware that we might be missing some stuff, like documention around theming and a headless API.
- **Cheaper Pro plan.** We know it can be out of range for a lot of developers and that's why the free version is already packed with many features. MUI mainly develops OSS software and we needed a way to sustain the project longer, hence the price we’re currently exercising, which actually is, still, way lower than similar products. However, many who left feedback around the price are individuals, so there might be an opportunity to evolve it for those not backed by their company.
- **More features & fix features.** Collapsable rows, column resizing, and features for ERP apps were some of the features requested. And regarding features to fix, pagination with REST API, backend filtering, and cell editor, were the main mentioned.
- **Improvements to the documentation.** Basically similar to the already discussed aspects of documentation improvement. Data Grid’s docs today could certainly use a better and optimized space and that’s we’ve been working on, so it’s easier to find and expand on the amount of information.
- **Improvements to the look and feel.** It might be probably a solid idea to think of different default designs to offer on the Data Grid, alternative to Material Design. On a more UX side of things, we've heard many developers mentioning the filtering experience specifically.

### How can we improve the Data Grid Pro for you?

And now, here's what you mentioned about making the commercially licensed version of the Data Grid better:

<img src="/static/blog/2021-survey/16.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="More features: 39.8%; Customizability: 20.4%; Fix features: 15.1%; Performance: 5.4%; Cheaper Premium plan: 3.2%; Improve docs: 3.2%; DX - API: 2.2%; LGPL license: 2.2%; More components: 2.2%" />

- **More features.** [Grouping](https://mui.com/components/data-grid/group-pivot/#row-grouping) was the most requested feature for the Data Grid Pro, followed by [master detail](https://mui.com/components/data-grid/group-pivot/#master-detail), aggregation, search, [tree data](https://mui.com/components/data-grid/group-pivot/#tree-data), and [column pinning](https://mui.com/components/data-grid/columns/#column-pinning). Good thing is that we released some of these already during the time we were anlayzing the survey results. Check the links to see their docs and demos. Alternatively, you can follow [our public roadmap](https://github.com/mui/mui-x/projects/1) to see when the others will land.
- **Customizability.** The majority of requests about customizability were actually asking for possibilities to tweak Data Grid interactions, which is something we need to understand more exactly what it means. Following next were requests for more styles customizability and documentation around how to do that (similar to the discussed above).
- **Fix features.** Filtering got first place as the most requested feature to fix on the Data Grid Pro. Following next were lazy loading and server-side rendering support.
- **Performance.** Requests about performance were mostly spread out between runtime and bundle size. We acknowledge we have done almost no effort on the bundle size so far. There are likely some low-hanging fruits to reduce it.

### What were you using before the Data Grid?

<img src="/static/blog/2021-survey/17.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="In house: 29.9%; MUI Table: 17.9%; Nothing: 7.5%; material-table: 6%; material-datatables: 6%; Sencha: 6%; Kendo UI: 4.5%; react-table: 4.5%; Bootstrap Table: 3%; AG Grid: 3%; datatables.net: 3%; JSP: 1.5%" />

To finish off the section about MUI X, it's interesting to see that a lot of you are taking the effort yourselves to build Data Grid alike tables. We'd love to understand more why it made sense to build it in-house, especially given we know it's no trivial work at all. Also, it's refreshing to see that the standard MUI table components is already of good help for a lot of you.

### What are you building?

<img src="/static/blog/2021-survey/18.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Dashboard admin applications: 26.3%; Enterprise applications: 25.9%; A custom design system: 9.7%; Landing page: 8.1%; E-commerce application: 7.8%; Personal website/portfolio: 6.9%; CMS: 6.1%; Just playing with tech: 4.6%; Blog: 2.8%; Other: 1.4%" />

Enterprise, dashboards applications, and design systems still continue to be in the top 3, similar to last year. The slight changes though are developers using MUI more to build e-commerce apps and portfolios, which is pretty cool. We'd love to see them, feel free to share in the ["Who's using Material UI?" issue](https://github.com/mui/material-ui/issues/22426).

### What delivery mechanisms are you using?

<img src="/static/blog/2021-survey/19.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Single-page app (Create React App, etc): 74.7%; Server-side rendered website (Next.js, Gastby, etc): 20.8%; Desktop app (Electron, etc): 3.5%; Native mobile app (Cordova, etc): 0.6%; Other: 0.4%" />

### What type system are you using?

<img src="/static/blog/2021-survey/20.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="TypeScript: 63.8%; None: 18%; prop-types: 16.6%; Flow: 1.4%; Other: 0.2%" />

Very different from last year, Typescript just jumped off and it's the primary type system used out there. It seems reasonable to expect more people to use a type system rather than not.

### Which framework are you using, if any?

<img src="/static/blog/2021-survey/21.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Create React App: 62.4%; Next.js: 21.9%; Custom webpack: 10.7%; None: 2.6%; Gatsby: 0.9%; Other: 1.5%" />

A considerable bump in Next.js usage, which is not surprising due to the popularity and advancements it gained in 2021.

### What styling solution are you using?

<img src="/static/blog/2021-survey/22.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="MUI Core v4 (JSS): 45%; Styled components: 37.9%; Emotion: 30.2%; SASS: 20.8%; CSS modules: 18.9%; Vanilla CSS: 17.6%; Tailwind CSS: 9.1%; Stitches: 0.4%; Other: 1.2%" />

As the MUI Core v5 release is still relatively recent, it's still expected to see a great number of developers using JSS, and there will always probably be some of you who use it because of pure preference.

However, it’s notable the styled-components and emotion growth, and that might be because it’s what our new styling solution is based off. We're still seeing a lot of questions and also opportunities to make it better, so this year we'll focus on expanding and refining [MUI System](https://mui.com/system/basics/) even further.

### Did you recently migrate to MUI Core v5?

<img src="/static/blog/2021-survey/23.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Yes: 63.3%; No: 36.7%" />

Even though a lot of you who answered the survey has migrated, that are still a lot more to convice migrating. 2022 is going to be a lot focused in that.

### What's the statement that most defines your migration experience?

<img src="/static/blog/2021-survey/24.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="It was tricky but MUI's documentation and resources helped me to get it right: 43%; It was smooth and it is now working fine: 38.5%; It wasn't good, I had many problems and it took me a long time to finish: 14.3%; It was bad and I ended up regretting it: 2.8%; Other: 1.4%" />

### What could MUI do to improve the migration experience?

<img src="/static/blog/2021-survey/25.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="General documentation improvements: 43.2%; Automation: 20.7%: Fewer breaking changes: 15.6%; Fewer styling soluiton breaking changes: 8.5%; More tutorials: 5.4%; More styling solution migration tutorial: 4.4%; Migrate Core and X together: 1%" />

- **General documentation improvement.** Documentation plays a huge part in defining the developer experience. We definitely need to explore more ways of making the step-by-step easier, add more examples, refine the copywriting, and maybe overall make it more beginner-friendly.
  - There are other topics converging with this one, like requests for more tutorials.
- **Automation.** We prepared codemods to aid the v5 migration, given the amount of changes it had. We've seen positive feedback for it, which is encouraging since it's our first time providing tools to automate a migration process. However, it is becoming clear how and when the codemods weren't too effective, so we'll make sure to refine it more.

### Could you share the reason why you haven't migrated yet?

<img src="/static/blog/2021-survey/26.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="No bandwidth: 28.4%; Started in v5: 14.6%; Afraid of amount of breaking changes: 12.3%; Already planned but haven't started: 9.5%; Missing incentive: 8.5%; Not a priority: 7.3%; Don't like new styling solution: 4%; Blocked by 3rd party dependencies: 3.3%; Didn't know about it: 3.3%; Migration is in process: 3.3%; Had regressions, therefore came back to v4: 1.3%; Waiting to become stable: 1.3%" />

- **No bandwidth / not priority / blocked by third-party dependencies.** These are all grouped because they are similar in the sense that migration didn’t happen because of a superior force. Not sure what we can do exactly but we put an effort to always have a clear changelog and reasoning for the changes, to equip you with arguments and resources when the time is right to migrate.
- **Afraid of the amount of breaking changes.** The fear aspect could probably be attenuated by more documentation, examples, automation, so on and so forth. Things we already covered in previous topics.
- **Don't like the new styling solution.** We believe that’s totally fair. Not everyone will buy every move. However, as with any open-source project, you always have the opportunity to weigh in and leave your thoughts about any given endeavor we're considering. [The issue discussing the chosen styling solution](https://github.com/mui/material-ui/issues/22342) was fairly big and every contribution added to the safety of deciding on one. So, make sure to participate and contribute if there's any aspect that you don't agree with.
- **Didn’t know about it.** There is absolutely an opportunity to explore more channels to engage with the MUI audience, different from those we already use.
- **Regressions - had to go back to v4.** Feel encouraged to open an issue with whatever difficulty you are having in the migration process, we’ll be happy to guide you.

### Have you, or someone from your team, using any low-code tool for helping with the development of your product?

<img src="/static/blog/2021-survey/27.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Yes: 16.1%; No: 83.9%" />

It’s been a while since we started to play around with ideas on how to broaden the ability to use MUI's component libraries for a wider public, enabling more collaboration and faster development speed. That’s why we had some questions on this year's survey regarding the low-code space. Given that developers are mostly bounded within a product team (considerably tech-literate people), low-code could seem as not necessary, so maybe that’s why over 80% haven’t used it. To expand our knowledge, we had the following questions for the 16% that said yes.

### What did it help you build?

<img src="/static/blog/2021-survey/28.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="An internal tool: 22.5%; Landing pages: 22.1%; Analytics dashboard: 17.6%; A design system: 15.6%; E-commerce storefront: 8.6%; A simple customer-facing mobile app: 6.6%; Other: 7%" />

MUI users seem to use low-code tools to build all kinds of applications but mainly for internal tools, landing pages, and analytics dashboards. The findings are similar to the question above where we asked ‘What are you building?’. But it is great to see that there are low-code tools in the market that developers trust. Undoubtedly, it leads to an overall faster feedback and development cycle.

### If MUI considered building a low-code tool, what primary use case would match your needs?

<img src="/static/blog/2021-survey/29.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Deliver a React design system: 22.2%; Generate high-quality React codebase after visual building: 19.2%; Building dashboards for rapid data visualization: 18.3%; Higher fidelity prototyping and demoing for accurate design handoff: 13.6%; Building internal apps when pro-code is overkill: 11.4%; Shipping landing pages with my existing React design system: 7.3%; Shipping production simple apps before moving to pro-code: 6.2%; Other: 1.8%" />

Developers are mostly interested in React design systems, codebase generators, tools for internal needs, data visualization, and prototyping. These needs are both for internal and customer-facing use-cases.

## About you

### How did you first hear about MUI?

<img src="/static/blog/2021-survey/30.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 62.7% Very disappointed, 30.4% Somewhat disappointed, 6.9% Not disappointed." />

### Which of the following best describes your current job role?

<img src="/static/blog/2021-survey/31.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 62.7% Very disappointed, 30.4% Somewhat disappointed, 6.9% Not disappointed." />

### How many total employees work at your current place of employment?

<img src="/static/blog/2021-survey/32.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 62.7% Very disappointed, 30.4% Somewhat disappointed, 6.9% Not disappointed." />

### How long have you been developing with JavaScript?

<img src="/static/blog/2021-survey/33.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 62.7% Very disappointed, 30.4% Somewhat disappointed, 6.9% Not disappointed." />

### How long have you been developing with React?

<img src="/static/blog/2021-survey/34.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 62.7% Very disappointed, 30.4% Somewhat disappointed, 6.9% Not disappointed." />

### How long have you been developing with MUI?

<img src="/static/blog/2021-survey/35.png" style="width: 796px; margin-top: 16px; margin-bottom: 8px;" alt="Bar chart: 62.7% Very disappointed, 30.4% Somewhat disappointed, 6.9% Not disappointed." />

## Conclusion
