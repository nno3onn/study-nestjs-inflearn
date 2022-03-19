import * as express from "express";
import catsRouter from "./cats/cats.route";

const app: express.Express = express();

const port: number = 3000;

//* logging middleware
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.rawHeaders[1]);
    console.log("this is logging middleware");
    next();
  }
);

//* JSON middleware
app.use(express.json()); // for req.body

app.use("/cats", catsRouter);

//* 404 middleware
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("this is error middleware");
    res.send({ error: "404 not found error" });
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
