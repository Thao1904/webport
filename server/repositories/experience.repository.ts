import { Experience, IExperience } from "../models/Experience"

export class ExperienceRepository {
  async findAll() {
    return Experience.find().sort({ createdAt: -1 })
  }

  async findById(id: string) {
    return Experience.findById(id)
  }

  async create(data: IExperience) {
    return Experience.create(data)
  }

  async update(id: string, data: Partial<IExperience>) {
    return Experience.findByIdAndUpdate(id, data, {
      new: true,
    })
  }

  async delete(id: string) {
    return Experience.findByIdAndDelete(id)
  }
}