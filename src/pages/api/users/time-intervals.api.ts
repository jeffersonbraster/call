/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { buildnextAuthOptions } from '../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' })
  }

  const session = await unstable_getServerSession(
    req,
    res,
    buildnextAuthOptions(req, res),
  )

  return res.json({ session })
}
