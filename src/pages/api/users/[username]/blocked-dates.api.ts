/* eslint-disable camelcase */
// import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { year, month } = req.query

  if (!year || !month) {
    return res.status(400).json({ message: 'Date no provided.' })
  }

  const user = await prisma.user.findUnique({
    where: { username },
  })

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDays) => availableWeekDays.week_day === weekDay,
    )
  })

  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT
      EXTRACT(DAY FROM s.date) AS date,
      COUNT(s.date) as amount,
      ((uti.time_end_in_minutes - uti.time_start_in_minutes) / 60) AS size
    FROM schedulings s
    LEFT JOIN user_time_intervals uti ON uti.week_day = WEEKDAY(DATE_ADD(s.date, INTERVAL 1 DAY)))
    WHERE s.user_id = ${user.id}
      AND DATE_FORMAT(s.date, '%Y-%m') = ${`${year}-${month}`}

    GROUP BY EXTRACT(DAY FROM s.date),
      ((uti.time_end_in_minutes - uti.time_start_in_minutes) / 60)

    HAVING amount >= size
  `

  const blockedDates = blockedDatesRaw.map((raw) => raw.date)

  return res.json({ blockedWeekDays, blockedDates })
}
