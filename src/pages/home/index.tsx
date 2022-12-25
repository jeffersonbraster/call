import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'

import previewImg from '../../assets/calendarImg.png'
import { Container, Hero, Preview } from './styles'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>

        <Text size="lg">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </Hero>

      <Preview>
        <Image
          src={previewImg}
          alt="Um calendário selecionando algumas datas de agendamento do mês de setembro/22"
          height={400}
          priority
        />
      </Preview>
    </Container>
  )
}
