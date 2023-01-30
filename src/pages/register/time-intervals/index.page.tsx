import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDays } from '../../../utils/get-week-days'
// import { api } from '../../lib/axios'
import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  FormError,
} from './styles'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().int().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Selecione pelo menos um dia da semana',
    }),
})

type TimeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        {
          weekDay: 0,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 1,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 2,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 3,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 4,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 5,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 6,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
      ],
    },
  })

  const intervals = watch('intervals')

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  })

  async function handleSetTimeIntervals(data: TimeIntervalsFormData) {
    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá!</Heading>

        <Text>
          Defina os intervalos de horários que você está disponivel em cada dia
          da semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true)
                          }}
                          checked={field.value}
                        />
                      )
                    }}
                  />
                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={!intervals[index].enabled}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={!intervals[index].enabled}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}
        </IntervalContainer>

        {errors.intervals && (
          <FormError size="sm">{errors.intervals.message}</FormError>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Proximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
