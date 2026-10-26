import { defineConfig } from '@protobase/config'
import { mapLayers } from './config/map-layers'

// The whole portal, as one object. Its code is found by its path: resources in config/, roles in config/roles.ts, each
// job's run in jobs/<name>.ts and the auth emails' templates in emails/. Its address and secret are Protobase's
// defaults, PROTOBASE_URL and PROTOBASE_SECRET (see .env.example).
export default defineConfig({
  auth: {
    // Anyone makes their own account from the sign-in page, as a member, once a code mailed to their address proves it is
    // theirs; admins are made on the host (`protobase users create --role admin`).
    roles: ['admin', 'member'],
    // `protobase users create` without `--role` makes a member too.
    defaultRole: 'member',
    signUp: { role: 'member' },
  },
  jobs: {
    // Enqueued by Postgres when a listing is published (db/migrations/005_listing_published.sql).
    'match-listing': {
      description: 'Records an alert for each saved search a newly published listing fits, and mails those of searches that mail at once.',
      arguments: { listingId: 'integer' },
    },
    'email-alerts': {
      description: 'Mails a member the alerts due for mail of their searches with this frequency, in one message, then marks them mailed.',
      arguments: { userId: { type: 'text', min: 1 }, frequency: { type: 'enum', values: ['instant', 'daily'] } },
      retryDelay: '1 minute',
    },
    'daily-alerts': {
      description: 'Every morning at 7 in Amsterdam: a digest for each member whose daily searches found listings due for mail.',
      schedule: '0 7 * * *',
      timezone: 'Europe/Amsterdam',
    },
  },
  // sharp makes the listing photos' variants and placeholders.
  files: { images: 'sharp' },
  // The maps draw PROTOBASE_MAP_STYLE_URL and switch to aerial photos.
  maps: { layers: mapLayers },
})
