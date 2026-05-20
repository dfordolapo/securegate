# SecureGate - Reflection & Engineering Analysis

**Name:** Dolapo Oyekanmi  
**Cohort:** Design to MVP Bootcamp  
**Live URL:** https://securegateco.vercel.app/  
**GitHub Repo:** https://github.com/dfordolapo/securegate/

---

# Part 1 - What I Built

I built SecureGate, a full authentication system with signup, login, email verification, password reset, protected routes, and rate limiting.

The project uses:
- Next.js
- Prisma ORM
- PostgreSQL
- NextAuth
- Resend
- Upstash Redis
- Vercel

Users can create accounts, verify their email address, reset forgotten passwords, and access protected dashboard routes only after authentication.

The app is deployed on Vercel and connected to a live PostgreSQL database.

---

# Part 2 - What Surprised Me

The hardest part of the project was getting authentication to work correctly in production after deployment.

The app worked locally, but Vercel failed because some environment variables were missing and Prisma could not connect to the database correctly.

One missing `DATABASE_URL` completely broke signup and login functionality even though the frontend looked fine.

I also learned that authentication systems depend heavily on configuration and infrastructure. Middleware, sessions, tokens, database connections, and deployment settings all depend on each other. Small mistakes can break the entire flow.

---

# Part 3 - Engineering Laws Quiz

## Q1 - Murphy's Law

**Code reference:** `middleware.ts`, `app/api/signup/route.ts`

Murphy’s Law affected both authentication and dashboard protection in SecureGate.

In `middleware.ts`, I added checks to prevent unauthenticated users from accessing `/dashboard`. Without middleware protection, users could manually type protected routes into the URL and bypass authentication.

In `app/api/signup/route.ts`, I added checks for existing users before account creation. Without this validation, duplicate accounts using the same email address could be created and cause conflicts during login and verification.

### What goes wrong if ignored

Users could access protected pages without authentication or create duplicate accounts that break authentication logic.

---

## Q2 - Law of Leaky Abstractions

**Code reference:** `middleware.ts`, `auth.ts`

NextAuth simplified authentication, but some implementation details still leaked through the abstraction layer during development.

Even though NextAuth handled sessions automatically, I still needed to understand how sessions, middleware, redirects, and token validation worked underneath.

For example, route protection only worked correctly after understanding how NextAuth validates sessions inside middleware. I also had to debug redirect behavior and authentication state manually instead of relying completely on package defaults.

### What goes wrong if ignored

Authentication can appear correct visually while protected routes remain exposed or sessions fail unexpectedly.

---

## Q3 - YAGNI

**Code reference:** Entire project scope

I intentionally avoided adding features like social login, multi-factor authentication, and admin dashboards because they were outside the project requirements.

The main goal was building a secure authentication flow that worked reliably first. Adding unnecessary features early would have increased debugging complexity and slowed deployment.

### What goes wrong if ignored

The project becomes harder to maintain and more likely to contain unfinished or unstable features.

---

## Q4 - Kerckhoffs's Principle

**Code reference:** `app/api/signup/route.ts`

Passwords are hashed using bcrypt before storage. bcrypt automatically generates salts so identical passwords do not produce identical hashes.

If I stored SHA-256 password hashes directly instead, attackers could use rainbow tables or brute-force attacks more effectively because SHA-256 is designed for speed rather than password protection.

bcrypt is intentionally slower, which makes password cracking significantly more expensive.

### What goes wrong if ignored

Leaked passwords become easier to crack and user accounts become vulnerable.

---

## Q5 - Postel's Law / Security by Design

**Code reference:** `app/api/forgot-password/route.ts`

The forgot-password endpoint returns the same success response even when an email address does not exist in the database.

This prevents attackers from checking which emails are registered in the system through response differences.

The API stays conservative with the information it exposes publicly.

### What goes wrong if ignored

Attackers could enumerate valid user accounts and target real users more easily.

---

## Q6 - Boy Scout Rule

**Code reference:** `app/api/forgot-password/route.ts`, `auth.ts`

While debugging authentication flows, I noticed repeated user lookup and validation logic across multiple routes.

Both the login flow and forgot-password flow were querying users with similar Prisma checks before continuing.

I cleaned this up by moving shared authentication-related validation into reusable helpers instead of repeating database queries and validation logic across different route handlers.

I also simplified error handling so authentication routes returned more consistent responses during failures.

### What goes wrong if ignored

Authentication logic could drift over time and different routes might handle the same user state inconsistently.

---

## Q7 - Gall's Law

**Code reference:** Entire project structure

SecureGate grew phase by phase.

I started with basic signup and login functionality before adding email verification, password reset, middleware protection, and rate limiting.

Building the system incrementally made debugging easier because I could isolate failures instead of troubleshooting multiple systems at once.

### What goes wrong if ignored

Complex systems become unstable faster and bugs become harder to isolate.

---

## Q8 - Prisma and Database Structure

**Code reference:** `prisma/schema.prisma`

Prisma simplified database interactions, but some database behavior still leaked through the abstraction layer during development and deployment.

For example, in `schema.prisma`:

`id String @id @default(cuid())`

looks like PostgreSQL generates IDs automatically, but PostgreSQL does not natively create `cuid()` values. Prisma generates those IDs in the application layer before inserting records into the database.

The same thing happens with `@updatedAt` fields. Prisma automatically updates timestamps during writes even though PostgreSQL itself is not directly managing that behavior.

This became important during deployment because the app initially worked locally with SQLite but failed on Vercel until I switched the datasource provider to PostgreSQL and configured environment variables correctly.

### What goes wrong if ignored

Developers can make incorrect assumptions about how the database behaves underneath Prisma, especially during deployment or migrations.

---

## Q9 - Zawinski's Law

**Code reference:** `lib/rate-limit.ts`, `middleware.ts`

Authentication and abuse prevention were separated intentionally.

NextAuth handled authentication and session management, while Upstash Redis handled request throttling separately through `lib/rate-limit.ts`.

I avoided placing rate-limiting logic directly inside authentication handlers because authentication already handled password validation, redirects, session creation, and token management.

Keeping rate limiting isolated made the system easier to debug and maintain.

### What goes wrong if ignored

The authentication layer becomes overloaded with unrelated responsibilities and the codebase becomes harder to reason about.

---

## Q10 - Principle of Least Surprise

**Code reference:** Login form and authentication flow

When login credentials are incorrect, the UI shows a simple and predictable error message instead of exposing technical details.

Users expect authentication systems to explain failures clearly without leaking internal system behavior.

### What goes wrong if ignored

Confusing or overly technical errors reduce trust and may expose sensitive implementation details.

---

## Q11 - Defensive Programming

**Code reference:** `middleware.ts`

Middleware checks whether a valid session exists before allowing access to protected routes.

If a user manually deletes their session cookie or modifies session state, middleware detects the missing session and redirects them back to login.

The application assumes sessions can break or be manipulated unexpectedly.

### What goes wrong if ignored

Unauthorized users may gain access to protected routes.

---

## Q12 - Environment Variables and Secrets

**Code reference:** `.env.local`, Vercel environment variables

Sensitive values like `NEXTAUTH_SECRET`, `DATABASE_URL`, and `RESEND_API_KEY` are stored in environment variables instead of being hardcoded directly into the application.

If `NEXTAUTH_SECRET` were accidentally pushed to GitHub, I would rotate the secret immediately, update Vercel environment variables, and redeploy the application.

### What goes wrong if ignored

Attackers could forge sessions or gain unauthorized access to protected services.

---

## Q13 - Conway's Law

**Code reference:** Project folder structure

The project structure reflects how I separated responsibilities mentally while building the system.

Authentication routes, middleware, database schema, UI components, and utility logic are grouped separately based on their roles in the application.

This made debugging easier because related functionality stayed organized together.

### What goes wrong if ignored

The codebase becomes harder to navigate and maintain as the project grows.

---

## Q14 - Technical Debt

**Code reference:** Landing page components

One piece of technical debt is the repeated landing-page card structure across multiple sections.

Several sections use very similar layouts but are still written separately instead of using reusable shared components.

The current implementation works, but scaling the design system later would become harder because UI changes would need to be repeated manually across sections.

### What goes wrong if ignored

UI maintenance becomes slower and inconsistencies appear across the application.

---

## Q15 - Adding Flutterwave Payments

**Code reference:** Future architecture extension

If Flutterwave payments were added, payment verification would happen on the backend instead of trusting frontend responses.

I would create a dedicated route such as:

`app/api/payments/verify/route.ts`

The frontend would redirect users to Flutterwave checkout, while Flutterwave webhooks would notify the backend after payment completion.

The backend would verify the transaction securely using Flutterwave secret keys stored in environment variables before updating subscription data in PostgreSQL.

Middleware would then protect premium routes by checking subscription status before granting access.

### What goes wrong if ignored

If payment verification happens only on the frontend, users could fake successful payments and gain unauthorized access to premium features.

---

# Part 4 - One Thing I Would Refactor

One thing I would refactor is the repeated landing-page card structure.

Several sections use nearly identical card layouts but are still written separately instead of using reusable shared components.

I would create a reusable card component that accepts props for title, description, and icon so future UI updates could be handled from a single place.

---

# Part 5 - How This Changes How I Build

This project changed how I think about authentication and production systems.

Before this project, I focused mostly on frontend behavior. During this project, I spent much more time thinking about middleware, sessions, deployment issues, environment variables, database configuration, and security.

I also learned that production environments expose problems that do not always appear locally. Testing on Vercel became just as important as testing on localhost.I also learned that production environments expose problems that do not always appear locally. Testing on Vercel became just as important as testing on localhost.
