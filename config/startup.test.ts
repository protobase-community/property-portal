import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { loadProjectAuth } from '@protobase/cli/auth'
import { configExports, createAdmin } from '@protobase/server'
import config from '../protobase.config'
import * as portal from './index'
import { roles } from './roles'

// Protobase's own check that each example starts (packages/cli/src/project/examples-admin.test.ts in
// github.com/PrototeamHQ/protobase), run here against the pinned release: the app's admin API built from its config
// with its own auth, as `dev` and `serve` build it, so a startup check such as an owner field that must hold the user ids
// refuses here instead of on the app's first start. Building the API reaches no database.

const root = fileURLToPath(new URL('..', import.meta.url))

describe('the app', () => {
  beforeAll(() => {
    vi.stubEnv('PROTOBASE_SECRET', 'a-secret-only-this-test-uses-0123456789')
    vi.stubEnv('PROTOBASE_URL', 'http://localhost:5173')
    vi.stubEnv('DATABASE_URL', 'postgres://nobody@127.0.0.1:1/none')
  })

  afterAll(() => {
    vi.unstubAllEnvs()
  })

  it('passes the startup checks with its own auth', async () => {
    expect(config.auth, 'the app signs in with Better Auth').toBeDefined()
    const auth = await loadProjectAuth(root)
    const { resources, views, pages, userMenu, bottomBars, subscriptions } = configExports(portal)
    expect(() =>
      createAdmin({
        resources,
        views,
        pages,
        ...(userMenu && { userMenu }),
        bottomBars,
        subscriptions,
        db: {} as never,
        authenticate: () => {
          throw new Error('No requests in this test')
        },
        auth,
        files: { sharp },
        options: { roles, ...(config.maps !== undefined && { maps: config.maps }) },
      }),
    ).not.toThrow()
  }, 60_000)
})
