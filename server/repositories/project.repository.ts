import { Project, IProjectModel } from "../models/Project"
import "../models/Category"

export class ProjectRepository {
  async findAll() {
    return Project.find()
    .select("title categories is_publish is_private slug viewed updatedAt")
    .sort({ createdAt: -1 }).populate("categories", "name")
  }

  async findById(id: string) {
    return Project.findById(id)
  }

  async findBySlug(slug: string) {
    return Project.find({slug: slug}).populate("categories", "name")
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