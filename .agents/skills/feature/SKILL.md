---
name: feature
description: Manages the feature development workflow (load, start, review, explain, test, complete). Use when the user wants to start, track, test, review, or finalize a feature.
---

# Feature Workflow

Manages the full lifecycle of a feature from spec to merge.

## Working File

[context/current-feature.md](file:///home/ppt/Desktop/DEV/ai/dev_stash/context/current-feature.md)

## File Structure

`current-feature.md` has these sections:

- `## Current Feature` - H2 heading with feature name when active
- `## Status` - Not started | In Progress | Complete
- `## Goals` - Bullet points of what success looks like
- `## Notes` - Additional context, constraints, or details from spec
- `## History` - Completed features (append only)

## Actions

Determine which action the user requested:

| Action | Description | Reference |
|--------|-------------|-----------|
| `load` | Load a feature spec or inline description into `current-feature.md` | [actions/load.md](file:///home/ppt/Desktop/DEV/ai/dev_stash/.agents/skills/feature/actions/load.md) |
| `start` | Begin implementation, create and checkout feature branch | [actions/start.md](file:///home/ppt/Desktop/DEV/ai/dev_stash/.agents/skills/feature/actions/start.md) |
| `review` | Check whether goals are met and review code quality | [actions/review.md](file:///home/ppt/Desktop/DEV/ai/dev_stash/.agents/skills/feature/actions/review.md) |
| `explain` | Document what changed and why | [actions/explain.md](file:///home/ppt/Desktop/DEV/ai/dev_stash/.agents/skills/feature/actions/explain.md) |
| `test` | Write Vitest unit tests for server actions and utilities | [actions/test.md](file:///home/ppt/Desktop/DEV/ai/dev_stash/.agents/skills/feature/actions/test.md) |
| `complete` | Verify build/lint, commit, merge, and reset `current-feature.md` | [actions/complete.md](file:///home/ppt/Desktop/DEV/ai/dev_stash/.agents/skills/feature/actions/complete.md) |

Read the corresponding action document from the table above for detailed step-by-step instructions.

If no action is provided by the user, summarize the current feature status from `context/current-feature.md` and explain the available options.
