import { Schema, model, models } from "mongoose"

export interface ISettingModel {
    site_name: string
    tagline: string
    location: string
    contact_email: string
    new_project_public: boolean
    maintenance_mode: boolean
    password: string
}

const SettingSchema = new Schema<ISettingModel>(
  {
    site_name: { required: true, type: String },
    tagline: { required: true, type: String },
    location: { required: true, type: String },
    contact_email: { required: true, type: String },
    new_project_public: { required: true, type: Boolean, default: true },
    maintenance_mode: { required: true, type: Boolean, default: false },
    password: {required: true, type: String },
  },
  { timestamps: true }
)
export const Setting = models.Setting || model<ISettingModel>("Setting", SettingSchema)