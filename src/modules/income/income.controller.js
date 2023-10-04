import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createIncome, getIncomesByUser } from "./income.service.js";

const incomeRouter = Router();

incomeRouter.get("/incomes", authMiddleware, async (req, res) => {
  try {
    const response = await getIncomesByUser(req.user.id);
    return res.send(response.data).status(response.statusCode);
  } catch (error) {
    console.log("err", error);
    if (error?.statusCode === 400)
      res.send({ message: error.message }).status(error.statusCode);
    else {
      console.log(error);
      res
        .send({
          message: "Erro interno de sevidor! Por favor, consulte o suporte! ",
        })
        .status(500);
    }
  }
});

incomeRouter.post("/incomes/add", authMiddleware, async (req, res) => {
  try {
    const response = await createIncome(req.body);
    return res.send(response.message).status(response.statusCode);
  } catch (error) {
    console.log("err", error);
    if (error?.statusCode === 400)
      res.send({ message: error.message }).status(error.statusCode);
    else {
      console.log(error);
      res
        .send({
          message: "Erro interno de sevidor! Por favor, consulte o suporte! ",
        })
        .status(500);
    }
  }
})

export { incomeRouter };