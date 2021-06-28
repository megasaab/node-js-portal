import { model, Schema } from "mongoose";

const ResumeSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    name    : { type: String, required: true},
    created_at    : { type: Date, required: true, default: Date.now },
    description: {type: String, required: false},
    position: {type: String, required: true}
})

export const resumeModel = model('Resume', ResumeSchema);