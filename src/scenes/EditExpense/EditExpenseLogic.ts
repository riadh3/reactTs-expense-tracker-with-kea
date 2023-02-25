import { doc, getDoc } from 'firebase/firestore'
import { actions, events, kea, listeners, path, reducers } from 'kea'
import { db } from '../../firebase'

import type { editExpenseLogicType } from './EditExpenseLogicType'

export interface Expense {
  amount: number
  claimer: string
  date: any
  description: string
  id: string
  isApproved: boolean
}

export const editExpenseLogic = kea<editExpenseLogicType>([
  path(['scenes\\EditExpense\\EditExpenseLogic']),
  actions({
    fetchData: (expenseId) => ({ expenseId }),
    setExpense: (expense) => ({ expense }),
    setRequestError: true,
  }),
  reducers({
    isLoading: [
      false,
      {
        fetchData: () => true,
        setExpense: () => false,
        setRequestError: () => false,
      },
    ],
    error: [
      false,
      {
        fetchData: () => false,
        setRequestError: () => true,
      },
    ],
    expenseData: [
      {},
      {
        setExpense: (_, { expense }) => expense,
        fetchData: () => ({}),
      },
    ],
  }),
  listeners(({ actions }) => ({
    fetchData: async ({ expenseId }, breakpoint) => {
      try {
        const expense = await getDoc(doc(db, 'titus_ltd', expenseId))
        if (expense.exists()) {
          actions.setExpense({ ...expense.data(), id: expense.id })
        }
      } catch (error) {
        actions.setRequestError()
        return
      }
    },
  })),
  events(({ actions, props, values }) => ({
    afterUnmount() {
      actions.setExpense({})
    },
    afterMount: () => {
      actions.setExpense({})
      actions.fetchData(props.expenseId)
    },
  })),
])
