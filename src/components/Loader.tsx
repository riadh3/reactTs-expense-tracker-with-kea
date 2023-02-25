import { Box, CircularProgress } from '@material-ui/core'

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  )
}

export default Loader
