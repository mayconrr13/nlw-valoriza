import { Request, Response } from 'express'
import { ListUserRecieveComplimentsService } from '../services/ListUserRecieveComplimentsService'

class ListUserRecieveComplimentsController {

  async handle(request: Request, response: Response) {
    const { user_id } = request

    const listUserRecieveComplimentsService = new ListUserRecieveComplimentsService()

    const compliments = await listUserRecieveComplimentsService.execute(user_id)

    return response.json(compliments)
  }
}

export { ListUserRecieveComplimentsController }