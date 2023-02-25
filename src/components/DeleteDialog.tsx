import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import { expensesListLogic } from '../scenes/ExpensesList/ExpensesListLogic'
import { useActions, useValues } from 'kea'

const DeleteDialog = () => {
  const { confirmDeleteExpense, setCloseConfirmDeleteDialog } =
    useActions(expensesListLogic)
  const { openConfirmDeleteDialog } = useValues(expensesListLogic)

  return (
    <Dialog
      open={openConfirmDeleteDialog}
      onClose={setCloseConfirmDeleteDialog}
      aria-labelledby="confirm-delete"
      aria-describedby="confirm-delete-action"
    >
      <DialogTitle id="confirm-delete">Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this expense?
          <br />
          This action is not reversible and will result in permenant loss of the
          related data.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={setCloseConfirmDeleteDialog}>Cancel</Button>
        <Button
          onClick={confirmDeleteExpense}
          autoFocus
          color="secondary"
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
