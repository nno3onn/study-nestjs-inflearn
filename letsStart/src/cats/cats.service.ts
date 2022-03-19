/** 서비스 패턴
 * - router에 있는 business logic을 분리
 * - 유지보수, 가독성 높임
 */

import { Request, Response } from "express";
import { Cat, CatType } from "./cats.model";

//* READ 고양이 전체 데이터 조회 api -> GET
export const readAllCat = (req: Request, res: Response) => {
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
};

//* READ 특정 고양이 데이터 조회 api -> GET
// : (동적 라우팅)
export const readCat = (req: Request, res: Response) => {
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
};

//* CREATE 새로운 고양이 추가 api -> POST
export const createCat = (req: Request, res: Response) => {
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
};

//* UPDATE 고양이 데이터 업데이트 api -> PUT
export const updateCat = (req: Request, res: Response) => {
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
};

//* UPDATE 고양이 데이터 부분적으로 업데이트 api -> PATCH
export const updatePartialCat = (req: Request, res: Response) => {
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
};

//* DELETE 고양이 데이터 삭제 -> DELETE
export const deleteCat = (req: Request, res: Response) => {
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
};
