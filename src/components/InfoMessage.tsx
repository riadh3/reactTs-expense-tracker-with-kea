import Box from '@material-ui/core/Box'
import { Alert } from '@material-ui/lab'

const InfoMessage = ({ isEditing }: { isEditing: boolean }) => {
  return (
    <Box sx={{ paddingTop: 20 }}>
      <Alert severity="info">
        {isEditing
          ? 'Changes has been saved successfully!'
          : 'The new expense has been added successfully!'}
      </Alert>
    </Box>
  )
}

export default InfoMessage
