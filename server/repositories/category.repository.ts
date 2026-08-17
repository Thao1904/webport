import { Category, ICategoryModel } from '../models/Category'

export class CategoryRepository {
    async create(data: ICategoryModel) {
        return Category.create(data)
    }
}