import { kea } from 'kea'
import { appLogicType } from './appLogicType'

export const appLogic = kea<appLogicType>({
  path: ['appLogic'],
  actions: {
    goFaster: true,
  },
  reducers: {
    speed: [1, { goFaster: (state) => (state + 1) % 5 }],
  },
})
