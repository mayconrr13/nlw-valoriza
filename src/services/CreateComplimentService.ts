import { getCustomRepository } from 'typeorm'
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_reciever: string;
  message: string;
}

class CreateComplimentService {

  async execute({ tag_id, user_sender, user_reciever, message }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
    const usersRepositories = getCustomRepository(UsersRepositories)

    if (user_sender === user_reciever) {
      throw new Error("Incorrect user reciever");      
    }

    const userRecieverExists = await usersRepositories.findOne({id: user_reciever})

    if (!userRecieverExists) {
      throw new Error("User reciever doesn't exists");      
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_sender, 
      user_reciever, 
      message
    })

    await complimentsRepositories.save(compliment)

    return compliment
  }
}

export { CreateComplimentService }