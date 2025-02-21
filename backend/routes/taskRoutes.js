import express from "express";
const router = express.Router();
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
router.route("/").get(getTasks).post(createTask); //Ensure POST route exists
router.route("/:id").put(updateTask).delete(deleteTask);
export default router;