# Working on this app

A Protobase app: each resource's data config in `config/<name>/data.ts` and its screens in `config/<name>/ui.ts`, all
exported from `config/index.ts`, over a Postgres database. Reference: https://docs.protobase.net, and the docs of this
Protobase version as agent skills after `bun run protobase skill install`.

## Database changes

- Every schema change is a new migration file in `db/migrations/`, numbered after the last one (`016_viewings.sql`).
  Never edit or remove a migration that exists: it has already run on the live database.
- Migrations run in one transaction on a deploy, so no `create index concurrently` or other statement Postgres refuses
  in one.
- Expand only, where possible: add tables, columns and indexes, and keep what the running app still reads. Rename or
  drop only when asked to, once nothing uses it.
- A member's own table gets a `user_id` and `.owner((r) => r.user_id)` with `.own` capabilities in `config/roles.ts`,
  like saved searches, favorites and notes: each member sees only their own rows.
- Listings come from anywhere: keep text in any script, a postal code optional, and prices in the listing's
  `currency`. Do not add checks that only fit one country's names, addresses, postal codes or phone numbers.

## Never touch

- `auth/` and the `auth` schema: sign-in and accounts.
- `.github/workflows/`.

## Scripts

The platform runs `db:migrate` (the auth schema's migrations included), `typecheck`, `test` and `protobase doctor`, with
their settings in the environment: keep them working. Run `typecheck` and `test` before you finish, and after a
migration `db:migrate` and `db:doctor`, which fails on a list, filter or sort that no index serves. `db:seed` loads the
sample data, replacing everything in the `market` and `members` schemas and the accounts an earlier seed made.
