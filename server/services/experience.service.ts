import { ExperienceRepository } from "../repositories/experience.repository"
import { IExperience } from "../models/Experience"

const repo = new ExperienceRepository()

export class ExperienceService {
  private normalizeLines(value: string[] | string | undefined): string[] {
    if (!value) return []

    if (Array.isArray(value)) {
      return value
        .map((item) => item.trim())
        .filter(Boolean)
    }

    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
  }

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

  async createExperience(data: any) {
    const responsibilities = this.normalizeLines(data.responsibilities)
    const achievements = this.normalizeLines(data.achievements)

    if (
      !data.jobTitle ||
      !data.year ||
      !data.position ||
      !data.shortDescription ||
      responsibilities.length === 0 ||
      achievements.length === 0
    ) {
      throw new Error("VALIDATION_ERROR")
    }

    const payload: IExperience = {
      jobTitle: data.jobTitle,
      year: data.year,
      position: data.position,
      shortDescription: data.shortDescription,
      responsibilities,
      achievements,
    }

    return repo.create(payload)
  }

  async updateExperience(id: string, data: any) {
    const payload: Partial<IExperience> = {
      ...data,
    }

    if (data.responsibilities !== undefined) {
      payload.responsibilities = this.normalizeLines(data.responsibilities)
    }

    if (data.achievements !== undefined) {
      payload.achievements = this.normalizeLines(data.achievements)
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