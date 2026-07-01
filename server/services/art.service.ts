import { ArtRepository } from "../repositories/art.repository"
import { IArtModel } from "../models/Art"
import { BaseService } from "./base.service"

const repo = new ArtRepository()

export class ArtService extends BaseService {
  async getAllArts() {
    return repo.findAll()
  }

  async getArtById(id: string) {
    const art = await repo.findById(id)

    if (!art) {
      throw new Error("ART_NOT_FOUND")
    }

    return art
  }

  async createArt(data: IArtModel) {
    const requiredList: (keyof IArtModel)[] = ["title", "short_description", "content", "thumbnail", "categories", "is_public"];

    const isValid = this.validateFields(data, requiredList);

    const isValidUrl = data.ref_link ? this.validateUrl(data.thumbnail) && this.validateUrl(data.ref_link) : this.validateUrl(data.thumbnail);

    const isValidPassword = data.password ? this.validatePassword(data.password) : true
    if (!isValid || !isValidUrl || !isValidPassword) {
      throw new Error("VALIDATION_ERROR");
    }

    return repo.create(data)
  }

  async updateArt(id: string, data: Partial<IArtModel>) {
    const updated = await repo.update(id, data)

    if (!updated) {
      throw new Error("ART_NOT_FOUND")
    }

    return updated
  }

  async deleteArt(id: string) {
    const deleted = await repo.delete(id)

    if (!deleted) {
      throw new Error("ART_NOT_FOUND")
    }

    return deleted
  }
}