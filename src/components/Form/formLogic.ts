import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { actions, events, kea, listeners, path, reducers } from 'kea'
import { forms } from 'kea-forms'
import { db } from '../../firebase'
import { validaMaxLength, validaMinLength } from '../../utils/validations'

import type { expenseFormLogicType } from './formLogicType'

export interface ExpenseFormType {
  claimer: string
  date: any
  description: string
  amount: string | number
  isApproved: boolean
}

const defaultFormVals: ExpenseFormType = {
  claimer: '',
  date: new Date(),
  description: '',
  amount: '',
  isApproved: false,
}

export const expenseFormLogic = kea<expenseFormLogicType>([
  path(['components\\Form\\formLogic']),
  actions({
    setOpenCancelDialog: true,
    setCloseCancelDialog: true,
    cancelEditForm: true,
    confirmCancelForm: true,
    setOpenInfo: true,
    setCloseInfo: true,
    setRequestError: true,
  }),
  reducers({
    openCancelDialog: [
      false,
      {
        setOpenCancelDialog: () => true,
        setCloseCancelDialog: () => false,
      },
    ],
    info: [
      false,
      {
        setOpenInfo: () => true,
        setCloseInfo: () => false,
      },
    ],
    isLoading: [
      false,
      {
        submitExpenseForm: () => true,
        submitExpenseFormSuccess: () => false,
        submitExpenseFormFailure: () => false,
      },
    ],
    error: [
      false,
      {
        submitExpenseFormSuccess: () => false,
        setRequestError: () => true,
      },
    ],
  }),
  listeners(({ actions, values }) => ({
    cancelEditForm: () => {
      if (values.expenseFormChanged) {
        actions.setOpenCancelDialog()
      } else {
        window.history.go(-1)
      }
    },
    confirmCancelForm: () => {
      actions.setCloseCancelDialog()
      window.history.go(-1)
    },
  })),
  forms(({ actions, props }) => ({
    expenseForm: {
      defaults: {
        claimer: '',
        date: new Date(),
        description: '',
        amount: '',
        isApproved: false,
      } as ExpenseFormType,

      errors: (values) => ({
        claimer: !values.claimer.trim()
          ? 'Please enter a claimer name'
          : !validaMaxLength(values.claimer.trim())
          ? 'Max length is 22 characters.'
          : !validaMinLength(values.claimer.trim())
          ? 'Min length is 3 characters.'
          : null,
        description: !values.description.trim()
          ? 'Please enter a description'
          : !validaMinLength(values.description.trim())
          ? 'Min length is 3 characters.'
          : null,
        amount: !values.amount
          ? 'Please enter a description'
          : !(values.amount >= 0)
          ? 'Please enter a positive number.'
          : null,
      }),
      submit: async (formValues: ExpenseFormType, breakpoint) => {
        const data = {
          ...formValues,
          claimer: formValues.claimer.trim(),
          date: Timestamp.fromDate(formValues.date),
          description: formValues.description.trim(),
        }

        if (props.isEditing) {
          try {
            await updateDoc(doc(db, 'titus_ltd', props.id as string), data)
          } catch (error) {
            actions.setRequestError()
            return
          }
          breakpoint()
          actions.setOpenInfo()
          setTimeout(() => {
            actions.setCloseInfo()
          }, 2000)
          window.history.go(-1)
        } else {
          try {
            await addDoc(collection(db, 'titus_ltd'), data)
          } catch (error) {
            actions.setRequestError()
            return
          }
          actions.resetExpenseForm()
          actions.setOpenInfo()
          setTimeout(() => {
            actions.setCloseInfo()
          }, 2000)
        }
      },
    },
  })),
  events(({ actions, values, props }) => ({
    afterUnmount() {
      values.expenseForm.amount = defaultFormVals.amount
      values.expenseForm.claimer = defaultFormVals.claimer
      values.expenseForm.date = defaultFormVals.date
      values.expenseForm.isApproved = defaultFormVals.isApproved
      values.expenseForm.description = defaultFormVals.description
      actions.resetExpenseForm()
    },
    afterMount: () => {
      actions.resetExpenseForm()
      if (props.isEditing) {
        values.expenseForm.amount = props.amount as string
        values.expenseForm.claimer = props.claimer as string
        // @ts-ignore
        values.expenseForm.date = props.date.toDate()
        values.expenseForm.isApproved = props.isApproved as boolean
        values.expenseForm.description = props.description as string
      }
    },
  })),
])
