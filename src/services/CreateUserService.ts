import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from 'bcryptjs'

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {

  async execute({ name, email, password, admin }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories)

    if (!email) {
      throw new Error("Please, inform an email")
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    })

    if (userAlreadyExists) {
      throw new Error("Email already in use")
    }

    const encryptedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: encryptedPassword,
      admin
    })

    await usersRepository.save(user)

    return user
  }
}

export { CreateUserService }