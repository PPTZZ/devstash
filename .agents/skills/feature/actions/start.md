# Start Action

1. Read `context/current-feature.md` and verify that the `## Goals` section is populated.
2. If empty, inform the user: "No active feature goals found in `context/current-feature.md`. Please run the 'load' action first to load a spec or feature description."
3. Set `## Status` to "In Progress" in `context/current-feature.md`.
4. Create and checkout the feature branch in git formatted in kebab-case with prefix `feature/` (e.g., `feature/auth-credentials` derived from `## Current Feature`).
5. List the goals to the user, then proceed with implementation step-by-step.
