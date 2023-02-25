import { Container } from '@material-ui/core'
import Navigation from '../components/Navigation'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f6f6f6',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    flexGrow: 1,
  },
}))

interface LayoutProps {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles()
  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      <Navigation />
      <Container disableGutters component="main" className={classes.main}>
        {children}
      </Container>
    </Container>
  )
}

export default Layout
