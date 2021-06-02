import express, {Application, Request, Response, NextFunction} from "express";
import routes from "./routes/routes";
import cookieSession from "cookie-session";
import {activateDeactivateUser, deleteUserById, findAll, updateUser} from "./services/userService";
import {User} from "./models/user";
import {Socket} from "socket.io";
const { Server } = require("socket.io");
import * as http from "http";

export default function createServer() {
    const app: Application = express();

    app.get("/ping", (req: Request, res: Response, next: NextFunction) => {
        res.send("pong");
    });

    app.use(express.urlencoded());

    app.use(cookieSession({
        name: 'session',
        keys: ["key"],
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }));

    app.use("/", routes);

    app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
        if (err.name === 'UnauthorizedError') {
            res.redirect("/login");
        }
    });

    app.use(express.static("static"));

    const server = http.createServer(app);
    const io = new Server(server);

    const listUsersHandler = async () => {
        const users = await findAll();
        return users;
    };

    const deleteUserListener = async (id: string) => {
        await deleteUserById(id);
        io.emit("deletedUser", id);
    };

    const updateUserListener = async (user: User) => {
        await updateUser(user);
        io.emit("updatedUser", user);
    };

    const activateDeactivateUserListener = async (id: string) => {
        io.emit("updatedUser", await activateDeactivateUser(id));
    };

    io.on("connection", async (socket: Socket) => {
        console.log(`Socket ${socket.id} connected`);
        socket.emit("listUsers", await listUsersHandler());

        socket.on("deleteUser", async (id: string) => deleteUserListener(id));
        socket.on("updateUser", async (user: User) => updateUserListener(user));
        socket.on("activateDeactivateUser", async (id: string) => activateDeactivateUserListener(id));
    });

    return server;
}
