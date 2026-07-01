import {Art, IArtModel } from "../models/Art"

export class ArtRepository {
  async findAll() {
    return Art.find().sort({ createdAt: -1 })
  }

  async findById(id: string) {
    return Art.findById(id)
  }

  async create(data: IArtModel) {
    return Art.create(data)
  }

  async update(id: string, data: Partial<IArtModel>) {
    return Art.findByIdAndUpdate(id, data, {
      new: true,
    })
  }

  async delete(id: string) {
    return Art.findByIdAndDelete(id)
  }
}