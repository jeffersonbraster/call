interface GetWeekDaysParams {
  short?: boolean
}

export function getWeekDays({ short = false }: GetWeekDaysParams) {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
  })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 1, day + 1))))
    .map((day) => {
      if (short) {
        return day.substring(0, 3).toUpperCase()
      }

      return day.substring(0, 1).toUpperCase().concat(day.substring(1))
    })
}
