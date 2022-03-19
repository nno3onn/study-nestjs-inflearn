import * as express from "express";
import catsRouter from "./cats/cats.route";

/** 싱글톤 패턴
 * - 하나의 인스턴스만을 찍어내고 사용하는
 * - 장점
 *    1. 메모리 효율
 *    2. 도메인 또는 프로그램에서 인스턴스가 절대적으로 한 개만 존재한다는 것을 보증 받음
 * - NestJS에서는 컨트롤러, 서비스 등 레이어가 딱 한 번 인스턴스를 만들어 사용되는 것을 보증받도록 함*/

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use("/cats", catsRouter);
  }

  private setMiddleware() {
    //* logging middleware
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.log(req.rawHeaders[1]);
        console.log("this is logging middleware");
        next();
      }
    );

    //* JSON middleware
    this.app.use(express.json()); // for req.body

    this.setRoute();

    //* 404 middleware
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.log("this is error middleware");
        res.send({ error: "404 not found error" });
      }
    );
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(8000, () => {
      console.log(`server is on ...`);
    });
  }
}

const init = () => {
  const server = new Server();
  server.listen();
};

init();
