import { getCustomRepository } from 'typeorm'
import { TagsRepositories } from "../repositories/TagsRepositories"

interface ITag {
  name: string;
}

class CreateTagService {

  async execute({ name }: ITag) {
    const tagsRepository = getCustomRepository(TagsRepositories)

    if (!name) {
      throw new Error("Incorrect tag name");      
    }

    const tagAlreadyExists = await tagsRepository.findOne({
      name,
    })

    if (tagAlreadyExists) {
      throw new Error("Tag already exists");      
    }

    const tag = tagsRepository.create({
      name,
    })

    await tagsRepository.save(tag)

    return tag
  }
}

export { CreateTagService }