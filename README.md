# Property portal

A public portal of homes for sale and for rent around the world. Visitors browse without an account, and anyone can
sign up. Members keep favorites, private notes and saved searches that email new homes at once or once a day. It has
photo carousels with resized images and placeholders, and a map with approximate positions. Each listing is priced in
the currency its agency asks in, and can be offered both ways, as a Dutch home for sale is often let in the meantime
(leegstandswet).

The seed holds 107 places in 37 countries, with their agencies and listings, from a small set up to 100,000 listings
and 433,000 photos. Every place, street, agency and person is written as its country writes them: Latin with
diacritics, Greek, Cyrillic, Arabic and Hebrew from right to left, Japanese, Korean and Chinese, Devanagari, Kannada and
Thai, with emoji here and there, in postal codes, phone numbers and currencies of each country, and none in a country
that has no postal codes. The names are made up, not of real people, and the phone numbers are random or in the ranges
kept for fiction where a country has one. It is there to look like a real portal and to find what breaks on data from
anywhere: encoding, sorting and searching, right-to-left text, large amounts, and checks too strict for a country.

**[Open the live demo](https://property-portal.protobase.net)**, which resets every day. For the back office of one
letting agency, see [property-management](https://github.com/protobase-community/property-management).

## Run it locally

You need [Bun](https://bun.sh) 1.4 and Docker.

```sh
bun install
bun run protobase skill install   # gives Claude Code, Codex and other agents the docs of this Protobase version
bun run db:up                     # Postgres 18 in Docker on port 55435; creates .env from .env.example
bun run db:migrate
bun run db:doctor                 # checks the config against the database, as a deploy to Protobase Cloud does
bun run db:seed --scale small     # small | medium | large
bun run dev                       # http://localhost:5173
bun run test
```

Set your own `PROTOBASE_SECRET` in `.env` (`openssl rand -base64 32`), and sign in with one of the
[seeded accounts](#accounts). `bun run db:down` stops the database.

## Use it as a template

Press **Use this template** at the top of this page, then **Create a new repository**, to get your own copy with a
clean history. Clone it and run it as above:

```sh
git clone https://github.com/<you>/<your-repository>.git
cd <your-repository>
```

You can also fork it to contribute back, or start from it with `git clone https://github.com/protobase-community/property-portal.git`.

## Put it online

[Protobase Cloud](https://console.protobase.net/start) runs your copy from its GitHub repository: in the console,
choose **New app**, then **An existing GitHub repository**, and pick it. Every push to the default branch deploys:
the build runs `protobase build`, then `db:migrate` and `protobase doctor` against the app's database, and the
previous version keeps serving when a step fails. It does not run the typecheck or the tests, so run them before
pushing.

## Customise it

- **Tables and screens.** Each table's data config is in `config/<name>/data.ts` (fields, validation, who may read
  and change what) and its screens in `config/<name>/ui.ts` (lists, filters, record pages), all exported from
  `config/index.ts`. See the [data config](https://docs.protobase.net/reference/data-config/) and [UI config](https://docs.protobase.net/reference/ui-config/)
  references.
- **Database changes.** Add a migration in `db/migrations/`, numbered after the last one, and run
  `bun run db:migrate`. Never edit a migration that has run. For a new table, `bun run protobase scaffold
  <connection string> --ui` reads the database and writes its `data.ts` and `ui.ts`, which you then adjust.
- **Sign-in and accounts** are the `auth` key of `protobase.config.ts`, on Better Auth ([Login](https://docs.protobase.net/reference/auth/)).
- **Coding agents.** [AGENTS.md](AGENTS.md) holds the rules an assistant follows when it changes the app.
- Check every change with `bun run typecheck`, `bun run test`, `bun run build` and, with the migrations applied,
  `bun run db:doctor`, as CI does.

- **Who sees what.** Members' rows are theirs through `.owner(...)` and `.own` capabilities; the roles are in
  `config/roles.ts` ([Access](https://docs.protobase.net/reference/access/)).
- **Alerts and mail.** The alert jobs are in `jobs/` ([Jobs](https://docs.protobase.net/reference/jobs/)) and the mails, React Email
  templates, in `emails/`. Mail goes through `PROTOBASE_SMTP_URL` and `PROTOBASE_MAIL_FROM` in `.env`.
- **Map and photos.** The map style is `PROTOBASE_MAP_STYLE_URL`, the aerial photo layers `config/map-layers.ts`, and
  the photo sizes `config/photo-variants.ts`.

## Built with Protobase

[Protobase](https://github.com/PrototeamHQ/protobase) builds the app from a Postgres database and a typed config: each table's data config sits in
`config/<name>/data.ts` and its screens in `config/<name>/ui.ts`, all exported from `config/index.ts`, and
`protobase dev` and `protobase serve` serve the API and the app from them.

- Tested with Protobase **0.66.6**: the `@protobase/*` packages are in `devDependencies` at its caret range, so the app is
  a bundled project: `protobase dev`, `protobase build` and the scripts, through `protobase run`, use the CLI's own
  copies, and any CLI in that range runs it ([Versioning](https://docs.protobase.net/reference/versioning/)). CI runs
  against it, and a GitHub Action moves the range to each new release once CI passes on it. To upgrade by hand, set
  the new range on each `@protobase/*` package, run `bun install`, then `bun run typecheck`, `bun run test` and
  `bun run build`. The [release notes](https://github.com/PrototeamHQ/protobase/releases) say what changed.
- Docs: [docs.protobase.net](https://docs.protobase.net). Source and issues: [PrototeamHQ/protobase](https://github.com/PrototeamHQ/protobase).
- This app started as an example in Protobase's repository; its history came with it.

## Accounts

Sign in with one of the seeded accounts, all with the password `property-portal-demo`:

| Account | |
| --- | --- |
| `anna@portal.example` | a member buying around Amsterdam, mailed at once, and buying or renting in Lisboa ("Casa em Lisboa ☀️"), in the daily digest |
| `bram@portal.example` | a member renting in Tokyo ("東京の賃貸 🗼"), in the daily digest, and near Sydney, without email |
| `admin@portal.example` | runs the catalogue: places, agencies and listings, drafts included |

Anyone can also make their own account: **Create an account** on the sign-in page, or on a sign-in prompt, emails a code to the address; once the code is right, a name and a password make a member ([Open sign-up](https://docs.protobase.net/reference/auth/#open-sign-up), turned on in `protobase.config.ts`). It needs mail, `PROTOBASE_SMTP_URL` and `PROTOBASE_MAIL_FROM` in `.env`, with a mail catcher such as Mailpit in development; without them it is not offered.

Other scripts: `db:reset` (drop, migrate, seed small), `typecheck`, `serve` (`protobase build`, then `protobase serve dist` on port 8787). More accounts: `bun run protobase users create you@example.com --generate-password` makes a member; `--role admin` an admin. The database tests run in [Protobase's repository](https://github.com/PrototeamHQ/protobase) (`bun run test:integration`).

The same data is a REST API with an OpenAPI document: [API.md](API.md) walks through signing in, listing published listings and creating and publishing one with `curl`.

Connection string, which scripts read from `DATABASE_URL` (port 55435 avoids a local Postgres on 5432 and the other Protobase templates, which take 55432, 55433 and 55434, so they run side by side):

```
postgres://protobase:protobase@localhost:55435/property_portal
```

## Who sees what

Everything is decided by the roles in `config/roles.ts`, passed to the server; no resource has rules of its own.

| Role | Reads | Writes |
| --- | --- | --- |
| `anonymous` (no token) | published listings without the agent's name and phone, their photos, agencies, places: each through a [field list](https://docs.protobase.net/reference/access/#capabilities) | nothing |
| `member` (every account made by signing up) | published listings with the agent, photos, agencies, places; their own saved searches, alerts, favorites and notes | their own searches, favorites and notes; removing their alerts |
| `admin` | the catalogue, drafts too; their own member data like anyone else | the catalogue |

A member's rows are theirs through `.owner((r) => r.user_id)` and `.own` capabilities: every list, read, change and delete is limited to rows whose `user_id` is the signed-in user, and a new note, favorite or search is created as theirs whatever the request says. Admins hold the same `.own` capabilities, so they do not read members' notes either. Alerts carry the search's owner, and a foreign key on `(saved_search_id, user_id)` keeps the two the same.

Visitors get the admin app too: it opens on the home page and the listings, read-only, with a **Sign in** button in the sidebar ([Browsing the admin app](https://docs.protobase.net/reference/access/#browsing-the-admin-app)). Signing in adds the member's own pages: favorites, searches, alerts and notes. Favorites and Searches show a visitor what signing in gives, in the sidebar and the phone's bottom bar, with **Create an account** beside **Sign in**. An account made that way is always a member, whatever the request asks for; admins are made on the host.

## Screens

- **Find a home** (`config/home/page.tsx`): rows of `RecordRow` cards, each with its filters and how many listings it finds: for sale, for rent and the newest; for a member also each of their searches, with the listings new to them marked, and their favorites.
- **Listings**: cards with the cover photo and arrows through the listing's other photos, address, status, the purchase price or else the rent per month in bold, its currency, area, bedrooms and energy label, and the place and agent at the bottom, a map of them (`d.map`) that counts them per part of the map from far out and shows the listings in view closer in, a listing's card when its marker is chosen, or a table; filters for sale or rent (a home offered both ways shows under each), place, type, currency, purchase price, rent, area, bedrooms, energy label, status, garden, balcony and parking. A listing's page reads as on a portal (`.recordMode('read')`): its photos in a gallery (`l.gallery`) whose lightbox shows each photo's caption behind its info button, the key facts as a row under their icons (`presentation: 'facts'`), the description and a table of its features, a map (`l.map`) and, for a member, their notes on it; help lines meant for editing show only on the admins' form (`.helpWhen('editing')`), whose page adds the map position, publishing and the photo list, with **Save to favorites**, **Remove from favorites** (`protobase.ui.tsx`) and **Add a note**, which opens the note form with the listing chosen.
- **Save search** on the listings (`config/listings/ui.ts`, `.saveSearch`): with filters or a search set, asks for an optional name and saves them as one of the member's searches; pressed again, it takes the search off. Opened from a search's **View all results** with its filters since changed, it offers **Update** with what the change adds and drops, or **Save as new search**. A visitor is asked to sign in.
- **Searches** (`config/saved_searches/ui.ts`, `.searchesOf`): each saved search with its name, if it has one, and its filters, rename, a choice of **At once**, **Daily digest** or **No email**, delete, and a row of the listings' cards published since the member last looked, with **View all results**, which opens the listings with the search's filters. The listings published after a search's `seen_at` are new to the member; opening its results moves `seen_at` to now, and a new search starts at the moment it is saved.
- **Favorites**, **Alerts** and **Notes**: the member's own lists. An alert is a listing a search found, with when it was mailed, and links to its listing.

## Alerts

1. Publishing a listing, inserting it with a `published_at` or giving a draft one, enqueues the `match-listing` job in the same transaction (`db/migrations/005_listing_published.sql`).
2. The job (`jobs/match-listing.ts`) reads the listing and, while it is on offer (available or under offer, `jobs/offered.ts`), every saved search, keeps those whose filter holds for it (`jobs/match.ts`: the filter as the listings page reads it, with `evaluateFilter`, the search text in the address and postal code too) and records an alert for each, once, whatever the search's email. An alert is due for mail only when its search sent email as the listing fit it (`mail_due`, `db/migrations/013_alert_mail.sql`): turning a search's email on later mails nothing it found before.
3. For a search mailed at once it enqueues `email-alerts`, which mails the member the alerts due that have not gone out, of homes still on offer, and marks them mailed. `daily-alerts` runs at 07:00 in Amsterdam and does the same for searches in the daily digest, in one digest per member. A search switched from the daily digest to at once mails its waiting alerts at once. A search without email is never mailed.

The mails are React Email templates (`emails/`) in the look of Protobase's own mail (`@protobase/server/email`): `instant-alert.tsx` and `daily-digest.tsx`, each listing every home once with its price in its own currency (`€650,000`, `¥185,000`, `AED 1,450,000`), size, a link, and every search of the member it fits, linked to that search, and a link to Searches. They go through the app's SMTP server, `PROTOBASE_SMTP_URL` and `PROTOBASE_MAIL_FROM` in `.env` ([Email](https://docs.protobase.net/reference/email/)); a mail catcher such as Mailpit shows them in development. Without them alerts are still recorded and shown in the app, and stay unmailed. Jobs run inside `protobase dev` and `protobase serve`.

A saved search's filter is checked against the listings when it is written (`config/saved_searches/rules.ts`). `db/migrations/008_saved_searches.sql` replaced the earlier search profiles, and their alerts, with saved searches: the alerts start again from the next listing published.

## Tables

| Schema | Tables |
| --- | --- |
| `market` | `places` (country as its ISO 3166-1 code, centre as `latitude`, `longitude`), `agencies`, `listings` (prices in the ISO 4217 `currency`), `listing_photos` |
| `members` | `saved_searches` (the listings' filter, unique per member, how often it mails and when it was last looked at), `alerts` (unique per search and listing), `favorites` (unique per member and listing), `notes` |
| `auth`, `jobs` | Better Auth's accounts and the job queue, written by `protobase migration` |

Postgres keeps these rules itself:

- A listing has a `purchase_price`, a `rent_price` (per month) or both, in its `currency`, with room for the billions of a flat in đồng. `for_sale` and `for_rent` are generated from them, and `price_per_m2` from the purchase price and living area, so they filter and sort like any column. A price range filter compares the amounts as they are, so filter on a currency or a place with it.
- A place's country is any ISO 3166-1 alpha-2 code and a listing's currency any ISO 4217 code. The postal code may be empty, for a country without them, and a home may be built from the year 1000.
- A listing is `sold` only with a purchase price and `let` only with a rent, and has fewer bedrooms than rooms. Energy labels are an enum ordered best first, from A++++ to G.
- `published_at` is empty for a draft; only admins read drafts.

## Map

The listing page draws the listing's `latitude` and `longitude` on a map, and the listings' **Map** display the listings in its view on one, a listing whose `position_exact` is off with a hollow marker that says its position is approximate ([Approximate positions](https://docs.protobase.net/reference/ui-config/#approximate-positions)), both with the style `PROTOBASE_MAP_STYLE_URL` names ([Maps](https://docs.protobase.net/reference/ui-config/#maps)); without it there is no map. In development that is [OpenFreeMap](https://openfreemap.org)'s `https://tiles.openfreemap.org/styles/liberty`: the whole world from OpenStreetMap, free, without a key and with CORS for any origin, so the listings of every country show on a map; it needs the network. `bun run map:tiles` (`map/tiles.ts`) serves another, at `http://localhost:8790/style.json`: a proxy to a bucket of OpenMapTiles in one PMTiles archive, with its sprites and fonts, that covers only the Benelux and the British Isles. The bucket answers only its own sites' origins, so the proxy adds CORS headers for any origin and points the bucket's style at itself; it only reads the bucket. A deployed portal points `PROTOBASE_MAP_STYLE_URL` at a style and archive of its own, served with CORS for its origins.

Both maps have a switch to aerial photos ([Map layers](https://docs.protobase.net/reference/ui-config/#map-layers)), set in `config/map-layers.ts` and passed as `maps.layers` in `protobase.config.ts`. Both sources are open data under CC BY 4.0, free and without a key, and answer any origin with CORS; each covers its own country, and elsewhere the default map shows through.

- **Aerial (NL)**: the Netherlands' latest 8 cm aerial photo from [PDOK Luchtfoto](https://www.pdok.nl/-/open-data-hr-luchtfoto) (`Actueel_orthoHR`), at `https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_orthoHR/EPSG:3857/{z}/{x}/{y}.jpeg`. Its [metadata](https://www.nationaalgeoregister.nl/geonetwork/srv/api/records/a301ddc7-c26f-42d8-b367-509ae5ae47d0) gives CC BY 4.0 with the organisation named, credited as Beeldmateriaal Nederland via PDOK.
- **Aerial (ES)**: Spain's latest [PNOA](https://pnoa.ign.es/) orthophotos from the IGN, Sentinel-2 when zoomed out, at the WMTS `https://www.ign.es/wmts/pnoa-ma`, layer `OI.OrthoimageCoverage`, tile matrix set `GoogleMapsCompatible`. The IGN's [licence](https://www.ign.es/resources/licencia/Condiciones_licenciaUso_IGN.pdf) is CC BY 4.0, and a service used as it is takes the credit its capabilities name: `CC BY 4.0 scne.es`, linked to [scne.es](https://www.scne.es/).

## Photos

Listings and their photos point at PNG files in the public file provider, such as `public:listings/house-3.png`. The seed draws them (`seed/photos/`, a few dozen houses, flats and rooms) into the public provider with [`storeFile`](https://docs.protobase.net/reference/files/#writing-files-from-a-seed), as the server finds it: `data/files/public` by default, where `protobase dev` and `serve` look, or what `PROTOBASE_FILES_PUBLIC` names, a folder or a bucket. Drawing them needs no network. An admin can upload real photos on a listing's page.

Both photo fields store a `card` (800×600) and a `thumb` (96×96) WebP beside each image (`config/photo-variants.ts`) and its ThumbHash in `photo_placeholder` ([Image variants and placeholders](https://docs.protobase.net/reference/files/#image-variants-and-placeholders)): the cards show the `card` copy, tables the `thumb`, and each the blurred placeholder until the photo has loaded. The seed makes them for its own photos as an upload would. sharp makes them, passed in `protobase.config.ts`; `serve` builds a bundle that carries it for linux, so run `bun install --os='*' --cpu='*'` first to install its linux binaries, and serve the bundle on linux ([Native packages](https://docs.protobase.net/reference/cli/#native-packages)).

## Scales

| Scale | Listings | Photos | Members | Searches | Alerts | Seed time (Apple silicon, local Docker) |
| --- | --- | --- | --- | --- | --- | --- |
| small | 1,200 | 5,172 | 40 | 80 | 266 | about 4 s |
| medium | 20,000 | 86,548 | 2,000 | 4,014 | 178,835 | about 9 s (107 MB) |
| large | 100,000 | 432,789 | 10,000 | 19,908 | 4,288,936 | about 170 s (1.3 GB) |

`db:seed` truncates the `market` and `members` tables and removes the accounts an earlier seed made (ids starting with `seed-`); accounts made with `protobase users create` stay. Like the other examples', the loader streams `COPY`, drops secondary indexes during the load and rebuilds them afterwards, and records the scale in `public.seed_info`. The publish trigger is off during the load: the seed writes the alerts of the last 30 days itself, with the same matching rule as the job. Each member's searches are printed as the listings page prints its filters (`seed/builders/search-filter.ts`), and the demo searches were last looked at two to four weeks before 2026-10-12, so their rows on Searches hold listings.

## Layout

- `protobase.config.ts`: the app as one object: who has an account and what a new one is (`auth`), the jobs, the image library and the maps' layers.
- `db/migrations/NNN_name.sql`: plain SQL, applied in order by `db/migrate.ts` and recorded in `public.schema_migrations`. The server never migrates.
- `config/`: one folder per table (`data.ts`, `ui.ts`), the roles, the home page and the maps' aerial photo layers (`map-layers.ts`); `config/saved_searches/filter.ts` reads a search's filter against the listings. `config/roles.test.ts` checks who sees and writes what, `config/config.test.ts` runs the server's startup checks.
- `jobs/`: the alert jobs, with the matching rule tested next to them.
- `emails/`: the alert mails as React Email templates, tested next to them.
- `map/`: the development map tiles proxy, tested next to it.
- `seed/`: `world.ts` builds everything from the scale, `builders/` one place, agency, listing or member from its ordinal, `steps/` write them, `photos/` draws the pictures. `data/places.ts` holds the places with their streets, and `data/countries/` how each country writes addresses, postal codes, phone numbers and names, its currency and its prices.
- `tests/examples/property-portal/` in [Protobase's repository](https://github.com/PrototeamHQ/protobase): `smoke.test.ts` checks counts and rules of the seed, `access.integration.test.ts` what two members and a visitor see and may do through the API, `alerts.integration.test.ts` a publish through to the alert and its mail, and a search switched to mail at once, `sign-up.integration.test.ts` an account made by signing up, a member that sees only its own data.

## Contributing

Contributions are welcome, from a typo to a new screen: see [CONTRIBUTING.md](CONTRIBUTING.md). A problem in Protobase
itself goes to [Protobase's issues](https://github.com/PrototeamHQ/protobase/issues).

## Licence

[Apache License 2.0](LICENSE).
