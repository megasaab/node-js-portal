import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, required: true},
    activationLink: {type: String}
})

export const userModel = model('User', UserSchema);