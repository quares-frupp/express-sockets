import createServer from "../../app";
import request, {Response} from "supertest";
import {Server} from "net";

import {findAll} from "../../services/userService";

const app: Server = createServer();

jest.mock("../../services/userService", () => ({
    ...(jest.requireActual("../../services/userService")),
    findAll: jest.fn()
}));

describe("Users endpoint", () => {
    let users: any;
    beforeAll((done) => {
        users = [{
            username: "user",
            password: "password",
            active: true,
            firstName: "name",
            lastName: "lastName"
        }];

        done();
    });

    test("Response should be OK and same as users'", done => {
        // @ts-ignore
        findAll.mockReturnValue(users);
        request(app).get("/users")
            .then((response: Response) => {
                expect(response.status).toBe(200);
                expect(response.body).toStrictEqual(users);
                done();
            })
    })
});
