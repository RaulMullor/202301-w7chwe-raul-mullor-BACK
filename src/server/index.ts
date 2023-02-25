import express, { type Request, type Response } from "express";
import morgan from "morgan";
import {
  notFoundError,
  generalError,
} from "./middlewares/errorMiddleware/errorMiddlewares";

const app = express();

const getOk = (req: Request, res: Response) => {
  res.status(200).json({
    name: "ok",
  });
};

app.disable("x-powered-by");

app.use(express.json());
app.use(morgan("dev"));
app.use("/", getOk);

app.use(notFoundError);
app.use(generalError);

export default app;
