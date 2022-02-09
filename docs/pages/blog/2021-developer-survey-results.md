---
title: 2021 MUI Developer Survey results
description: Results for our yearly developer survey, 2021 edition.
date: 2021-02-08T00:00:00.000Z
authors: ['danilo-leal']
tags: ['Developer survey']
---

Keeping up with the tradition, a few months ago we opened the 2021 MUI Developer Survey, to which we received 1,589 responses, 7% more answers than last year. This time, we have almost doubled the survey size, adding more depth to each covered topic, especially opening space for more open-ended questions. We wholeheartedly appreciate everyone who contributed, you are all helping shape the future of MUI as a company, so, thank you!

Just like the previous iterations, the survey was chopped into three sections: ["Your needs"](#your-needs), "Your product", and "About you". Let’s dive into each one of them.

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
