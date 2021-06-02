import request, { Response } from "supertest";
import createServer from "../app";
import {Server} from "net";

const app: Server = createServer();

describe("App created successfully", () => {
    test("Response should be OK and 'pong'", done => {
        request(app).get("/ping")
            .then((response: Response) => {
                expect(response.status).toBe(200);
                expect(response.text).toBe("pong");
                done();
            })
    })
});
