"use client";

import Link from "next/link";

import {
  Shield,
  Key,
  Fingerprint,
  Users,
  Lock,
  Activity,

  ArrowRight,
  Code,
  Zap,
  CheckCircle,
} from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        {/* ── Hero ── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left — illustration with decorative shapes */}
              <div className="relative">
                {/* Decorative shapes */}
                <div className="absolute -top-8 -left-8 h-72 w-72 rounded-full border-2 border-accent/10" />
                <div className="absolute -bottom-6 -right-4 h-40 w-40 rounded-2xl bg-accent/5 -rotate-12" />
                <div className="absolute top-1/2 -right-12 h-20 w-20 rounded-xl bg-accent/8 -translate-y-1/2 rotate-45" />

                {/* Frame */}
                <div className="relative overflow-hidden border border-border bg-background shadow-2xl"
                     style={{ borderRadius: "2rem", borderTopRightRadius: "0.5rem", borderBottomLeftRadius: "0.5rem" }}>
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-muted/40" />
                    <div className="h-2.5 w-2.5 rounded-full bg-muted/40" />
                    <div className="h-2.5 w-2.5 rounded-full bg-muted/40" />
                    <div className="ml-4 flex items-center gap-2 rounded-md bg-card px-3 py-1.5 text-xs text-muted">
                      <Lock className="h-3 w-3" />
                      app.securegate.io/dashboard
                    </div>
                  </div>

                  {/* Dashboard mockup */}
                  <div className="flex">
                    {/* Sidebar */}
                    <div className="hidden w-48 border-r border-border p-4 sm:block">
                      <div className="mb-6 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span className="text-xs font-semibold text-foreground">SecureGate</span>
                      </div>
                      <div className="space-y-2">
                        {['Overview', 'Threats', 'Activity', 'Access', 'Settings'].map((item, i) => (
                          <div
                            key={item}
                            className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs ${
                              i === 0 ? 'bg-blue-500/10 text-blue-400' : 'text-muted'
                            }`}
                          >
                            <div className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-muted/40'}`} />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-4 sm:p-5">
                      {/* Top bar */}
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <div className="h-3 w-32 rounded bg-muted/20" />
                          <div className="mt-1.5 h-2 w-48 rounded bg-muted/20" />
                        </div>
                        <div className="flex gap-2">
                          <div className="h-6 w-6 rounded-lg bg-muted/20" />
                          <div className="h-6 w-6 rounded-lg bg-muted/20" />
                        </div>
                      </div>

                      {/* Stats cards */}
                      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {[
                          { label: 'Active Threats', value: '3', color: 'bg-red-500/20' },
                          { label: 'Total Users', value: '2,845', color: 'bg-blue-500/20' },
                          { label: 'System Status', value: 'Healthy', color: 'bg-accent/20' },
                          { label: 'Failed Logins', value: '142', color: 'bg-amber-500/20' },
                        ].map(({ label, value, color }) => (
                          <div key={label} className="rounded-lg border border-border bg-card p-3">
                            <div className={`mb-2 h-6 w-6 rounded-lg ${color}`} />
                            <div className="text-sm font-semibold text-foreground">{value}</div>
                            <div className="text-[10px] text-muted">{label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Chart area */}
                      <div className="rounded-lg border border-border bg-card p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="h-3 w-20 rounded bg-muted/20" />
                          <div className="flex gap-1.5">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="h-5 w-5 rounded border border-border" />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-end gap-2 h-20">
                          {[35, 50, 28, 65, 42, 80, 38, 55, 25, 70, 48, 75].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
                              <div
                                className={`w-full rounded-t ${
                                  h > 70 ? 'bg-red-500/60' : h > 50 ? 'bg-amber-500/60' : 'bg-blue-500/40'
                                }`}
                                style={{ height: `${h}%` }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — copy */}
              <div className="text-left">
                <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
                  <Zap className="h-3 w-3 text-blue-500" />
                  Developer-first authentication
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-4xl max-w-2xl leading-tight">
                  Authentication infrastructure that <span className="text-blue-500">scales with your product</span>.
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-muted max-w-lg">
                  SecureGate handles signup flows, email verification, password recovery, session protection, and route security so developers can ship faster with fewer auth headaches.
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-blue-600 shadow-sm"
                  >
                    Create Account
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/login"
                    className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-muted transition-colors hover:border-foreground/20 hover:text-foreground"
                  >
                    Log In
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <section className="border-b border-border py-14">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                { value: '10K+', label: 'Active Users' },
                { value: '99.9%', label: 'Uptime SLA' },
                { value: '<50ms', label: 'Avg. Response' },
                { value: '250+', label: 'Enterprise Clients' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl font-bold text-foreground">{value}</div>
                  <div className="mt-1 text-sm text-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="border-b border-border py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                How It Works
              </h2>
              <p className="mt-3 text-muted">
                Get up and running in minutes, not days.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Create your account',
                  desc: 'Sign up with your email and set up your organization in seconds.',
                  icon: Users,
                },
                {
                  step: '02',
                  title: 'Configure your stack',
                  desc: 'Integrate SecureGate with your existing auth flow using our API or SDK.',
                  icon: Code,
                },
                {
                  step: '03',
                  title: 'Monitor & protect',
                  desc: 'Track authentication events, detect threats, and control access in real time.',
                  icon: Activity,
                },
              ].map(({ step, title, desc, icon: Icon }) => (
                <div key={step} className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card">
                    <Icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="text-xs font-semibold text-blue-500">{step}</div>
                  <h3 className="mt-1.5 text-base font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Authentication Features ── */}
        <section className="border-b border-border py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Authentication, Done Right
              </h2>
              <p className="mt-3 text-muted">
                Everything you need to secure user access out of the box.
              </p>
            </div>
            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Key,
                  title: 'Email Verification',
                  desc: 'Cryptographically signed tokens ensure only legitimate users can verify their accounts.',
                  features: ['Tamper-proof tokens', '1-hour expiry window', 'Auto-cleanup on use'],
                },
                {
                  icon: Fingerprint,
                  title: 'Password Security',
                  desc: 'Credentials are hashed with bcrypt and validated against real-time strength rules.',
                  features: ['Bcrypt + salt', 'Strength scoring', 'Min-length enforcement'],
                },
                {
                  icon: Users,
                  title: 'Session Management',
                  desc: 'JWT-based sessions with configurable expiry and device-aware tracking.',
                  features: ['JWT tokens', 'Configurable TTL', 'Device fingerprinting'],
                },
                {
                  icon: Lock,
                  title: 'Password Recovery',
                  desc: 'Secure reset flows with one-time tokens that expire after use or by time.',
                  features: ['One-time tokens', 'Email verification', 'Auto-expiry'],
                },
              ].map(({ icon: Icon, title, desc, features }) => (
                <div
                  key={title}
                  className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-neutral-700"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <Icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
                  <ul className="mt-4 space-y-1.5">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted">
                        <CheckCircle className="h-3 w-3 text-blue-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Security & Trust ── */}
        <section className="border-b border-border py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Built for Production from Day One
              </h2>
              <p className="mt-3 text-muted">
                Authentication infrastructure that doesn&apos;t cut corners.
              </p>
            </div>
            <div className="mt-16 grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: Shield,
                  title: 'bcrypt Password Hashing',
                  desc: 'Credentials are salted and hashed with bcrypt before they ever touch the database. Plain text never stored.',
                },
                {
                  icon: Key,
                  title: 'JWT Session Tokens',
                  desc: 'Stateless sessions signed with a secret key. Configurable expiry keeps access tokens fresh and revocable.',
                },
                {
                  icon: Activity,
                  title: 'Rate Limited Auth Endpoints',
                  desc: 'Upstash Redis throttles repeated requests from a single source. Brute force and credential stuffing are blocked automatically.',
                },
                {
                  icon: Lock,
                  title: 'Signed Email Verification',
                  desc: 'Cryptographically signed tokens power email verification and password resets. Tokens expire after one hour or on first use.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                    <Icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Integration / Stack ── */}
        <section className="border-b border-border py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Built on Modern Stack
              </h2>
              <p className="mt-3 text-muted">
                Powered by reliable, battle-tested infrastructure.
              </p>
            </div>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
              {[
                'Next.js', 'React 19', 'TypeScript', 'Prisma', 'PostgreSQL',
                'Neon', 'Upstash Redis', 'Resend', 'Tailwind CSS',
              ].map((name) => (
                <div
                  key={name}
                  className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted transition-colors hover:border-neutral-600"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card">
                <Shield className="h-7 w-7 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Ready to Secure Your Application?
              </h2>
              <p className="mt-4 text-muted">
                Get started free. No credit card required. Full-featured trial.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-blue-600 shadow-sm"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-muted transition-colors hover:border-neutral-600 hover:text-foreground"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
