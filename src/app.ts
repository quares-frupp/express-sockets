import express, {Application, Request, Response, NextFunction} from "express";
import routes from "./routes/routes";

export default function createServer() {
    const app: Application = express();

    app.get("/ping", (req: Request, res: Response, next: NextFunction) => {
        res.send("pong");
    });

    app.use(routes);

    return app;
}
