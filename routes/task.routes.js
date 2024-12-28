const express = require("express");
const router = express.Router();
const {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/", protect, getTasks);

router.post("/", protect, setTask);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

module.exports = router;
