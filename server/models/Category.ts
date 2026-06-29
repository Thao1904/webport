import { Schema, model, models } from "mongoose"

export interface ICategoryModel {
    name: string,
    color: string
}

const CategorySchema = new Schema<ICategoryModel>(
  {
    name: {required: true, type: String},
    color: {required: true, type: String},
  },
  { timestamps: true }
)

export const Category =
  models.Category || model<ICategoryModel>("Category", CategorySchema)