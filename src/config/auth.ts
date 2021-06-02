import {Request} from "express";

export const options = {
    secret: "secret",
    algorithms: ["HS256"],
    getToken: function fromCookie (req: Request) {
        if (req.session && req.session.authorization) {
            return req.session.authorization.split(" ")[1];
        }
        return null;
    }
};
