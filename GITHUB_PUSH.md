# GitHub Push Guide

Step-by-step instructions to push **Nexus AI** to your GitHub repository.

**Repository URL:** https://github.com/artyomwhite/-ai-saas-dashboard

---

## Step 1 — Create the GitHub Repository (if not created yet)

1. Go to [github.com/new](https://github.com/new)
2. Set **Repository name** to: `ai-saas-dashboard`
3. Set visibility to **Public** (recommended for portfolio)
4. **Do NOT** initialize with README, .gitignore, or license — this project already includes them
5. Click **Create repository**

---

## Step 2 — Open Terminal in Project Folder

Open PowerShell or Git Bash and navigate to the project:

```bash
cd C:\Users\User\Desktop\ai-saas-dashboard
```

*(Adjust the path if your project is in a different location.)*

---

## Step 3 — Verify Git Is Initialized

Check git status:

```bash
git status
```

If you see `fatal: not a git repository`, initialize git:

```bash
git init
git branch -M main
```

---

## Step 4 — Connect to GitHub Remote

Add your GitHub repository as the remote origin:

```bash
git remote add origin https://github.com/artyomwhite/-ai-saas-dashboard.git
```

If `origin` already exists and points to the wrong URL, update it:

```bash
git remote set-url origin https://github.com/artyomwhite/-ai-saas-dashboard.git
```

Verify the remote:

```bash
git remote -v
```

Expected output:

```
origin  https://github.com/artyomwhite/-ai-saas-dashboard.git (fetch)
origin  https://github.com/artyomwhite/-ai-saas-dashboard.git (push)
```

---

## Step 5 — Stage and Commit

Stage all project files:

```bash
git add .
```

Create the initial commit:

```bash
git commit -m "feat: initial SaaS dashboard MVP"
```

---

## Step 6 — Push to GitHub

Set the default branch to `main` and push:

```bash
git branch -M main
git push -u origin main
```

GitHub may ask you to sign in. Use one of these methods:

- **Browser login** — follow the GitHub CLI or credential prompt
- **Personal Access Token** — use your token as the password when prompted

After a successful push, visit:

**https://github.com/artyomwhite/-ai-saas-dashboard**

Your code should be live on GitHub.

---

## Step 7 — Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select `artyomwhite/ai-saas-dashboard`
4. Vercel auto-detects Next.js — keep default settings
5. Add environment variables under **Environment Variables**:

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | Your production database URL (see note below) |
   | `OPENAI_API_KEY` | Your OpenAI key (optional) |

6. Click **Deploy**

### Database note for Vercel

SQLite (`file:./dev.db`) only works locally. For production on Vercel:

- Use **Neon**, **Supabase**, or **Turso** for a hosted database
- Update `DATABASE_URL` in Vercel environment variables
- Optionally switch `provider` in `prisma/schema.prisma` from `sqlite` to `postgresql` or `mysql`

For portfolio demos, you can deploy without a production DB — the app will build, but chat persistence requires a hosted database.

---

## Troubleshooting

### `remote origin already exists`

```bash
git remote set-url origin https://github.com/artyomwhite/-ai-saas-dashboard.git
```

### `failed to push — rejected`

If the remote has commits you don't have locally:

```bash
git pull origin main --rebase
git push -u origin main
```

### Authentication failed

Create a Personal Access Token at [github.com/settings/tokens](https://github.com/settings/tokens) with `repo` scope. Use it as your password when pushing.

---

## Quick Reference (copy-paste)

```bash
cd C:\Users\User\Desktop\ai-saas-dashboard
git remote add origin https://github.com/artyomwhite/-ai-saas-dashboard.git
git branch -M main
git add .
git commit -m "feat: initial SaaS dashboard MVP"
git push -u origin main
```

---

Done. Your SaaS MVP is ready for GitHub and Vercel.
