import { Avatar, Heading, Text } from '@ignite-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '../../../lib/prisma'
import { ScheduleForm } from './ScheduleForm'
import { Container, UserHeader } from './styles'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatarUrl} />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>

      <ScheduleForm />
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const username = context.params?.username

  const user = await prisma.user.findUnique({
    where: {
      username: username as string,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    revalidate: 60 * 60 * 24, // 24 hours
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
  }
}
