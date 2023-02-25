import {
  Grid,
  Button,
  Paper,
  Box,
  Container,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import MonthPicker from '../../components/MonthPicker'
import { useActions } from 'kea'
import { homeLogic } from './homeLogic'

const useStyles = makeStyles((theme) => ({
  title: {
    color: '#0718C4',
    marginTop: '1.25rem',
    marginBottom: '2.5rem',
  },
  newBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1.25rem',
    marginBottom: '2.5rem',
    [theme.breakpoints.up('md')]: {
      marginBottom: '3.5rem',
    },
  },
  paper: {
    padding: theme.spacing(2),
    boxSizing: 'border-box',
    boxShadow: 'none',
  },
  date: {
    marginBottom: '1.5rem',
    fontSize: '1rem',
  },
}))

interface HomeProps {
  children?: JSX.Element
  date: Date
}

const Home = ({ children, date }: HomeProps) => {
  const classes = useStyles()
  const { createNewExpense } = useActions(homeLogic)

  return (
    <Container>
      <Box className={classes.title}>
        <Typography gutterBottom variant="h5" align="center">
          Manage all your expenses claims from one place
        </Typography>
      </Box>

      <Box className={classes.newBtn}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
          onClick={createNewExpense}
        >
          New Expense
        </Button>
      </Box>

      <Grid item container spacing={2}>
        <Grid item xs={12} sm={8} md={5}>
          <Paper className={classes.paper}>
            <Typography variant="body2" className={classes.date}>
              Select a Month to track expenses
            </Typography>
            <MonthPicker date={date} />
          </Paper>
        </Grid>
        {children}
      </Grid>
    </Container>
  )
}

export default Home
