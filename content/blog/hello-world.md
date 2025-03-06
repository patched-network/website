---
title: Hello, World
date: 2025-03-06
---

Welcome to the dev blog of __patched.network__. I want to start talking about my on-again off-again life's work.

The short of it is that I'm working on an open-source (GPL) stack for building interactive tutoring systems, and moreover, a platform that enables mass collaboration on the same. Imagine the lovechild of Anki, Wikipedia, Duolingo, Stack Overflow, and Math Academy.

The stack is FOSS, but this is a commercial effort. Along the way, I'll use the tools I'm building to build and sell some specific courses that seem commercially viable.

# The Project

## Overview

Since I began this project ~8 years ago, the state of the art with respect to interactive tutoring systems has moved forward quite a bit. Justin Skycak from Math Academy has produced an [extremely wonderful document](https://www.justinmath.com/books/#the-math-academy-way) on these advances. I won't spend a lot of time repeating it, but please accept this executive summary:
- there is a mature and rigorous body of scientific evidence around effective learning
- much of the evidence is actionable via technical means
- the results are good

One way to think of the __patched.network__ project is as open sourced scaffolding to rapidly build courses, in any domain, that respect these practices of effective learning. For example, where is our MathAcademy of sight singing? Of differential diagnosis workflows?

If we combine this project scaffolding with generative AI, you could imagine nearly instant creation of courses on any topic. Tools like [Deep Research](https://openai.com/index/introducing-deep-research/) and [NotebookLM](https://notebooklm.google/) have proved the concept of using LLMs to produce quality synthesis content (documents, podcasts).

But I also think there are also some specific opportunities for open collaborative development of courses. The advantages come in two general flavors.

The first is that socially determined courses can self-discover their own local values - eg, what exactly is it that we want to teach and learn? If you zoom out far enough (indulge me), you can see a bottom-up process to define and vouch for a world curriculum.

The second is that collaborative authorship has better odds of filling in the course content gaps that get revealed along the way. With enough eyeballs, every barrier to student progress is shallow.

In both cases, the platform approach moves the paradigm of course authorship from __design__ toward __growth__. Content that serves the course's overall objectives is surfaced, and ineffective content is weeded out.

I'll have more to say about the mechanics of the system in future posts, including a few pedagogical considerations not mentioned in the Math Academy Way.

## Current Status

Every-third-Sunday software efforts that span several years can get pretty disorganized. The platform actually has a live deployment that has been running privately for a few years. This deployment has a lot of _exposed studs_, and its infrastructure had been slowly decaying.

Over the past couple of months I've been tidying up. I have:
- dragged it through seven years of advances in web technologies
- brought dev tooling up to date
- reduced the critical vulnerability count from sixty-something to zero
- added some end-to-end tests
- improved the containerization of development components

I'm _very happy_ to say that the development environment is stabilizing and my focus is shifting toward feature and content development.

Software developers are invited to try out the platform's [quickstart](https://github.com/patched-network/vue-skuilder/?tab=readme-ov-file#commands), which ought to launch a local database, backend, and website all getting along well.

## Next Steps

The project was built largely as a monolith platform. I'm currently teasing apart some of the main components to make them reusable for building courses in different form factors (eg, standalone course, live database backend vs static site data, possibly targeting mobile).

Once some progress is made here, I'll start in on tools to scaffold standalone courses, and begin in earnest on my own first standalone course - a topic for another day.

# This Site

The immediate intent here is to think and write about development in long-form, and to start documenting capabilities and goals. Also to get from zero-to-one in terms of web presence.

As the software stack and the business model mature, it ought to transition from a pure blog toward something more like a landing page with docs, demos, and whatnot.

In the meantime, if you happen to think this is all stupid, brilliant, boring, interesting, or doomed, please let me know! There's a [contact](/contact) page, and there's the [github organization](https://github.com/patched-network).

Thanks for reading!
