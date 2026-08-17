import { About, IAboutModel } from "../models/About"

export class AboutRepository {
    async create(data: IAboutModel) {
        return About.create(data)
    }
}