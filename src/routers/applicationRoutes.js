import { Router } from "express";
import { addApplication, allApplication, deleteApplication, getApplication, updateApplication, updateApplicationStatus } from "../controllers/applicationController.js";
import { isLogin } from "../middleware/authMiddleware.js";

export const applicationRouter = Router();

applicationRouter.post("/add", isLogin, addApplication);
applicationRouter.put("/update/:id", isLogin, updateApplication);
applicationRouter.delete("/delete/:id", isLogin, deleteApplication);
applicationRouter.get("/get/:id", isLogin, getApplication);
applicationRouter.get("/all", isLogin, allApplication);
applicationRouter.patch("/status/:id", isLogin, updateApplicationStatus);





