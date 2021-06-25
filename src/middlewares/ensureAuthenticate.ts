import { Request, Response, NextFunction, request } from "express"
import { verify } from 'jsonwebtoken'

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization
  
  if (!authToken) {
    return res.status(401).end()
  }

  const [, token] = authToken.split(" ")

  try {
    const { sub } = verify(token , "e32e998da4d087e44f6962ff8fd61284")
    
    request.user_id = sub as string

    return next()
  } catch (error) {
    return res.status(401).end()
  }
}