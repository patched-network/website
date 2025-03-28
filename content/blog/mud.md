---
title: Building Mud Castles
date: 2025-03-28
---

A minor update for update's sake.

Reminder: we're building tools to build tools to build people - open source foundations for modern ed-tech, skill development, and knowledge sharing.

In the [prior post](/blog/hello-world) I described the __next steps__ as teasing apart the existing monolithic codebase into modular components. My optimistic one-week estimate turned into about two weeks of work, with a family vacation besides.

but...

I'm happy to report that the big ball of mud has been separated into several smaller balls of mud, some of which are taking on vague semblances of their intended forms.

## Why ?

In software, a ball-of-mud is a program whose components are tightly intertwined with one another. This project ended up that way because of its history as a long-running personal side project.

Pulling the functionality apart makes it easier to:
- reason about and ensure correctness of individual pieces
- use different versions of individual pieces in different contexts
- recombine the pieces to serve different purposes

## Technical Brief

The [monorepo](https://github.com/patched-network/vue-skuilder) now has a number of packages that handle specific domains:
- `common` - some core logic and shared standards for communication between different packages and system services
- `common-ui` - implementations of UI components, including the main learner's loop
- `db` - all things persistance. Course content, user data, etc.

The boundaries between these packages provide decently clean lines for abstraction and the creation of different implementations for different purposes. In particular, the existing `db` implementation is based on a relationship between `pouchdb` in the browser and `couchdb` on the server, but shortly I'll add a side-by-side implementation for statically built courses and browser-local user data storage.

Most exciting is the brand new `standalone-ui` package, which is the templating basis for the (work-in-progress) project scaffolding CLI.

## Next Steps

The project scaffolding CLI is the major immediate focus.

Combining the CLI with the local-first + static site database implementation, I hope over the next couple of weeks to have both:
- a CLI tool that developers can play with
- enough built tooling to start pushing out some demo applications for everyone to play with

## Say Hello

As always, happy to hear from people either via the [contact](/contact) form or via the [GitHub Org](https://github.com/patched-network) or [repository](https://github.com/patched-network/vue-skuilder).
