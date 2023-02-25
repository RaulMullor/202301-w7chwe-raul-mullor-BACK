import "./loadEnvironment.js";
import chalk from "chalk";
import createDebug from "debug";
import startServer from "./server/startServer.js";
import connectDatabase from "./database/connectDatabase.js";

export const debug = createDebug("server");
const port = process.env.PORT ?? 4000;
const mongoUrl = process.env.MONGODB_CONNECTION_URL!;

try {
  await startServer(+port);
  debug(chalk.bgGreen(`Start with server 'http://localhost:${port}'`));

  await connectDatabase(mongoUrl);
  debug(chalk.bgGreen("Connect to database"));
} catch (error) {
  debug(chalk.bgRed(error.message));
}
