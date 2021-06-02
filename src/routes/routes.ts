import {Request, Response, Router} from 'express';
import jwt from "express-jwt";
import * as auth from "../config/auth";
import {findAll, findUser} from "../services/userService";
import jwtSign from "jsonwebtoken";

const path = require("path");
const routes = Router();

routes.get("/", jwt(auth.options), (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../static", "index.html"));
});

routes.get("/login", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../static", "login.html"));
});

routes.post("/login", async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await findUser(username, password);

    if (!user) res.redirect("/login");

    const token = jwtSign.sign({
            username: username,
            password: password
        },
        auth.options.secret,
        {
            algorithm: "HS256"
        });

    if (req.session) {
        req.session.authorization = "Bearer " + token;
    }
    res.redirect("/");

});

routes.get("/users", async (req: Request, res: Response) => {
    const users = await findAll();
    return res.json(users);
});

export default routes;
