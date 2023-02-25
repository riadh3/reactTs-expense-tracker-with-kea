import { Box, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useValues } from 'kea'
import ErrorMessage from '../../components/ErrorMessage'
import ExpenseForm from '../../components/Form/FormScene'
import Loader from '../../components/Loader'
import { editExpenseLogic } from './EditExpenseLogic'

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#0718C4',
    marginTop: '1.25rem',
    marginBottom: '2.5rem',
  },
}))

interface EditExpenseProps {
  id: string
}

const EditExpense = ({ id: expenseId }: EditExpenseProps) => {
  const classes = useStyles()

  const { error, isLoading, expenseData } = useValues(
    editExpenseLogic({ expenseId })
  )

  return (
    <Container>
      <Box className={classes.title}>
        <Typography gutterBottom variant="h5" align="center">
          Edit Expense
        </Typography>
      </Box>
      {error ? (
        <ErrorMessage />
      ) : isLoading ? (
        <Loader />
      ) : (
        <ExpenseForm expenseData={expenseData} />
      )}
    </Container>
  )
}

export default EditExpense
