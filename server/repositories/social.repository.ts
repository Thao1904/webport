import { ISocialModel, Social } from "../models/Social";

export class SocialRepository {
    async create(data:ISocialModel) {
        return Social.create(data)
    }
}