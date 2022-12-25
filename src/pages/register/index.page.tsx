import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Container, Form, Header } from './styles'

export default function Register() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Call</Heading>

        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form">
        <label htmlFor="user">
          <Text size="sm">Nome do usuário</Text>
          <TextInput
            id="user"
            prefix="call.jeffersonbrandao.com.br/"
            placeholder="Seu usuário"
          />
        </label>

        <label htmlFor="name">
          <Text size="sm">Nome completo</Text>
          <TextInput id="name" placeholder="Seu nome completo" />
        </label>

        <Button type="submit">
          Próximo passo <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
