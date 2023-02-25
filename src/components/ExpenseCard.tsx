import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Box,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import moment from 'moment'
import { useActions } from 'kea'
import { expensesListLogic } from '../scenes/ExpensesList/ExpensesListLogic'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 10,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
  },
  claimer: {
    marginTop: 10,
    fontSize: 16,
  },
  description: {
    marginTop: 20,
  },
  pos: {
    marginBottom: 12,
  },
  actions: {
    justifyContent: 'flex-end',
  },
})

interface ExpenseCardProps {
  id: string
  claimer: string
  date: any
  amount: number
  description: string
  isApproved: boolean
}

const ExpenseCard = ({
  id,
  claimer,
  date,
  amount,
  description,
  isApproved,
}: ExpenseCardProps) => {
  const classes = useStyles()
  const { setOpenConfirmDeleteDialog, editExpense } =
    useActions(expensesListLogic)

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Box className={classes.header}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {moment(new Date(date.toDate())).format('DD/MM/YYYY')}
            </Typography>

            <Typography
              className={classes.pos}
              color={isApproved ? 'primary' : 'error'}
            >
              {isApproved ? 'Approved' : 'Not Approved'}
            </Typography>
          </Box>

          <Typography variant="h5" component="h2">
            {amount} €
          </Typography>
          <Typography variant="h6" component="h6" className={classes.claimer}>
            By <strong>{claimer}</strong>
          </Typography>
          <Typography
            variant="body2"
            component="p"
            className={classes.description}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditIcon />}
            color="primary"
            onClick={() => editExpense(id)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<DeleteIcon />}
            color="secondary"
            onClick={() => setOpenConfirmDeleteDialog(id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default ExpenseCard
