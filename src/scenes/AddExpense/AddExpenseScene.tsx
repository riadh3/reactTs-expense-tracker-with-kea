import { Box, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExpenseForm from '../../components/Form/FormScene'

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#0718C4',
    marginTop: '1.25rem',
    marginBottom: '2.5rem',
  },
}))

const AddExpense = () => {
  const classes = useStyles()

  return (
    <Container>
      <Box className={classes.title}>
        <Typography gutterBottom variant="h5" align="center">
          Add New Expense
        </Typography>
      </Box>
      <ExpenseForm />
    </Container>
  )
}

export default AddExpense
