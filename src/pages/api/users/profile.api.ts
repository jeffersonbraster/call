/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { buildnextAuthOptions } from '../auth/[...nextauth].api'

const updateProfileBodySchema = z.object({
  bio: z.string().min(1).max(500),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Only PUT requests are allowed' })
  }

  const session = await unstable_getServerSession(
    req,
    res,
    buildnextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { bio } = updateProfileBodySchema.parse(req.body)

  await prisma.user.update({
    where: { id: session.user.id },
    data: { bio },
  })

  return res.status(204).end()
}
