import mongoose, {Connection} from "mongoose";
import UserModel, {User} from "../models/user";

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

export async function deleteUserById(id: string) {
    await UserModel.findByIdAndDelete(id);
}

export async function updateUser(user: User) {
    await UserModel.findByIdAndUpdate(user._id, user);
}

export async function activateDeactivateUser(id: string): Promise<User> {
    const user = await UserModel.findById(id);
    if (!user) throw new Error(`User id: ${id} doesn't exists`);

    user.active = !user.active;
    await user.save();

    return user;
}

interface UserToSearch {
    username?: string,
    password?: string
}
