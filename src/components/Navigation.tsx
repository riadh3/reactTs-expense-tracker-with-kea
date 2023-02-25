import { Container, Toolbar, AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { A } from 'kea-router'

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow:
      '0px 2px 4px -1px rgb(7 24 196 / 20%), 0px 4px 5px 0px rgb(7 24 196 / 14%), 0px 1px 10px 0px rgb(7 24 196 / 12%)',
    paddingTop: '15px',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
    },
  },
}))

const Navigation = () => {
  const classes = useStyles()
  return (
    <AppBar position="static" color="transparent" className={classes.appBar}>
      <Container maxWidth={false}>
        <Toolbar disableGutters className={classes.toolbar}>
          <A href={'/'}>
            <img alt="logo" src="logo.svg" height={50} />
          </A>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navigation
