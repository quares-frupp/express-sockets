import mongoose, {Connection} from "mongoose";
import UserModel, {User, UserDocument} from "../models/user";

export async function findUser(username: string = "", password: string = "") {
    const connection: Connection = mongoose.connection;
    const userToSearch: UserToSearch = {};

    if (username) userToSearch.username = username
    if (password) userToSearch.password = password

    const user = await UserModel.findOne(userToSearch);
    return user;
}

export async function findAll() {
    const users = await UserModel.find();
    return users;
}

interface UserToSearch {
    username?: string,
    password?: string
}
