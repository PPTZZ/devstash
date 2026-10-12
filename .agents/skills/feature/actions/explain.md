# Explain Action

1. Read `context/current-feature.md` to understand what was implemented.
2. Run `git diff master --name-only` (or `git diff main --name-only`, depending on the repo's primary branch) to get the list of files changed on this feature branch.
3. For each file created or modified:
	- Show the file path formatted as a clickable link (`[path/to/file.ts](file:///absolute/path)`).
	- Give a 1-2 sentence explanation of what it does / what changed.
	- Highlight any key functions, components, or patterns used.
4. End with a brief summary of how the pieces fit together.

Output format:

## Files Changed

- **[path/to/file.ts](file:///absolute/path)** (new): Brief explanation of what this file does and why it was added.
- **[path/to/other.ts](file:///absolute/path)** (modified): What changed and why.

## How It All Connects

Brief summary of the data/control flow between these files.
