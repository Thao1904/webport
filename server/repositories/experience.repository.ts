import { Experience, IExperienceModel } from "../models/Experience"

export class ExperienceRepository {
  async findAll() {
    return Experience.find().sort({ createdAt: -1 })
  }

  async findById(id: string) {
    return Experience.findById(id)
  }

  async create(data: IExperienceModel) {
    return Experience.create(data)
  }

  async update(id: string, data: Partial<IExperienceModel>) {
    return Experience.findByIdAndUpdate(id, data, {
      new: true,
    })
  }

  async delete(id: string) {
    return Experience.findByIdAndDelete(id)
  }
}