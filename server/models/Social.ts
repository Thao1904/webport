import { Schema, models, model} from "mongoose"

export interface ISocialModel { 
    platform: string
    label: string
    link: string
    icon: string
    status: boolean

}

const SocialSchema = new Schema<ISocialModel>(
    {
        platform: {required: true, type: String, unique: true},
        label: {required: true, type: String},
        link: {required: true, type: String}, 
        icon: {required: true, type: String}, 
        status: {required: true, type : Boolean, default: true}
    }, 
    { timestamps: true}
)
export const Social = models.Social || model<ISocialModel>("Social", SocialSchema)
