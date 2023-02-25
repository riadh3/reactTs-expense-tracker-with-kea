import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@material-ui/core/Button'
import { useActions, useValues } from 'kea'
import { expenseFormLogic } from './Form/formLogic'

const CancelFormDialog = () => {
  const { setCloseCancelDialog, confirmCancelForm } = useActions(
    expenseFormLogic()
  )
  const { openCancelDialog } = useValues(expenseFormLogic())

  return (
    <Dialog open={openCancelDialog} onClose={setCloseCancelDialog}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to leave this page?
          <br />
          All the entered data will be lost permenantly.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={setCloseCancelDialog}>Stay here</Button>
        <Button
          onClick={confirmCancelForm}
          autoFocus
          color="primary"
          variant="contained"
        >
          Leave
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CancelFormDialog
