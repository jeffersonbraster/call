import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Calendar from '../../../../../components/Calendar'
import { api } from '../../../../../lib/axios'
import {
  Container,
  TimeHeader,
  TimePicker,
  TimePickerItem,
  TimePickerList,
} from './styles'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const router = useRouter()
  const username = router.query.username as string

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const hasSelectedDate = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const month = selectedDate ? dayjs(selectedDate).format('MMMM') : null
  const day = selectedDate ? dayjs(selectedDate).format('DD') : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    { enabled: !!selectedDate },
  )

  return (
    <Container isTimePickerOpen={hasSelectedDate}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {hasSelectedDate && (
        <TimePicker>
          <TimeHeader>
            {weekDay},{' '}
            <span>
              {day} de {month}
            </span>
          </TimeHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return (
                <TimePickerItem
                  key={hour}
                  disabled={!availability.possibleTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
