import { Schema, model, models } from "mongoose"

export interface IAboutModel {
    detail: string
    is_public: Boolean

}
const AboutSchema = new Schema<IAboutModel>(
    {
        detail: { required: true, type: String },
        is_public: { required: true, type: Boolean, default: true }
    },
    { timestamps: true }
)
export const About = models.About || model<IAboutModel>("About", AboutSchema)