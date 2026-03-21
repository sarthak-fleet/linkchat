# Custom Domains Plan

## Goal

Let a published LinkChat profile resolve from a user's own domain while keeping the app hosted on Vercel.

Examples:

- `linkchat.com/sarthak`
- `links.sarthak.dev`
- `about.sarthak.com`

The profile identity should remain the internal `pageId`. Slugs and custom domains should both map to the same page.

## Recommended Direction

Use Vercel for domain management and SSL, not Cloudflare for SaaS.

Why:

- The app already runs on Vercel
- Vercel handles domain attachment, verification, and SSL issuance
- This avoids introducing a second routing platform before the feature proves its value

## Scope

### Phase 1: MVP

- Add one or more custom domains to a page
- Support both apex and subdomain onboarding where Vercel allows it
- Show DNS instructions and verification status in the dashboard
- Resolve public profiles by `Host` header
- Keep slug routing working in parallel

### Phase 2: Hardening

- Canonical domain selection and redirects
- Better retry / error handling for failed DNS verification
- Domain removal flow
- Request-level tests for host-based routing

## Data Model

Add a new `pageDomains` table:

- `id`
- `pageId`
- `hostname`
- `status`
- `verificationType`
- `verificationValue`
- `redirectToPrimary`
- `isPrimary`
- `createdAt`
- `updatedAt`

Suggested statuses:

- `pending`
- `verifying`
- `verified`
- `invalid`
- `error`

Suggested constraints:

- unique `hostname`
- one primary domain per page

## Backend Work

### 1. Domain service wrapper

Create a small Vercel integration layer, for example in `src/lib/vercel-domains.ts`.

Responsibilities:

- add a domain to the Vercel project
- fetch verification / DNS requirements
- poll current status
- remove a domain

### 2. Page domain APIs

Add route handlers under something like:

- `POST /api/pages/[pageId]/domains`
- `GET /api/pages/[pageId]/domains`
- `POST /api/pages/[pageId]/domains/[domainId]/verify`
- `DELETE /api/pages/[pageId]/domains/[domainId]`

Requirements:

- authenticated owner only
- hostname normalization before storage
- duplicate / conflict handling
- clear error messages for verification failures

### 3. Host-based resolution

Update public rendering so the app can:

- render landing page for the LinkChat app domain
- render a profile for known custom domains
- keep slug-based `/{slug}` pages working
- return `404` for unknown custom domains

This can start inside the public page lookup path rather than a full rewrite system.

## Frontend Work

Add a dashboard area for domains, either:

- a new `/dashboard/domains` route, or
- a domain section inside appearance/settings

UI needs:

- add domain input
- status badges
- exact DNS instructions
- retry verification
- set primary domain
- remove domain

Helpful UX:

- prefer suggesting subdomains first
- explain apex vs subdomain briefly
- show a "verification may take a few minutes" state

## Routing Rules

Public request handling should follow this order:

1. If `Host` is the app domain, serve LinkChat normally
2. If path is `/{slug}`, resolve by slug
3. If `Host` matches a verified custom domain, resolve that page and render it at `/`
4. If `Host` is unknown, return `404`

## Testing Plan

### Unit tests

- hostname normalization
- app-domain vs custom-domain detection
- domain status mapping from Vercel responses

### API tests

- add domain
- verify domain
- remove domain
- duplicate hostname handling

Mock Vercel API responses for these.

### Request-level tests

- app domain -> landing page
- slug route -> public profile
- verified custom domain -> public profile
- unknown host -> `404`
- dashboard routes still use auth guard

### Manual smoke test

Use one spare real domain in production and verify:

- DNS instructions are correct
- verification succeeds
- SSL provisions
- profile renders on the custom domain

## Risks

- DNS propagation delays create support friction
- apex domains are more confusing than subdomains
- host-based routing can break landing-page behavior if not tested well
- Vercel ownership verification edge cases need good UI messaging

## Recommended Delivery Order

1. Add `pageDomains` schema and DB wiring
2. Build Vercel domain service wrapper
3. Add dashboard CRUD + verification UI
4. Add host-based public resolution
5. Add request-level tests
6. Run one production smoke test with a real domain
