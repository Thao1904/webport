import { CategoryRepository } from "../repositories/category.repository";
import { ICategoryModel } from "../models/Category";
import { BaseService } from "./base.service";

const repo = new CategoryRepository()
export class CategoryService extends BaseService {
    async createCategory(data: ICategoryModel) {
        const requiredList: (keyof ICategoryModel)[] = ["name", "color"];

        const isValid = this.validateFields(data, requiredList);
        if (!isValid) {
            throw new Error("VALIDATION_ERROR");
        }
        return repo.create(data)
    }
}
