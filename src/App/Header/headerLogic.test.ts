import { expectLogic } from 'kea-test-utils'
import { headerLogic } from './headerLogic'
import { initKea } from '../../initKea'

describe('appLogic', () => {
  beforeEach(() => {
    initKea()
    headerLogic.mount()
  })

  test('defaults to 1', () => {
    expectLogic(headerLogic).toMatchValues({ speed: 1 })
  })

  test('can go faster, resets at 4 units of pure speed', async () => {
    expectLogic(headerLogic, () => {
      headerLogic.actions.goFaster()
      headerLogic.actions.goFaster()
      headerLogic.actions.goFaster()
    }).toMatchValues({ speed: 4 })

    expectLogic(headerLogic, () => {
      headerLogic.actions.goFaster()
    }).toMatchValues({ speed: 0 })

    expectLogic(headerLogic, () => {
      headerLogic.actions.goFaster()
    }).toMatchValues({ speed: 1 })
  })
})
