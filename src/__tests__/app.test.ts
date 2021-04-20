import { Application } from "express";
import request, { Response } from "supertest";
import createServer from "../app";

const app: Application = createServer();

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
