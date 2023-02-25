import Box from '@material-ui/core/Box/Box'
import { Alert } from '@material-ui/lab'

const ErrorMessage = () => {
  return (
    <Box sx={{ paddingTop: 20 }}>
      <Alert severity="error">
        Some thing went wrong! <br />
        Please reload the page and try again!
      </Alert>
    </Box>
  )
}

export default ErrorMessage
