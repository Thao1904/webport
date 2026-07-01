import { ExperienceRepository } from "../repositories/experience.repository"
import { IExperienceModel } from "../models/Experience"
import { BaseService } from "./base.service"

const repo = new ExperienceRepository()

export class ExperienceService extends BaseService {
  async getAllExperiences() {
    return repo.findAll()
  }

  async getExperienceById(id: string) {
    const experience = await repo.findById(id)

    if (!experience) {
      throw new Error("EXPERIENCE_NOT_FOUND")
    }

    return experience
  }

  async createExperience(data: IExperienceModel) {
    const requiredList: (keyof IExperienceModel)[] = ["job_title", "company", "detail", "job_title", "position", "short_description", "year"];

    const isValid = this.validateFields(data, requiredList);

    if (!isValid) {
      throw new Error("VALIDATION_ERROR");
    }

    return repo.create(data)
  }

  async updateExperience(id: string, data: any) {
    const payload: Partial<IExperienceModel> = {
      ...data,
    }

    const updated = await repo.update(id, payload)

    if (!updated) {
      throw new Error("EXPERIENCE_NOT_FOUND")
    }

    return updated
  }

  async deleteExperience(id: string) {
    const deleted = await repo.delete(id)

    if (!deleted) {
      throw new Error("EXPERIENCE_NOT_FOUND")
    }

    return deleted
  }
}