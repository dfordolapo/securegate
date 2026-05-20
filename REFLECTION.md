# SecureGate - Reflection & Engineering Analysis

**Name:** Dolapo Oyekanmi 
**Cohort:** Design to MVP Bootcamp  
**Live URL:** https://securegateco.vercel.app/
**GitHub Repo:** https://github.com/dfordolapo/securegate/

---

## Part 1 - What I Built

I built SecureGate, an authentication system with signup, login, email verification, password reset, protected routes, and rate limiting. The project uses Next.js, Prisma, PostgreSQL, NextAuth, Resend, and Upstash Redis.

Users can create accounts, verify their email, reset forgotten passwords, and access protected dashboard routes only after authentication. The app is deployed on Vercel and connected to a live PostgreSQL database.

---

## Part 2 - What Surprised Me

The hardest part was getting authentication to work correctly in production after deployment. The app worked locally, but Vercel failed because some environment variables were missing and Prisma could not connect to the database.

I learned that authentication systems depend heavily on configuration. A small issue like a missing DATABASE_URL can completely break signup and login flows even when the frontend looks correct.

---

## Part 3 - Engineering Laws Quiz

### Q1 - Murphy's Law

**Code reference:** `middleware.ts`, `app/api/signup/route.ts`
 
Murphy’s Law affected my authentication flow and dashboard protection. In `middleware.ts`, I added protection so users without a valid session cannot access `/dashboard`. Without this, users could manually enter protected routes.

It also affected the signup flow in `app/api/signup/route.ts`. I added checks for existing users before creating accounts. Without that validation, duplicate accounts using the same email could break authentication logic.

**What goes wrong if ignored:**  
Users could access protected pages without logging in or create conflicting accounts in the database.

---

### Q2 - Law of Leaky Abstractions

**Code reference:** `middleware.ts`, `auth.ts`

NextAuth simplified authentication, but I still had to understand how sessions and middleware work underneath. Route protection only worked correctly after understanding how NextAuth validates sessions.

The abstraction leaked because I could not rely only on the package defaults. I still had to debug redirects, session handling, and authentication state manually.

**What goes wrong if ignored:**  
Authentication may appear correct visually while protected routes remain exposed or sessions fail unexpectedly.

---

### Q3 - YAGNI

**Code reference:** Entire project scope

I intentionally avoided adding features like social login, multi-factor authentication, and audit dashboards because they were outside the project requirements.

The core goal was building a secure authentication flow that works correctly. Adding too many extra features would have increased debugging time and complexity.

**What goes wrong if ignored:**  
The project becomes harder to maintain and more likely to contain unfinished or broken features.

---

### Q4 - Kerckhoffs's Principle

**Code reference:** `app/api/signup/route.ts`

Passwords are hashed using bcrypt before storage. bcrypt automatically generates a salt so identical passwords do not produce identical hashes.

If I stored SHA-256 hashes directly instead, attackers could use rainbow tables or brute force attacks more easily because SHA-256 is too fast for password storage.

**What goes wrong if ignored:**  
Leaked passwords become easier to crack and user accounts become vulnerable.

---

### Q5 - Postel's Law / Security by Design

**Code reference:** `app/api/forgot-password/route.ts`

The forgot password endpoint returns the same success message even when the email does not exist. This prevents attackers from checking which emails are registered in the system.

The API stays conservative with the information it reveals.

**What goes wrong if ignored:**  
Attackers could enumerate valid user emails and target real accounts.

---

### Q6 - Boy Scout Rule

**Code reference: app/api/forgot-password/route.ts, auth.ts

While debugging authentication, I noticed repeated user lookup and validation logic across multiple routes. Both the login flow and forgot-password flow were querying users with similar checks before continuing.

I cleaned this up by moving shared authentication-related logic into reusable helpers instead of repeating Prisma queries and validation in multiple route handlers.

I also simplified the error handling so routes returned consistent responses instead of different messages depending on where the validation failed.

If I ignored this cleanup, authentication logic could drift over time and different routes might handle the same user state differently.
---

### Q7 - Gall's Law

**Code reference:** Entire project structure
 
SecureGate grew phase by phase. I started with basic signup and login before adding email verification, password reset, middleware protection, and rate limiting.

Building everything at once would have made debugging difficult because multiple systems would fail at the same time.

**What goes wrong if ignored:**  
Complex bugs become harder to isolate and the system becomes unstable faster.

---

### Q8 - Prisma and Database Structure

**Code reference: prisma/schema.prisma

Prisma simplified database interactions, but it also hid some database behavior behind abstractions.

For example, in schema.prisma:id String @id @default(cuid()) looks like the database generates the ID automatically, but PostgreSQL itself does not natively create cuid() values. Prisma generates the ID in the application layer before inserting the record into PostgreSQL.

The same thing happens with fields like @updatedAt. Prisma automatically updates the timestamp during writes, but PostgreSQL is not directly managing that logic.

This mattered during deployment because the app worked locally with SQLite but failed on Vercel until I switched the datasource provider to PostgreSQL and updated the environment configuration correctly.

If I ignored the abstraction layer completely, I could make incorrect assumptions about how the database actually behaves underneath Prisma.
---

### Q9 - Zawinski's Law

**Code reference: lib/rate-limit.ts, middleware.ts

Authentication and abuse prevention were separated intentionally.

NextAuth handled authentication and sessions, while Upstash Redis handled rate limiting separately through lib/rate-limit.ts.

I avoided placing throttling logic directly inside authentication handlers because authentication already had enough responsibilities including password validation, session handling, redirects, and token management.

Keeping rate limiting isolated made the system easier to debug and maintain. It also allowed middleware and auth routes to stay focused on access control rather than traffic management.

If I pushed every responsibility into the authentication layer, the codebase would become harder to reason about and much more fragile during debugging.
---

### Q10 - Principle of Least Surprise

**Code reference:** Login form and auth flow

When login credentials are incorrect, the UI shows a clear and predictable error message instead of exposing technical errors.

Users expect authentication forms to explain failures simply without revealing sensitive information.

**What goes wrong if ignored:**  
Confusing error messages reduce trust and may expose internal system details.

---

### Q11 - Defensive Programming

**Code reference:** `middleware.ts`

The middleware checks whether a valid session exists before allowing access to protected routes. If a user deletes their session cookie manually, the middleware detects the missing session and redirects them back to login.

The app assumes users may break or manipulate sessions.

**What goes wrong if ignored:**  
Unauthorized users may gain access to protected routes.

---

### Q12 - Environment Variables and Secrets

**Code reference:** `.env.local`, Vercel environment variables

Sensitive keys like `NEXTAUTH_SECRET`, `DATABASE_URL`, and `RESEND_API_KEY` are stored in environment variables instead of hardcoded into the project.

If `NEXTAUTH_SECRET` were pushed to GitHub accidentally, I would rotate the secret immediately, update Vercel variables, and redeploy the app.

**What goes wrong if ignored:**  
Attackers could forge sessions or gain access to protected services.

---

### Q13 - Conway's Law

**Code reference:** Project folder structure

The project structure reflects how I think about the system. Authentication routes, middleware, database models, and UI components are separated by responsibility.

This made debugging easier because related logic stayed grouped together.

**What goes wrong if ignored:**  
The codebase becomes harder to navigate and maintain as the project grows.

---

### Q14 - Technical Debt

**Code reference:** Landing page components

One piece of technical debt is that some landing page sections still contain repeated UI patterns instead of reusable components.

Right now it works, but scaling the design system would become harder because updates would need to be repeated manually across sections.

**What goes wrong if ignored:**  
UI maintenance becomes slower and inconsistencies appear across the application.

---

### Q15 - Adding Flutterwave Payments

**Code reference: Future architecture extension

If Flutterwave payments were added, payment verification would happen on the backend instead of trusting frontend responses.

I would create a dedicated route such as:app/api/payments/verify/route.ts
The frontend would redirect users to Flutterwave checkout, and Flutterwave webhooks would notify the backend after payment completion.

The backend would then verify the transaction securely using the Flutterwave secret key stored in environment variables before updating subscription status in PostgreSQL.

Middleware would protect premium routes by checking the user subscription state before granting access.

If payment verification happened only on the frontend, users could fake successful payments by modifying requests manually and gain unauthorized access to premium features.

---

## Part 4 - One Thing I Would Refactor

One thing I would refactor is the repeated landing page card structure. Several sections use similar layouts but are written separately instead of using reusable components.

I would create a shared card component that accepts props for title, description, and icon. This would reduce duplication and make future UI updates easier.

---

## Part 5 - How This Changes How I Build

This project changed how I think about authentication and production systems. Before this project, I focused mostly on frontend behavior. Now I pay more attention to security, middleware, environment variables, session handling, and deployment issues.

I also learned that production environments expose problems that do not always appear locally. Testing on Vercel became just as important as testing on localhost.
