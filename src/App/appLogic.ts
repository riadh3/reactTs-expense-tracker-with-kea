import { actions, kea, reducers, selectors, path } from 'kea'
import { urlToAction } from 'kea-router'
import Home from '../scenes/Home/HomeScene'
import NewExpense from '../scenes/AddExpense/AddExpenseScene'
import EditExpense from '../scenes/EditExpense/EditExpenseScene'
import NotFound from '../scenes/NotFound'
import ExpensesList from '../scenes/ExpensesList/ExpensesListScene'

import type { scenesLogicType } from './appLogicType'

export enum Scene {
  Home = 'home',
  NewExpense = 'newExpense',
  EditExpense = 'editExpense',
  ExpensesList = 'expensesList',
  NotFound = 'notFound',
}

export const scenes = {
  [Scene.NotFound]: NotFound,
  [Scene.Home]: Home,
  [Scene.NewExpense]: NewExpense,
  [Scene.EditExpense]: EditExpense,
  [Scene.ExpensesList]: ExpensesList,
}

export const routes = {
  '/': 'home',
  '/new-expense': 'newExpense',
  '/edit-expense/:id': 'editExpense',
  '/expenses-list/:year/:month': 'expensesList',
}

export const scenesLogic = kea<scenesLogicType>([
  path(['app', 'logic']),
  actions({
    setScene: (scene, params) => ({ scene, params }),
  }),
  reducers({
    scene: [
      null,
      {
        setScene: (_, payload) => payload.scene,
      },
    ],
    params: [
      {},
      {
        setScene: (_, payload) => {
          return payload.params || {}
        },
      },
    ],
  }),
  selectors({
    Component: [
      (s) => [s.scene],
      (scene: Scene) => {
        return scenes[scene] ?? scenes.notFound
      },
    ],
  }),
  urlToAction(({ actions }) => {
    return Object.fromEntries(
      Object.entries(routes).map(([path, scene]) => {
        return [path, (params) => actions.setScene(scene, params)]
      })
    )
  }),
])
