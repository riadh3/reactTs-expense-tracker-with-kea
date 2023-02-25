import { useState } from 'react'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import 'date-fns'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import moment from 'moment'
import { router } from 'kea-router'

interface MonthPickerProps {
  date: Date | null
}

const MonthPicker = ({ date = null }: MonthPickerProps) => {
  const [selectedDate, setSelectedDate] = useState(date)

  const handleDateChange = (date: MaterialUiPickersDate) => {
    setSelectedDate(date)
    const month = moment(date).format('M')
    const year = moment(date).format('YYYY')
    router.actions.push(`/expenses-list/${year}/${month}`)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        fullWidth
        variant="dialog"
        inputVariant="outlined"
        openTo="month"
        views={['year', 'month']}
        label="Month and year"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  )
}

export default MonthPicker
