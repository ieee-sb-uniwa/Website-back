# Workflow

How we go from an idea to code on the live site. These rules are the same for both repositories.

## The short version

1. Decide which repository your change belongs to: **Website-back** (root folder) or **Website-front** (`web/` folder).
2. In that repository, branch off `develop`.
3. Commit in small steps with clear messages.
4. Open a pull request into `develop` of the same repository.
5. Get one approval, then merge.
6. Reaching `main`: on Website-front, merge `develop` → `main` once the feature works. On Website-back, a maintainer does it at release time.

## Branches

| Branch | Purpose | Who pushes |
| --- | --- | --- |
| `main` | Finished, stable work. Production runs from here. | Nobody directly. Only PRs from `develop`. |
| `develop` | The next release. Everything is merged here first. | Nobody directly. Only PRs. |
| `<type>/<short-name>` | Your work. | You. |

On Website-front, a feature counts as **done** only when it reaches `main`. Website-back always points to Website-front's `main`, so only finished frontend work gets into the back repo.

Always create your branch from an up-to-date `develop` of the repository you are changing:

```bash
# Backend change: from the root folder
git switch develop
git pull
git switch -c feat/sponsors-endpoint

# Frontend change: from the web/ folder
cd web
git switch develop
git pull
git switch -c feat/sponsors-page
```

Name branches `<type>/<short-name>`, in lowercase with dashes. Use the same types as commits (below). Examples:

- `feat/sponsors-page`
- `fix/event-date-format`
- `docs/api-guide`

## Commits

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <what changed, in the imperative>
```

| Type | Use it for |
| --- | --- |
| `feat` | A new feature |
| `fix` | A bug fix |
| `refactor` | A code change that is neither a feature nor a fix |
| `docs` | Documentation only |
| `chore` | Config, dependencies, tooling |
| `data` | Content changes (JSON, images) |

Examples:

```
feat(events): add search by keyword
fix(projects): use API_URL in getProjectById
data(council): add 2026 council members
chore(web): bump submodule
```

Keep each commit focused on one thing. "fix stuff" and "updates" are not commit messages.

## Pull requests

- Target `develop` of the repository you changed, never `main`. Backend PRs go to **Website-back**, frontend PRs go to **Website-front**.
- Keep PRs small. One feature or fix per PR.
- Title: same format as a commit message or one sentence describing the changes.
- Description: what changed, why, and how to test it. Ideally, add screenshots for UI changes.
- Make sure the site runs locally with your change before you ask for a review.

**Review:** at least one approval from another member. The author merges after approval.

**Merge:** use **Squash and merge**, so each PR becomes one commit on `develop` of that repository. Delete the branch afterwards.

## Working with the submodule

`web/` is its own Git repository (`Website-front`) inside this one. The back repo stores only a pointer to a specific `web` commit.

### Frontend-only change

Work inside `web/` as if it were a normal repository:

```bash
cd web
git switch develop && git pull
git switch -c feat/contact-form
# ...code, commit...
git push -u origin feat/contact-form
```

1. Open the PR on **Website-front**, into its `develop`, and merge it after approval.
2. Check that the feature works on `develop`.
3. Open a PR on **Website-front**: `develop` → `main`. Merge it with **Create a merge commit**. The feature is now done.
4. Update the submodule pointer in the back repo (below).

### Backend-only change

Work in the root folder, branching off Website-back's `develop`. Open the PR on **Website-back**, into its `develop`.

### A change that touches both

For example, a new API endpoint plus the page that uses it.

1. Open the backend PR first (Website-back, into `develop`). The frontend depends on it.
2. Open the frontend PR (Website-front, into `develop`) and link the backend PR in the description.
3. Merge the backend PR, then the frontend PR.
4. Merge Website-front `develop` → `main`.
5. Update the submodule pointer (below).

### Updating the submodule pointer

The pointer always points to a commit on Website-front's `main`, never `develop`. After a frontend feature reaches `main`:

```bash
git switch develop && git pull
git -C web switch main && git -C web pull
git switch -c chore/bump-web
git add web
git commit -m "chore(web): bump submodule"
```

Open a PR into Website-back's `develop` like any other change.

### When you pull the back repo

If someone else bumped the pointer, update your `web/` folder too:

```bash
git pull
git submodule update
```

`submodule update` leaves `web` in detached HEAD. Switch to a branch before you work there.

## Releases

Frontend features already reach Website-front's `main` one at a time, so a release only concerns Website-back. A maintainer does it when Website-back's `develop` is stable:

1. Check that the `web` pointer on Website-back's `develop` is on the latest Website-front `main`. If not, update it first (see above).
2. Open a PR on **Website-back**: `develop` → `main`. Merge it with **Create a merge commit**.
3. Deploy.

## Ground rules

- Never commit `.env` or any password, token, or key.
- Never force-push to `main` or `develop`.
- Content must exist in both Greek and English.
- If you are stuck for more than an hour, ask :)
