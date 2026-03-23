import { Project, IProject } from "../models/Project"

export class ProjectRepository {
  async findAll() {
    return Project.find().sort({ createdAt: -1 })
  }

  async findById(id: string) {
    return Project.findById(id)
  }

  async create(data: IProject) {
    return Project.create(data)
  }

  async update(id: string, data: Partial<IProject>) {
    return Project.findByIdAndUpdate(id, data, {
      new: true,
    })
  }

  async delete(id: string) {
    return Project.findByIdAndDelete(id)
  }
}