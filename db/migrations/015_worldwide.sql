-- The portal lists homes in any country, priced in the listing's own currency.

-- Any country, by its ISO 3166-1 alpha-2 code, instead of the Netherlands and Spain alone.
alter table market.places drop constraint places_country_check;
alter table market.places add constraint places_country_check check (country ~ '^[A-Z]{2}$');

-- The currency of the listing's prices, an ISO 4217 code: the one the agency asks in, not always the country's own, as an
-- Argentine home is priced in US dollars. The listings before this one were all in euros.
alter table market.listings add column currency text not null default 'EUR' check (currency ~ '^[A-Z]{3}$');
alter table market.listings alter column currency drop default;
create index listings_currency_idx on market.listings (currency);

-- Room for prices in currencies of small units: a flat in Hanoi asks billions of đồng. The price per m² and the flags
-- are generated from the prices, so they go and come back around the change, with the indexes on them.
alter table market.listings drop column price_per_m2, drop column for_sale, drop column for_rent;
alter table market.listings
  alter column purchase_price type numeric(16, 2),
  alter column rent_price type numeric(16, 2);
alter table market.listings
  add column price_per_m2 numeric(16, 2) generated always as (round(purchase_price / living_area, 2)) stored,
  add column for_sale boolean generated always as (purchase_price is not null) stored,
  add column for_rent boolean generated always as (rent_price is not null) stored;
create index listings_price_per_m2_idx on market.listings (price_per_m2);
create index listings_for_sale_idx on market.listings (for_sale, status, published_at desc);
create index listings_for_rent_idx on market.listings (for_rent, status, published_at desc);

-- Many countries have no postal codes, such as the United Arab Emirates and Hong Kong.
alter table market.listings alter column postal_code drop not null;

-- Homes older than 1500 are still lived in, in Kraków and Kyoto alike.
alter table market.listings drop constraint listings_built_year_check;
alter table market.listings add constraint listings_built_year_check check (built_year between 1000 and 2100);
