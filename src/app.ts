import express, {Application, Request, Response, NextFunction} from "express";

export default function createServer() {
    const app: Application = express();

    app.get("/ping", (req: Request, res: Response, next: NextFunction) => {
        res.send("pong");
    });

    return app;
}
