import { Schema, model, models } from "mongoose"

export interface IArtModel {
  title: string;
  short_description: string;
  thumbnail: string;
  ref_link: string;
  password: string;
  categories: Schema.Types.ObjectId[];
  content: string;
  viewed: number;
  is_public: boolean;
}

const ArtSchema = new Schema<IArtModel> (
  {
    title: { required: true, type: String },
    short_description: {required: true, type: String},
    thumbnail: {required: true, type: String}, 
    ref_link: {required: false, type: String},
    password: {required: false, type: String},
    categories: {required: true, type: [Schema.Types.ObjectId], ref: "Category"},
    content: {required: true, type: String}, 
    viewed: {required: false, type: Number, default: 0},
    is_public: {required: true, type: Boolean, default: true}
  },
  { timestamps: true }
)

export const Art =
  models.Art || model<IArtModel>("Art", ArtSchema)
