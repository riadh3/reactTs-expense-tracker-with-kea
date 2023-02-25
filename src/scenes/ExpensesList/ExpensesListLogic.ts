import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { actions, events, kea, listeners, path, reducers } from 'kea'

import type { expensesListLogicType } from './ExpensesListLogicType'
import { db } from '../../firebase'
import { router } from 'kea-router'
export const expensesListLogic = kea<expensesListLogicType>([
  path(['scenes\\ExpensesList\\ExpensesListLogic']),
  actions({
    setOpenConfirmDeleteDialog: (id: string) => ({ id }),
    setCloseConfirmDeleteDialog: true,
    fetchData: (year, month) => ({ year, month }),
    setExpenses: (expenses) => ({ expenses }),
    setRequestError: true,
    deleteExpence: (id: string) => ({ id }),
    editExpense: (id: string) => ({ id }),
    confirmDeleteExpense: true,
  }),
  reducers({
    currentExpenseId: [
      '',
      {
        setOpenConfirmDeleteDialog: (_, { id }) => id,
        setCloseConfirmDeleteDialog: () => '',
      },
    ],
    openConfirmDeleteDialog: [
      false,
      {
        setOpenConfirmDeleteDialog: () => true,
        setCloseConfirmDeleteDialog: () => false,
      },
    ],
    expensesList: [
      [],
      {
        setExpenses: (_, { expenses }) => expenses,
      },
    ],
    isLoading: [
      false,
      {
        fetchData: () => true,
        setExpenses: () => false,
        setRequestError: () => false,
        confirmDeleteExpense: () => true,
      },
    ],
    error: [
      false,
      {
        fetchData: () => false,
        setRequestError: () => true,
      },
    ],
  }),
  listeners(({ actions, values }) => ({
    fetchData: async ({ year, month }, breakpoint) => {
      try {
        const collectionRef = collection(db, 'titus_ltd')
        const q =
          +month === 12
            ? query(
                collectionRef,
                where(
                  'date',
                  '>=',
                  Timestamp.fromDate(new Date(`${year}-${month}`))
                ),

                orderBy('date')
              )
            : query(
                collectionRef,
                where(
                  'date',
                  '>=',
                  Timestamp.fromDate(new Date(`${year}-${month}`))
                ),
                where(
                  'date',
                  '<',
                  Timestamp.fromDate(new Date(`${year}-${+month + 1}`))
                ),
                orderBy('date')
              )

        onSnapshot(q, (snapshot) => {
          let expenses: any[] = []
          snapshot.docs.forEach((doc) => {
            expenses.push({ ...doc.data(), id: doc.id })
          })
          actions.setExpenses(expenses)
        })
      } catch (error) {
        actions.setRequestError()
        return
      }
    },
    editExpense: ({ id }) => {
      router.actions.push(`/edit-expense/${id}`)
    },
    confirmDeleteExpense: async () => {
      try {
        await deleteDoc(doc(db, 'titus_ltd', values.currentExpenseId))
      } catch (error) {
        actions.setRequestError()
        return
      }
      actions.setCloseConfirmDeleteDialog()
    },
  })),
  events(({ actions, props }) => ({
    afterMount: () => {
      actions.fetchData(props.year, props.month)
    },
    beforeUnmount() {
      actions.setExpenses([])
    },
    propsChanged(props, oldProps) {
      actions.fetchData(props.year, props.month)
    },
  })),
])
