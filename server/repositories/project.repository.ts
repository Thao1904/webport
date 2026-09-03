import { Project, IProjectModel } from "../models/Project"

export class ProjectRepository {
  async findAll() {
    return Project.find().sort({ createdAt: -1 })
  }

  async findById(id: string) {
    return Project.findById(id)
  }

  async findBySlug(slug: string) {
    return Project.find({slug: slug})
  }

  async create(data: IProjectModel) {
    return Project.create(data)
  }

  async update(id: string, data: Partial<IProjectModel>) {
    return Project.findByIdAndUpdate(id, data, {
      new: true,
    })
  }

  async delete(id: string) {
    return Project.findByIdAndDelete(id)
  }
}