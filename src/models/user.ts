import { Document, Model, model, Types, Schema, Query } from "mongoose"

const UserSchema = new Schema<User, UserModel>({
    _id: {
        type: Types.ObjectId,
        required: true,
        unique: true
    },
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
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});


export interface User extends Document {
    username: string,
    password: string,
    active: boolean,
    firstName: string,
    lastName: string
}

export interface UserModel extends Model<User> {

}

export default model<User, UserModel>("User", UserSchema);
