import { getCustomRepository } from 'typeorm'
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"

class ListUserRecieveComplimentsService {

  async execute(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepositories)

    const compliments = await complimentsRepository.find({
      where: {
        user_reciever: user_id
      }
    })

    return compliments
  }
}

export { ListUserRecieveComplimentsService }