import { Router } from "express";
import {
  createCat,
  deleteCat,
  readAllCat,
  readCat,
  updateCat,
  updatePartialCat,
} from "./cats.service";

const router = Router();

router.get("/", readAllCat);
router.get("/:id", readCat);
router.post("/", createCat);
router.put("/:id", updateCat);
router.patch("/:id", updatePartialCat);
router.delete("/:id", deleteCat);

export default router;
