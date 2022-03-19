import { Request, Response, Router } from "express";
import { Cat, CatType } from "./cats.model";

const router = Router();

//* READ 고양이 전체 데이터 조회 api -> GET
router.get("/", (req: Request, res: Response) => {
  try {
    const cats = Cat;
    // throw new Error("db connect error");
    res.status(200).send({
      success: true,
      data: { cats },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
});

//* READ 특정 고양이 데이터 조회 api -> GET
// : (동적 라우팅)
router.get("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cats = Cat.find((cat) => cat.id === id);
    // throw new Error("db connect error");
    res.status(200).send({
      success: true,
      data: { cats },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

//* CREATE 새로운 고양이 추가 api -> POST
router.post("/", (req: Request, res: Response) => {
  try {
    const data = req.body;
    Cat.push(data);
    res.status(200).send({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

//* UPDATE 고양이 데이터 업데이트 api -> PUT
router.put("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    let result;

    Cat.forEach((cat) => {
      if (cat.id === id) {
        cat = data;
        result = cat;
      }
    });
    res.status(200).send({
      success: true,
      data: { cat: result },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

//* UPDATE 고양이 데이터 부분적으로 업데이트 api -> PATCH
router.patch("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    let result;

    Cat.forEach((cat) => {
      if (cat.id === id) {
        cat = { ...cat, ...data };
        result = cat;
      }
    });
    res.status(200).send({
      success: true,
      data: { cat: result },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

//* DELETE 고양이 데이터 삭제 -> DELETE
router.delete("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newCat = Cat.filter((cat) => cat.id !== id);
    res.status(200).send({
      success: true,
      data: newCat,
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

export default router;
