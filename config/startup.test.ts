import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { mergeConfig, type Authenticator, type ProjectConfig } from '@protobase/server'

// Protobase's own check that each example starts (packages/cli/src/project/examples-admin.test.ts in
// github.com/PrototeamHQ/protobase), run here against the pinned release: the app's admin API built as `dev` and `serve`
// build it, with its own auth, so a startup check such as an owner field that must hold the user ids refuses here
// instead of on the app's first start. Building the API reaches no database. The CLI ships these modules without
// types, so they are imported by a plain string.
const cli = '@protobase/cli/dist/project/'

describe('the app', () => {
  beforeAll(() => {
    vi.stubEnv('BETTER_AUTH_SECRET', 'a-secret-only-this-test-uses-0123456789')
    vi.stubEnv('DATABASE_URL', 'postgres://nobody@127.0.0.1:1/none')
  })

  afterAll(() => {
    vi.unstubAllEnvs()
  })

  it('passes the startup checks with its own auth', async () => {
    const { importProjectFile } = await import(`${cli}import-project-file.js`)
    const { projectAdmin } = await import(`${cli}project-admin.js`)
    const file = path.join(import.meta.dirname, '..', 'protobase.config.ts')
    const project = mergeConfig(((await importProjectFile(file)).default ?? {}) as ProjectConfig)
    expect(project.auth, 'the app signs in with Better Auth').toBeDefined()
    expect(() => projectAdmin({ ...project, authenticate: project.authenticate as Authenticator }, project.config ?? {}, {} as never)).not.toThrow()
  }, 60_000)
})
