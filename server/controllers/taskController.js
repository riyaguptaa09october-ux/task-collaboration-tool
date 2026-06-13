const Task = require("../models/Task");

// =========================
// GET ALL TASKS
// =========================
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =========================
// CREATE TASK
// =========================
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      createdBy: req.user.id,
    });

    // 🔥 SOCKET EVENT
    const io = req.app.get("io");
    io.emit("taskUpdated");

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =========================
// UPDATE TASK
// =========================
exports.updateTask = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // 🔥 SOCKET EVENT
    const io = req.app.get("io");
    io.emit("taskUpdated");

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =========================
// DELETE TASK
// =========================
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    // 🔥 SOCKET EVENT
    const io = req.app.get("io");
    io.emit("taskUpdated");

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};