---
name: cleanup
description: Performs codebase housekeeping, code hygiene, and cleanup checks (unused imports, console.log, TODOs, env sync, context files). Use when the user asks to clean up, audit, or check project hygiene.
---

# Codebase Cleanup & Housekeeping

Review the codebase for the following cleanup tasks:

1. Make sure that the history in context/current-feature.md is in order from oldest to newest (if the file exists)
2. Find unnecessary `console.log` statements
3. Find unused imports
4. Check for stale `TODO` comments
5. Find orphaned/unused files
6. Check that project context files match actual project state
7. Check if `.env.production` has the same variables (keys, not values) as `../../../.env`. Report any missing keys.
8. Find `@ts-ignore` comments that might be stale

---

## Modes

### Check Mode (Default)
Triggered when no mode is specified or when the user asks to "check", "inspect", or "audit":
- Only report findings; do not modify any files.
- Present a numbered list of what could be cleaned up.

### Run / Fix Mode
Triggered when the user specifies "run", "fix", or asks to apply cleanups:
1. Report all findings as a numbered list first.
2. Ask the user: "Which items would you like me to fix? (enter numbers like 1,3,5, 'all', or 'none')".
3. Wait for user confirmation before making any changes.
4. Only fix the items the user specifies.
5. Report what was changed.
