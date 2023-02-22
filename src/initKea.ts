import { resetContext } from 'kea'
import { routerPlugin } from 'kea-router'
import { loadersPlugin } from 'kea-loaders'
import { formsPlugin } from 'kea-forms'
import { testUtilsPlugin } from 'kea-test-utils'
import { createMemoryHistory } from 'history'

const IS_TEST_MODE = process.env.NODE_ENV === 'test'

export function initKea() {
  const routerOptions: Record<string, any> = {}
  if (IS_TEST_MODE) {
    const history = createMemoryHistory()
    ;(history as any).pushState = history.push
    ;(history as any).replaceState = history.replace
    routerOptions.history = history
    routerOptions.location = history.location
  }

  resetContext({
    plugins: [routerPlugin(routerOptions), loadersPlugin, formsPlugin].concat(IS_TEST_MODE ? [testUtilsPlugin] : []),
  })
}
