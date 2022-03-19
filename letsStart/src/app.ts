import * as express from "express";

const app: express.Express = express();

const port: number = 3000;

// router
app.get("/test", (req: express.Request, res: express.Response) => {
  console.log(req);
  res.send({ name: "heo da eun", age: 99, friends: ["1", "ss", "hi", "bb"] });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
