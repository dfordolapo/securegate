# SecureGate - Reflection & Engineering Analysis

**Name:** Dolapo  
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

**My Answer:**  
Murphy’s Law affected my authentication flow and dashboard protection. In `middleware.ts`, I added protection so users without a valid session cannot access `/dashboard`. Without this, users could manually enter protected routes.

It also affected the signup flow in `app/api/signup/route.ts`. I added checks for existing users before creating accounts. Without that validation, duplicate accounts using the same email could break authentication logic.

**What goes wrong if ignored:**  
Users could access protected pages without logging in or create conflicting accounts in the database.

---

### Q2 - Law of Leaky Abstractions

**Code reference:** `middleware.ts`, `auth.ts`

**My Answer:**  
NextAuth simplified authentication, but I still had to understand how sessions and middleware work underneath. Route protection only worked correctly after understanding how NextAuth validates sessions.

The abstraction leaked because I could not rely only on the package defaults. I still had to debug redirects, session handling, and authentication state manually.

**What goes wrong if ignored:**  
Authentication may appear correct visually while protected routes remain exposed or sessions fail unexpectedly.

---

### Q3 - YAGNI

**Code reference:** Entire project scope

**My Answer:**  
I intentionally avoided adding features like social login, multi-factor authentication, and audit dashboards because they were outside the project requirements.

The core goal was building a secure authentication flow that works correctly. Adding too many extra features would have increased debugging time and complexity.

**What goes wrong if ignored:**  
The project becomes harder to maintain and more likely to contain unfinished or broken features.

---

### Q4 - Kerckhoffs's Principle

**Code reference:** `app/api/signup/route.ts`

**My Answer:**  
Passwords are hashed using bcrypt before storage. bcrypt automatically generates a salt so identical passwords do not produce identical hashes.

If I stored SHA-256 hashes directly instead, attackers could use rainbow tables or brute force attacks more easily because SHA-256 is too fast for password storage.

**What goes wrong if ignored:**  
Leaked passwords become easier to crack and user accounts become vulnerable.

---

### Q5 - Postel's Law / Security by Design

**Code reference:** `app/api/forgot-password/route.ts`

**My Answer:**  
The forgot password endpoint returns the same success message even when the email does not exist. This prevents attackers from checking which emails are registered in the system.

The API stays conservative with the information it reveals.

**What goes wrong if ignored:**  
Attackers could enumerate valid user emails and target real accounts.

---

### Q6 - Boy Scout Rule

**Code reference:** `auth.ts`

**My Answer:**  
While working on login validation, I cleaned up repeated authentication checks and removed unnecessary logic that was left from earlier debugging.

I also improved the password validation flow so failed logins return clean responses instead of confusing errors.

**What goes wrong if ignored:**  
Unused or messy logic makes debugging harder later and increases the chance of hidden bugs.

---

### Q7 - Gall's Law

**Code reference:** Entire project structure

**My Answer:**  
SecureGate grew phase by phase. I started with basic signup and login before adding email verification, password reset, middleware protection, and rate limiting.

Building everything at once would have made debugging difficult because multiple systems would fail at the same time.

**What goes wrong if ignored:**  
Complex bugs become harder to isolate and the system becomes unstable faster.

---

### Q8 - Prisma and Database Structure

**Code reference:** `prisma/schema.prisma`

**My Answer:**  
The Prisma schema is an abstraction over the real PostgreSQL database structure. Prisma models look simple, but the database still creates indexes, IDs, and relational structures underneath.

For example, Prisma handles generated IDs automatically even though the actual database stores them differently internally.

**What goes wrong if ignored:**  
Database migrations can fail or relationships may break unexpectedly.

---

### Q9 - Zawinski's Law

**Code reference:** `lib/rate-limit.ts`

**My Answer:**  
Rate limiting was not built into the authentication flow automatically, so I added Upstash Redis manually. This kept the authentication logic focused while adding extra protection separately.

This follows good separation of concerns instead of forcing every responsibility into one system.

**What goes wrong if ignored:**  
Applications grow into large systems with unclear responsibilities and become harder to secure.

---

### Q10 - Principle of Least Surprise

**Code reference:** Login form and auth flow

**My Answer:**  
When login credentials are incorrect, the UI shows a clear and predictable error message instead of exposing technical errors.

Users expect authentication forms to explain failures simply without revealing sensitive information.

**What goes wrong if ignored:**  
Confusing error messages reduce trust and may expose internal system details.

---

### Q11 - Defensive Programming

**Code reference:** `middleware.ts`

**My Answer:**  
The middleware checks whether a valid session exists before allowing access to protected routes. If a user deletes their session cookie manually, the middleware detects the missing session and redirects them back to login.

The app assumes users may break or manipulate sessions.

**What goes wrong if ignored:**  
Unauthorized users may gain access to protected routes.

---

### Q12 - Environment Variables and Secrets

**Code reference:** `.env.local`, Vercel environment variables

**My Answer:**  
Sensitive keys like `NEXTAUTH_SECRET`, `DATABASE_URL`, and `RESEND_API_KEY` are stored in environment variables instead of hardcoded into the project.

If `NEXTAUTH_SECRET` were pushed to GitHub accidentally, I would rotate the secret immediately, update Vercel variables, and redeploy the app.

**What goes wrong if ignored:**  
Attackers could forge sessions or gain access to protected services.

---

### Q13 - Conway's Law

**Code reference:** Project folder structure

**My Answer:**  
The project structure reflects how I think about the system. Authentication routes, middleware, database models, and UI components are separated by responsibility.

This made debugging easier because related logic stayed grouped together.

**What goes wrong if ignored:**  
The codebase becomes harder to navigate and maintain as the project grows.

---

### Q14 - Technical Debt

**Code reference:** Landing page components

**My Answer:**  
One piece of technical debt is that some landing page sections still contain repeated UI patterns instead of reusable components.

Right now it works, but scaling the design system would become harder because updates would need to be repeated manually across sections.

**What goes wrong if ignored:**  
UI maintenance becomes slower and inconsistencies appear across the application.

---

### Q15 - Adding Flutterwave Payments

**Code reference:** Future system architecture

**My Answer:**  
If Flutterwave payments were added, I would create secure payment routes on the backend instead of handling payment verification only on the frontend.

The system would need webhook validation, secure transaction storage, protected premium routes, and database updates tied to verified payments.

**What goes wrong if ignored:**  
Users could fake payment states or access premium features without successful transactions.

---

## Part 4 - One Thing I Would Refactor

One thing I would refactor is the repeated landing page card structure. Several sections use similar layouts but are written separately instead of using reusable components.

I would create a shared card component that accepts props for title, description, and icon. This would reduce duplication and make future UI updates easier.

---

## Part 5 - How This Changes How I Build

This project changed how I think about authentication and production systems. Before this project, I focused mostly on frontend behavior. Now I pay more attention to security, middleware, environment variables, session handling, and deployment issues.

I also learned that production environments expose problems that do not always appear locally. Testing on Vercel became just as important as testing on localhost.
