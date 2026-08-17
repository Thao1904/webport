import { ISocialModel } from "../models/Social"
import { SocialRepository } from "../repositories/social.repository"
import { BaseService } from "./base.service"  

const repo = new SocialRepository()
export class SocialService extends BaseService {
    async createSocial(data: ISocialModel) {
        const requiredList: (keyof ISocialModel)[] = ["platform", "label", "link", "icon", "status"];

        const isValid = this.validateFields (data, requiredList); 
        if (!isValid) {
            throw new Error("VALIDATION_ERROR");
        }
        return repo.create(data)
        
    }
}

