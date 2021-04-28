import {Router, Request, Response, NextFunction } from "express";
import * as UserService from "../services/userService";

const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
   const users = await UserService.findAll();
   return res.send(users);
});

export default userRouter;
