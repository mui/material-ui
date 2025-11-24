![Ezra Bailey][image1]

# **Million-Line Codebase Challenge**

# **Mission**

Find an open source repository with over 1 million lines of code. Build two substantial features that don't exist yet. Show your work through pull requests, documentation, and a video walkthrough that proves you understand how complex software systems work.

# **What Qualifies as a Repository**

Your chosen repository must meet three criteria:

1. At least 1 million lines of code

2. Active maintenance with recent commits

3. Clear contribution guidelines

Consider projects like Chromium, Linux Kernel, PostgreSQL, Kubernetes, Firefox, Android, React Native, or TensorFlow. Each offers different challenges, including browser engines, operating systems, databases, orchestration platforms. Pick what interests you.

# **What Makes a Feature End-to-End**

An end-to-end feature touches multiple layers of the codebase. You're not fixing a bug or tweaking CSS. You're building something new that requires backend logic, data structures, and user-facing components working together.

The feature should solve a real problem. If you're working on a browser, maybe it's smarter resource management. For a database, perhaps it's an optimization that didn't exist before. The key is that someone using the project would notice your feature and find it useful.

Follow the project's patterns. Use their linters, match their code style, write tests the way they write tests. Your code should look like it belongs there.

# **Deliverables**

## **Two Pull Requests**

Submit two separate PRs following the project's template. Explain what each feature does and why it matters. If maintainers give feedback, respond professionally. Getting your PRs merged isn't required—quality matters more than acceptance. The goal is demonstrating you can contribute at a professional level.

## **Video Presentation**

Create a 7-10 minute video covering:

1. Why you chose this repository and what you're building

2. How the codebase is structured and organized

3. Deep dive on Feature 1: problem, design, demo, code walkthrough, challenges

4. Deep dive on Feature 2: same structure

5. Links to your PRs and any maintainer discussions

6. What you learned and what you'd do differently

This is your chance to show you understand the code, not just that you wrote it. Walk through your thinking. Explain your design decisions. Demonstrate the features working.

## **Technical Documentation**

Include architecture diagrams, setup instructions for testing your features, a decision log explaining key choices, and test coverage reports. Make it easy for someone else to understand and build on your work.

# **Example: Chromium**

Chromium is a solid choice with 36 million lines of code across C++, JavaScript, and Python. It powers Chrome, Edge, Brave, and Opera—billions of users depend on it daily. The multi-process architecture is complex but well-documented, and the contribution process is mature.

## **Feature Example: Smart Tab Resource Management**

This feature would manage browser tabs intelligently based on usage patterns and system resources. The backend sits in chrome/browser/resource\_coordinator/, monitoring memory pressure and deciding when to suspend tabs. A policy engine determines which tabs matter most.

Local LLM integration for on-device inference. It analyzes how you use tabs; which ones you return to, which sit idle, what kind of content they contain. User preferences and historical data live in SQLite. The UI shows tab states visually and provides a settings interface.

The design extends the existing tab discard system rather than replacing it. All AI processing happens locally for privacy. Policies are configurable but have smart defaults. Telemetry measures effectiveness without compromising user data.

Testing spans multiple layers: unit tests for the policy engine, browser tests for tab lifecycle behavior, performance benchmarks to ensure responsiveness doesn't degrade.

## **Feature Example: Context-Aware DevTools Error Assistant**

This adds intelligent debugging suggestions to Chrome DevTools based on error patterns. The frontend in third\_party/devtools-frontend/ creates a new suggestions panel that integrates with the console and sources. A C++ backend analyzes error patterns, parses stack traces, and extracts context from source maps.

Chrome DevTools Protocol extensions enable frontend-backend communication. The knowledge base stores common patterns, framework-specific issues, and community solutions. Everything processes locally—no code or errors leave the user's machine.

Design choices prioritize privacy while remaining extensible. CDP extension points avoid core changes. The suggestion system allows community contributions. A caching layer keeps things fast.

The implementation balances helpful debugging with developer privacy. It's a feature developers would actually want to use.

# **How You'll Be Evaluated**

**Technical Depth (40%):** How complex are your features? Is your code well-architected? Do they integrate properly with existing systems?

**Completeness (30%):** Are both features truly end-to-end? Do you have some tests? Is everything documented?

**Communication (20%):** Is your video clear and well-structured? Is your written documentation helpful? Are your PRs professional?

**Learning (10%):** What insights did you gain? What challenges did you overcome? Do you understand the broader codebase?

# **How to Succeed**

Read before you write. Spend real time understanding the codebase before implementing anything. Talk to maintainers early if you can. Get feedback on your feature ideas before investing weeks of work. Follow every convention: their linters, formatters, test patterns, commit message formats.

Write tests as you go. Good test coverage separates professional work from amateur contributions. Document continuously rather than leaving it for the end. Use the video to demonstrate deep understanding—this is where you show you really get it.

Remember: the goal isn't getting merged. It's proving you can make meaningful contributions to complex, real-world software. Quality over acceptance.