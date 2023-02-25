import express, { type Request, type Response } from "express";
import morgan from "morgan";

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

export default app;
