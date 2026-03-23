import { Schema, model, models } from "mongoose"

export interface IProject {
  name: string
  description: string
  imageUrl: string
  refLink: string
}

const PostSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true},
    refLink: { type: String, required: true}
  },
  { timestamps: true }
)

export const Project =
  models.Project || model<IProject>("Project", PostSchema)