import { Schema, model, models } from "mongoose"

export interface IProjectModel {
  title: string
  short_description: string
  content: string
  thumbnail: string
  password: string
  ref_link: string
  categories: Schema.Types.ObjectId[]
  viewed: number
  is_public: boolean
}

const ProjectSchema = new Schema<IProjectModel>(
  {
    title: {required: true, type: String},
    short_description: {required: true, type: String},
    content: {required: true, type: String}, //html => covert string => save to db
    thumbnail: {required: true, type: String}, //upload cloud -> get public_url -> thumbnail = public_url => save to db
    password: {required: false, type: String},
    ref_link: {required: false, type: String},
    categories: {required: true, type: [Schema.Types.ObjectId], ref: "Category"},
    viewed: {required: false, type: Number, default: 0},
    is_public: {required: true, type: Boolean, default: true}
  },
  { timestamps: true }
)

export const Project =
  models.Project || model<IProjectModel>("Project", ProjectSchema)

//url: /projects
// title + short_description + thumbnail

//url: /projects/id or slug (title: "Chay Working" => slug: chay-working )
// title + content + ref_link + thumbnail