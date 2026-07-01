import { ProjectRepository } from "../repositories/project.repository"
import { IProjectModel } from "../models/Project"
import { BaseService } from "./base.service"

const repo = new ProjectRepository()

export class ProjectService extends BaseService{
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
    const requiredList: (keyof IProjectModel)[] = ["title", "short_description", "content", "thumbnail", "categories", "is_public"];

    const isValid = this.validateFields(data, requiredList);

    const isValidUrl = data.ref_link ? this.validateUrl(data.thumbnail) && this.validateUrl(data.ref_link) : this.validateUrl(data.thumbnail);

    const isValidPassword = data.password ? this.validatePassword(data.password) : true
    if (!isValid || !isValidUrl || !isValidPassword) {
      throw new Error("VALIDATION_ERROR");
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