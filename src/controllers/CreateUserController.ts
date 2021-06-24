import { Request, Response } from 'express'
import { CreateUserService } from '../services/CreateUserService'

class CreateUserController {

  async handle(request: Request, response: Response) {
    const { name, email, password, admin } = request.body

    const createUserServices = new CreateUserService()

    const user = await createUserServices.execute({
      name,
      email,
      password,
      admin
    })

    return response.json(user)
  }
}

export { CreateUserController }