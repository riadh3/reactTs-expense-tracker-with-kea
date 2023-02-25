import { actions, kea, listeners, path } from 'kea'
import { router } from 'kea-router'

import type { homeLogicType } from './homeLogicType'

export const homeLogic = kea<homeLogicType>([
  path(['scenes\\Home\\homeLogic']),
  actions({
    createNewExpense: true,
  }),
  listeners(() => ({
    createNewExpense: () => {
      router.actions.push('/new-expense')
    },
  })),
])
