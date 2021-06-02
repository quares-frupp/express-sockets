import { Application } from "express";
import createServer from "./app";
import dotenv from "dotenv";
import connectToDb from "./config/db";
import {Server} from "http";

dotenv.config();

const PORT = process.env.PORT || 8080;
const DB_HOST = process.env.DB_HOST + "";
const DB_DATABASE = process.env.DB_DATABASE + "";

const app: Server = createServer();

export const runApp = async () => {
    await connectToDb(DB_HOST, DB_DATABASE);

    app.listen(PORT);

    console.log(`Now listening on port ${PORT}`);
};

runApp().catch(error => console.error(error));
