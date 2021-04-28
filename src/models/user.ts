import { Document, Model, model, Types, Schema, Query } from "mongoose"

const UserSchema = new Schema<UserDocument, UserModel>({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: false,
        default: true
    }
});


export interface User {
    username: string,
    password: string,
    active: boolean
}

interface UserBaseDocument extends User, Document {

}

export interface UserDocument extends UserBaseDocument {

}

export interface UserModel extends Model<UserDocument> {

}

export default model<UserDocument, UserModel>("User", UserSchema);
