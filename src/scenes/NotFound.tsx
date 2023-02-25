import { Container } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { A } from 'kea-router'

const NotFound = () => {
  return (
    <Container>
      <Alert severity="error">
        This route does not exist please{' '}
        <A href="/">
          <strong> back to the home page</strong>
        </A>
      </Alert>
    </Container>
  )
}

export default NotFound
