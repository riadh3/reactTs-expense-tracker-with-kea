import { kea, actions, reducers, path } from 'kea'
import type { headerLogicType } from './headerLogicType'

export const headerLogic = kea<headerLogicType>([
  path(['App', 'headerLogic']),
  actions({
    goFaster: true,
  }),
  reducers({
    speed: [1, { goFaster: (state) => (state + 1) % 5 }],
  }),
])
