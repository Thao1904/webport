import { ArtRepository } from "../repositories/art.repository"
import { IArt } from "../models/Art"

const repo = new ArtRepository()

export class ArtService {
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

  async createArt(data: IArt) {
    if (!data.title || !data.medium || !data.year || !data.imageUrl || !data.refLink) {
      throw new Error("VALIDATION_ERROR")
    }

    return repo.create(data)
  }

  async updateArt(id: string, data: Partial<IArt>) {
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