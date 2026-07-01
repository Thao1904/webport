import { Schema, model, models } from "mongoose"

export interface IExperienceModel {
  job_title: string
  year: string
  position: string
  company: string
  short_description: string
  detail: string
  is_ongoing: boolean
}

const ExperienceSchema = new Schema<IExperienceModel>(
  {
    job_title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    company: {
      type: String, 
      required: true,
    },
    short_description: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true
    },
    is_ongoing: {
      type: Boolean, 
      required: false, 
      default: false
    }
  },
  { timestamps: true }
)

export const Experience =
  models.Experience || model<IExperienceModel>("Experience", ExperienceSchema)