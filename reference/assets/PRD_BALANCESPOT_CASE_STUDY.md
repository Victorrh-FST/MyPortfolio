# BALANCESPOT GYM MANAGER
## Product Case Study Page — PRD & Google Stitch Design Brief

**Project:** BalanceSpot Gym Manager  
**Deliverable:** Responsive UX/UI portfolio case-study webpage  
**Portfolio owner role:** Product Designer & Bubble Developer  
**Development platform:** Bubble.io  
**Product model:** Multi-tenant B2B SaaS Web Application  
**Product status:** Functional Production MVP  
**Primary market:** Independent gyms, fitness studios, and wellness centres

---

# 1. PROJECT PURPOSE

Design a premium, visually compelling portfolio case-study page for BalanceSpot Gym Manager.

The page should communicate how I designed and engineered a multi-tenant B2B SaaS platform that enables independent gyms and fitness studios to manage memberships, subscriptions, front-desk check-ins, trainers, and daily operations in one cloud dashboard.

This is a portfolio case study that demonstrates my capabilities in:

- B2B SaaS product thinking and operational workflow design.
- Multi-tenant information architecture and role-based user flows.
- Clean, high-efficiency UI/UX design for front-desk and admin operations.
- Bubble.io full-stack application development.
- Multi-tenant database schema design and row-level privacy rules.
- Real-time QR code and registration-code attendance validation.
- Automated subscription lifecycle workflows and third-party API integrations (Paystack, transactional email, WhatsApp/SMS).

# 2. PRODUCT BACKGROUND

Independent gyms and fitness studios often rely on paper attendance registers, disconnected spreadsheets, and manual bank-transfer confirmations to track active members.

This creates three recurring operational breakdowns:
1. **Front-desk bottlenecks and revenue leakage:** Staff cannot quickly verify whether a walk-in member's subscription is active or expired.
2. **Manual renewal tracking:** Gym owners lose revenue when monthly, quarterly, or annual plans expire without automated status updates or member reminders.
3. **Lack of multi-branch / multi-role visibility:** Owners, front-desk staff, trainers, and members lack a single system tailored to their permissions.

BalanceSpot Gym Manager brings these operations into one unified multi-tenant cloud platform.

**Core product proposition:**
A multi-tenant gym management system that automates member onboarding, subscription billing, QR and registration-code check-ins, trainer coordination, and operational analytics.

# 3. PROJECT SNAPSHOT

- **Product:** BalanceSpot Gym Manager
- **Category:** B2B SaaS / Fitness Technology
- **Role:** Lead Product Designer & Bubble Engineer
- **Architecture:** Multi-Tenant Cloud Web Application
- **Technology:** Bubble.io
- **Integrations:** QR Code Generator & Scanner API, Paystack, SendGrid / Transactional Email, WhatsApp / SMS Alerts
- **Status:** Functional Production MVP (End-to-End Tested)

# 4. TARGET USERS & ROLES

1. **Gym Owners & Studio Admins:** Configure subscription plans, monitor revenue and active memberships, manage staff, and oversee branch activity.
2. **Front-Desk & Reception Staff:** Execute sub-second member check-ins via QR scan or unique registration code (`Reg. Code`) and verify active subscription eligibility.
3. **Trainers & Coaches:** View assigned members, track training schedules, and monitor attendance consistency.
4. **Gym Members:** Receive digital membership credentials (unique QR code and registration code), renew plans via Paystack, and receive automated expiry reminders.

# 5. PRODUCT MODULES (SIX CORE EXPERIENCES)

## 5.1 Dual-Mode Member Check-In Engine (QR + Reg. Code)
- Front-desk modal supporting both live/uploaded QR code scanning and manual case-sensitive Registration Code lookup (e.g., `543600Pul`, `1234567Bal`).
- Instant member verification card displaying member photo, full name, `Active` / `Expired` status badge, plan type (e.g., `Time-Based - Monthly`), and exact expiry date before logging attendance.

## 5.2 Membership & Subscription Management
- Flexible plan configuration (time-based monthly, quarterly, annual, or session-based tiers).
- Automated tracking of start dates, renewal cycles, and expiration timestamps.

## 5.3 Multi-Tenant Gym Onboarding & Role-Based Access
- Isolated tenant workspaces so each gym studio only accesses its own members, plans, attendance logs, and financial records.
- Role-based conditional views for Owners, Front-Desk Staff, Trainers, and Members.

## 5.4 Trainer & Staff Management
- Staff directory, role assignment, and trainer-to-member allocation for personal training and group classes.

## 5.5 Automated Billing, Payments & Notifications
- Paystack checkout and webhook verification for new memberships and renewals.
- Automated transactional emails and WhatsApp/SMS notifications for welcome credentials, payment receipts, and upcoming expiration reminders.

## 5.6 Operations & Revenue Analytics Dashboard
- Real-time visibility into active vs. expired subscriptions, daily check-in volume, upcoming renewals, and subscription revenue.

# 6. TECHNICAL ARCHITECTURE DEEP DIVE (TWO-PART SPOTLIGHT)

## Part 1: Multi-Tenant Database Schema & Privacy Rules
- Every core data type (`Member`, `SubscriptionPlan`, `MembershipRecord`, `CheckInLog`, `TrainerProfile`, `Transaction`) is scoped to a parent `GymTenant` (`gym_id`).
- Bubble Privacy Rules enforce server-side data isolation (`This Record's GymTenant is Current User's GymTenant`), preventing cross-tenant data leakage before data ever reaches the browser.

## Part 2: Real-Time Check-In & Subscription Expiry State Machine
- **Check-In Validation Flow:** Input (`QR Decode` or `Reg_Code` query) → Tenant-scoped `Member` lookup → Evaluate `Subscription.status == Active` and `ExpiryDate >= Current Date/Time` → Render `Member Found (Eligible to Check In)` state → Write immutable `CheckInLog` record.
- **Automated Expiry Lifecycle:** Scheduled Bubble Backend Workflows evaluate active subscriptions daily, automatically transitioning past-due memberships from `Active` to `Expired` and dispatching renewal links via email and WhatsApp.

# 7. DESIGN AND CONTENT RULES

- Frame the project honestly as a **Functional Production MVP** built and tested end-to-end on Bubble.io.
- Do not fabricate active gym counts, fake MRR figures, or fictional customer testimonials.
- Emphasise software engineering discipline, multi-tenant data privacy, and low-friction front-desk UX.

