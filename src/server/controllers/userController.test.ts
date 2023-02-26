import { type Request, type Response, type NextFunction } from "express";
import { CustomError } from "../../CustomError";
import User from "../../database/models/User";
import { type UserCredentials } from "../types";
import { loginUser } from "./userController";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req: Partial<
  Request<Record<string, unknown>, Record<string, unknown>, UserCredentials>
> = {
  body: { password: "", username: "" },
};

const next = jest.fn() as NextFunction;

beforeEach(() => jest.clearAllMocks());

describe("Given a loginUser controller", () => {
  const mockUser: UserCredentials = {
    username: "raul",
    password: "raulin1992",
  };

  describe("When it receives a request with a username 'raul' and password 'raulin1992' and the user is not registered in the database", () => {
    test("Then it should call its next method with a status 401 and the messages 'Wrong username' and 'Wrong credentials'", async () => {
      const expectedError = new CustomError(
        "Wrong credentials",
        401,
        "Wrong credentials"
      );
      req.body = mockUser;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(undefined),
      }));

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
