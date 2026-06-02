# ACM Quest: The Engineering Bootcamp

Welcome to the gauntlet. 

If you're looking for another 14-hour video tutorial where you mindlessly copy a talking head, you're in the wrong place. Tutorial hell is for amateurs. Engineering is for us. 

In this bootcamp, there are no spoon-fed answers. Instead, you'll be operating like a Junior Developer at a fast-paced tech startup. Your Tech Lead (me) has defined a set of strict requirements. You will read the client briefs (the tests), write the code, and satisfy the automated CI/CD pipelines. 

Welcome to the real world. 🌍

---

## 🏁 Getting Started (One-Time Setup)

You will **not** be cloning this repository directly. Instead, you will create your own personal copy using GitHub's template feature.

### Step 1: Create Your Own Repository
1. Make sure you are logged into your GitHub account.
2. At the top of this repository page, click the green **"Use this template"** button → **"Create a new repository"**.
3. Name your repository something like `acm-bootcamp-solutions`.
4. **Make sure it is set to Public** (so GitHub Actions can run for free).
5. Click **Create repository**.

### Step 2: Clone & Install Locally
Open your terminal and run:
```bash
git clone https://github.com/YOUR_USERNAME/acm-bootcamp-solutions.git
cd acm-bootcamp-solutions
npm install
```

### Step 3: Verify It Works
Start the local dev server to make sure everything is wired up:
```bash
npm run dev
```

> [!WARNING]
> **DO NOT commit your `node_modules` folder.** If I see a PR with `node_modules` in it, I will personally close it, and you will get 0 points for the day. The `.gitignore` file handles this automatically — do not delete or modify it.

---

## 📅 The Daily Workflow (Phase 1)

Your job for the next 14 days is to build a robust, production-ready React Component Library from scratch. Every single day follows the exact same engineering workflow. Memorize it.

Look inside `src/components/`. You will see folders for each component (e.g., `Button`, `Modal`). Inside each folder, you are given:
- A skeleton `.jsx` file (an empty component — this is what you build).
- An empty `.css` file (for your styles).
- A `.test.jsx` file (**your requirements document — do not edit this**).

### 🔁 The Workflow (Repeat Every Day)

#### 1. Read Your Brief
**How do you know what to build?** You don't ask me. You read the `.test.jsx` file. The test file *is* your client brief. Read the assertions to understand what props the component takes, what classes it needs, and exactly how it should behave.

#### 2. Create a New Branch
**You must create a new branch for each day's component.** Do not work on `main` directly. Ever.
```bash
git checkout main
git pull origin main
git checkout -b feature/day1-button
```
Replace `day1-button` with the appropriate day and component name (e.g., `feature/day2-input`, `feature/day8-modal`).

#### 3. Write Your Code
Open the skeleton `.jsx` file and the empty `.css` file and implement the component to satisfy the test requirements.

#### 4. Test Locally (This Is Non-Negotiable)
Before you push anything, run the tests for your specific component:
```bash
npx vitest run src/components/Button
```
Replace `Button` with the component you are working on. **You must get this completely green before you push.** If you treat the CI pipeline as your debugger, you will lose the First-Push Green Bonus.

#### 5. Commit & Push Your Branch
```bash
git add .
git commit -m "feat: complete Day 1 Button component"
git push -u origin feature/day1-button
```

#### 6. Open a Pull Request (PR) on GitHub
1. Go to your repository on GitHub.
2. You will see a yellow banner: *"feature/day1-button had recent pushes"*. Click **"Compare & pull request"**.
3. Make sure the PR is targeting the `main` branch of **your own** repository.
4. Click **"Create pull request"**.
5. Sit back and watch the robots grade your code. ✅

> [!CAUTION]
> **If you push directly to `main` without opening a Pull Request, the grading pipeline will NOT run and you will receive 0 points.** The pipeline only triggers on Pull Requests. This is by design — in real engineering teams, you never push to production directly.

---

## 🤖 The CI/CD Pipeline & Leaderboard Points

In the real world, code isn't reviewed by just humans; it's checked by robots. 

When you open a Pull Request to the `main` branch, our automated GitHub Actions pipeline will:
1. Detect exactly which component you modified (using `git diff`).
2. Run tests **only** for that specific component (so other unfinished components won't break your build).
3. Calculate your points.
4. Post a grading comment directly on your PR with your score breakdown.

If you push additional commits to the same PR, the pipeline re-runs and **updates** the same comment with your new score.

### Points Breakdown (20 Points Max Per Component)

| Criterion | Points | How to Earn It |
|:---|:---:|:---|
| **Functional Base** | +10 | All tests pass. If even one fails, you get 0 and forfeit all bonuses. |
| **First-Push Green Bonus** | +5 | Tests pass on the very first commit of the PR. Test locally first! |
| **Speedy Dev Bonus** | +5 | Code pushed before **11:59 PM IST** on the assigned day. |
| **Total** | **20** | |

---

## 🚀 Phase 2 (Teaser)

Think Phase 1 is tough? It's just the warmup. 

In Phase 2, we stop building isolated components and start building full, responsive web applications using the component library you just created. Your work will be strictly graded by automated Lighthouse CI audits. If your performance, accessibility, or SEO scores drop below 90+, the pipeline fails.

---

## ⚠️ Rules of Engagement

1. **Do NOT edit the `.test.jsx` files to make them pass.** 
   I have hidden automation scripts that check the integrity of the test files on the server. If you tamper with the tests to cheat the grading system, the pipeline will flag you, and you will fail the assignment immediately.

2. **Do NOT push directly to `main`.** 
   Always create a feature branch and open a Pull Request. Direct pushes to `main` bypass the grading pipeline entirely, and you will receive 0 points.

3. **Do NOT commit `node_modules`, `test-results.json`, or `points-summary.md`.** 
   These are generated files. The `.gitignore` handles this. Don't touch it.

4. **Google your errors. Read the docs.** 
   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), [Vitest](https://vitest.dev/), and [MDN Web Docs](https://developer.mozilla.org/) are your best friends. If you get stuck, your first instinct should be to research the error, not panic.

Good luck. You're going to need it. 💻🔥
