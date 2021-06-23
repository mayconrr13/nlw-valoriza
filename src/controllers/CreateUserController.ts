import { Request, Response } from 'express'
import { CreateUserService } from '../services/CreateUserService'

class CreateUserController {

  async handle(request: Request, response: Response) {
    const { name, email, admin } = request.body

    const createUserServices = new CreateUserService()

    const user = await createUserServices.execute({
      name,
      email,
      admin
    })

    return response.json(user)
  }
}

export { CreateUserController }