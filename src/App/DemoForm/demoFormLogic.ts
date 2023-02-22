import { actions, kea, reducers, path } from 'kea'
import type { demoFormLogicType } from './demoFormLogicType'
import { validateEmail } from './utils'
import { forms } from 'kea-forms'

export enum Provider {
  Facebook = 'facebook',
  Google = 'google',
  Twitter = 'twitter',
}

export interface AccountType {
  provider: Provider
  url: string
}

export interface UserFormType {
  name: string
  email: string
  accounts: AccountType[]
}

export const demoFormLogic = kea<demoFormLogicType<UserFormType>>([
  path(['App', 'DemoForm', 'demoFormLogic']),
  forms({
    userForm: {
      defaults: {
        name: '',
        email: '',
        accounts: [],
      } as UserFormType,
      errors: (values) => ({
        name: !values.name && 'Please enter a name',
        email: !values.email
          ? 'Please enter an email'
          : !validateEmail(values.email)
          ? 'Please enter a valid email'
          : null,
        accounts: values.accounts.map((a) => ({
          provider: !a.provider && 'Please enter a provider',
          url: !a.url && 'Please enter a url',
        })),
      }),
      submit: async (formValues, breakpoint) => {
        await breakpoint(2000)
        console.log('submitting!', formValues)
        window.alert("Well done! Here's an alert")
      },
    },
  }),
  actions({
    removeAccount: (index: number) => ({ index }),
  }),
  reducers({
    userForm: {
      removeAccount: (state, { index }) => ({ ...state, accounts: state.accounts.filter((_, i) => i !== index) }),
    },
  }),
])
