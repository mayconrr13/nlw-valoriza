import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepositories)

    if (!email || !password) {
      throw new Error("Missing credentials");      
    }

    const user = await usersRepository.findOne({ email })

    if (!user) {
      throw new Error("Email/Password incorrect");      
    }

    const correntPassword = await compare(password, user.password)
      
    if (!correntPassword) {
      throw new Error("Email/Password incorrect");      
    }

    const token = sign(
      {
        email: user.email,
        admin: user.admin,
      }, 
      "e32e998da4d087e44f6962ff8fd61284", 
      {
        subject: user.id,
        expiresIn: "1d"
      },
    )

    return token
  }
}

export { AuthenticateUserService }