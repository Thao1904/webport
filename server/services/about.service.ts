import { IAboutModel } from "../models/About";
import { AboutRepository } from "../repositories/about.repository";
import { BaseService } from "./base.service";

const repo = new AboutRepository()
export class AboutService extends BaseService {
    async createAbout(data: IAboutModel) {
        const requiredList: (keyof IAboutModel)[] = ["detail", "is_public"];

        const isValid = this.validateFields(data, requiredList);

        if (!isValid) {
            throw new Error("VALIDATION_ERROR");
        }
        return repo.create(data)

    }
}