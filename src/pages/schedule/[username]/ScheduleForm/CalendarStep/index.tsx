import Calendar from '../../../../../components/Calendar'
import {
  Container,
  TimeHeader,
  TimePicker,
  TimePickerItem,
  TimePickerList,
} from './styles'

export function CalendarStep() {
  const hasSelectedDate = false

  return (
    <Container isTimePickerOpen={hasSelectedDate}>
      <Calendar />

      {hasSelectedDate && (
        <TimePicker>
          <TimeHeader>
            Terça-feira <span>20 de Janeiro</span>
          </TimeHeader>

          <TimePickerList>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>09:00h</TimePickerItem>
            <TimePickerItem>10:00h</TimePickerItem>
            <TimePickerItem>11:00h</TimePickerItem>
            <TimePickerItem>12:00h</TimePickerItem>
            <TimePickerItem>13:00h</TimePickerItem>
            <TimePickerItem>14:00h</TimePickerItem>
            <TimePickerItem>15:00h</TimePickerItem>
            <TimePickerItem>16:00h</TimePickerItem>
            <TimePickerItem>17:00h</TimePickerItem>
            <TimePickerItem>18:00h</TimePickerItem>
            <TimePickerItem>19:00h</TimePickerItem>
            <TimePickerItem>20:00h</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
