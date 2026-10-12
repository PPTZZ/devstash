# Load Action

1. Check the user input for the feature target:
   - If a spec filename or name is provided (e.g., `auth-phase-1` or `auth-phase-1-spec.md`): Look for `context/features/{name}.md` or `context/fixes/{name}.md`. Read the spec file.
   - If an inline description is provided: Use it directly as the feature description and draft clear, actionable goals.
   - If no target is specified: Ask the user to provide a spec filename from `context/features/` or describe the feature to load.

2. Update current-feature.md:
	- Update the feature name under `## Current Feature` to include the new feature name.
	- Write goals as bullet points under `## Goals`.
	- Write any additional notes/context under `## Notes`.
	- Set `## Status` to "Not started".

3. Confirm spec loaded and show the feature summary
