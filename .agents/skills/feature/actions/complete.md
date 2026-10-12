# Complete Action

1. Run verification commands (`pnpm lint` and `pnpm build`) to ensure there are 0 errors.
2. Run a final review to ensure all feature goals from `context/current-feature.md` are met.
3. Stage all changes (`git add .`) and prepare a conventional commit message (e.g., `feat: ...`).
4. Ask for user confirmation before committing.
5. Commit the changes once confirmed.
6. Push the feature branch to origin (if a remote is configured).
7. Determine the base branch (e.g., `master` or `main`).
8. Switch back to the base branch (`git checkout <base-branch>`).
9. Pull the latest changes on the base branch (`git pull`).
10. Merge the feature branch into the base branch (`git merge feature/<name>`).
11. Push the updated base branch to origin.
12. Delete the merged local feature branch (`git branch -d feature/<name>`).
13. Reset `context/current-feature.md`:
	- Clear the content of `## Goals` and `## Notes` sections (preserve comments if present).
	- Set `## Status` to "Complete".
	- Append a clear summary of the completed work to `## History`.
