import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Switch, Button, FormControlLabel } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { Form, Field } from 'kea-forms'
import { expenseFormLogic } from './formLogic'
import { useActions, useValues } from 'kea'
import CancelFormDialog from '../CancelFormDialog'
import ErrorMessage from '../ErrorMessage'
import InfoMessage from '../InfoMessage'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    marginTop: '1.25rem',
    marginBottom: '2.5rem',
  },
  form: {
    maxWidth: '70%',
    paddingTop: '50px',
    paddingBottom: '50px',
    margin: 'auto',
    '& .form-error, .MuiFormHelperText-root': {
      color: '#f44336',
    },
    '& .MuiFormHelperText-root': {
      color: '#f44336',
      fontSize: '0.875rem',
      fontWeight: 400,
      marginLeft: 0,
    },
  },
  switch: {
    marginLeft: '4px',
  },
  actions: {
    marginTop: '60px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
}))

export interface Expense {
  amount: number
  claimer: string
  date: any
  description: string
  id: string
  isApproved: boolean
}

const ExpenseForm = (props: any) => {
  const classes = useStyles()
  // const isEditing = !!props.expenseData
  // // console.log('props.expenseData: ', props.expenseData)
  // const expenseData: Expense | null = props?.expenseData ?? null

  // const { cancelEditForm } = useActions(
  //   expenseFormLogic({ isEditing, ...expenseData })
  // )
  // const { info, isExpenseFormSubmitting, error } = useValues(
  //   expenseFormLogic({ isEditing, ...expenseData })
  const isEditing = !!props.expenseData
  // console.log('props.expenseData: ', props.expenseData)
  const expenseData: Expense | null = props?.expenseData ?? null

  const { cancelEditForm } = useActions(
    expenseFormLogic({ isEditing, ...expenseData })
  )
  const { info, isExpenseFormSubmitting, error } = useValues(
    expenseFormLogic({ isEditing, ...expenseData })
  )

  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        {info && <InfoMessage isEditing={isEditing} />}

        {error && <ErrorMessage />}
        <Form
          logic={expenseFormLogic}
          formKey="expenseForm"
          enableFormOnSubmit
          className={classes.form}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field name="claimer">
                {({ onChange, value, error }) => (
                  <TextField
                    fullWidth
                    label="Claimer*"
                    variant="outlined"
                    value={value ?? ''}
                    onChange={(e) => onChange?.(e.target.value)}
                    error={!!error}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field name="date">
                {({ onChange, value, error }) => (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      format="dd/MM/yyyy"
                      fullWidth
                      id="date"
                      inputVariant="outlined"
                      label="Date*"
                      margin="normal"
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      value={value ?? ''}
                      onChange={(e) => onChange?.(e)}
                      error={!!error}
                    />
                  </MuiPickersUtilsProvider>
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field name="description">
                {({ onChange, value, error }) => (
                  <TextField
                    fullWidth
                    label="Description*"
                    maxRows={Infinity}
                    multiline
                    variant="outlined"
                    value={value ?? ''}
                    onChange={(e) => onChange?.(e.target.value)}
                    error={!!error}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field name="amount">
                {({ onChange, value, error }) => (
                  <TextField
                    type="number"
                    label="Amount*"
                    variant="outlined"
                    value={value ?? ''}
                    onChange={(e) => onChange?.(e.target.value)}
                    error={!!error}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              {' '}
              <Field name="isApproved">
                {({ onChange, value }) => (
                  <FormControlLabel
                    className={classes.switch}
                    label="Approved*"
                    labelPlacement="start"
                    control={
                      <Switch
                        onChange={(e) => onChange?.(e.target.checked)}
                        checked={value}
                        color="primary"
                      />
                    }
                  />
                )}
              </Field>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.actions}>
            <Button onClick={cancelEditForm}> Cancel</Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isExpenseFormSubmitting}
            >
              Save
            </Button>
          </Grid>
        </Form>
      </Container>

      <CancelFormDialog />
    </>
  )
}

export default ExpenseForm
