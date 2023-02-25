import { useValues } from 'kea'
import { makeStyles } from '@material-ui/core/styles'

import { isValidMonth, isValidYear } from '../../utils/validations'
import { router } from 'kea-router'
import Home from '../Home/HomeScene'
import { Grid, Paper } from '@material-ui/core'
import ExpenseCard from '../../components/ExpenseCard'
import { expensesListLogic } from './ExpensesListLogic'
import Alert from '@material-ui/lab/Alert'
import DeleteDialog from '../../components/DeleteDialog'
import Loader from '../../components/Loader'
import ErrorMessage from '../../components/ErrorMessage'

interface ExpensesListProps {
  year: number
  month: number
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    boxSizing: 'border-box',
    boxShadow: 'none',
  },
}))

const ExpensesList = ({ year, month }: ExpensesListProps) => {
  const classes = useStyles()

  const { error, expensesList, isLoading } = useValues(
    expensesListLogic({ year, month })
  )

  if (!isValidMonth(month) || !isValidYear(year)) {
    router.actions.push('/')
  }

  return (
    <>
      <Home date={new Date(year, month - 1)}>
        <Grid item xs={12}>
          {error ? (
            <ErrorMessage />
          ) : isLoading ? (
            <Loader />
          ) : expensesList.length ? (
            <Paper className={classes.paper}>
              {expensesList.map((expense) => (
                <ExpenseCard key={expense.id} {...expense} />
              ))}
            </Paper>
          ) : (
            <Alert severity="warning">
              There is no expense had been created for the selected month!
            </Alert>
          )}
        </Grid>
      </Home>
      <DeleteDialog />
    </>
  )
}

export default ExpensesList
