import { ProjectRepository } from "../repositories/project.repository"
import { IProjectModel } from "../models/Project"

const repo = new ProjectRepository()

export class ProjectService {
  async getAllProjects() {
    return repo.findAll()
  }

  async getProjectById(id: string) {
    const project = await repo.findById(id)

    if (!project) {
      throw new Error("PROJECT_NOT_FOUND")
    }

    return project
  }

  async createProject(data: IProjectModel) {
    if (!data.name || !data.description) {
      throw new Error("VALIDATION_ERROR")
    }

    return repo.create(data)
  }

  async updateProject(id: string, data: Partial<IProjectModel>) {
    const updated = await repo.update(id, data)

    if (!updated) {
      throw new Error("PROJECT_NOT_FOUND")
    }

    return updated
  }

  async deleteProject(id: string) {
    const deleted = await repo.delete(id)

    if (!deleted) {
      throw new Error("PROJECT_NOT_FOUND")
    }

    return deleted
  }
}