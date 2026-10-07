# DevStash

A developer knowledge hub for snippets,commands, prompts, notes, files, images, links and custom types.

---

## 1. Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md


---

## 2. Database Access (Neon MCP)

When interacting with the Neon database via MCP tools, ALWAYS adhere to the following rules:

1. **Default Target:** Unless explicitly instructed otherwise, ALWAYS use the **`dev_stash`** project and the **`development`** branch.
2. **Required IDs:** Automatically include the following arguments when calling Neon MCP tools (like `run_sql`, `get_database_tables`, etc.):          
    - `project_id`: `"spring-union-11814046"`
    - `branch_id`: `"br-snowy-sea-asgqwir2"`
**Production Safeguard:** NEVER query, modify, or interact with the `production` branch unless I explicitly specify "production branch" in my       
request. Always assume requests are meant for the development branch.

---

## 3. Development Commands

Always use `pnpm` as the package manager for executing scripts and installing packages:

| Command | Action |
| :--- | :--- |
| `pnpm add` | Use to install extra dependencies to the project (`npm install`) |
| `pnpm dev` | Start the development server using Next.js (`next dev`) |
| `pnpm build` | Compile and build the production bundle (`next build`) |
| `pnpm start` | Run the built production application (`next start`) |
| `pnpm lint` | Execute ESLint code analysis (`eslint`) |



---

## 4. Skill Execution Guidelines

Whenever a skill is invoked, ALWAYS adhere to the following 3-step protocol:

1. **Mandatory Reading:** Before taking any action, you must find and read the `SKILL.md` file associated with the invoked skill in its entirety.
2. **Action Identification:** Identify the exact, specific action you have been requested to perform based on the user's prompt and the skill's capabilities.
3. **Strict Scope Enforcement:** You must solve *only* the specific task requested. Do not hallucinate additional steps, do not infer unstated requirements, and do not attempt to be "helpful" by doing extra work. Execute the requested action and stop.
