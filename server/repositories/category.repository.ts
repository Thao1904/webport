import { Category, ICategoryModel } from '../models/Category'

export class CategoryRepository {
    async create(data: ICategoryModel) {
        return Category.create(data)
    }

    async findAll() {
        return Category.find().sort({ createdAt: -1 })
    }
}