import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      unique: true,
      index: true, // Indexing for faster search
    },

    description: {
      type: String,
      default: "No description",
    },

    dueDate: {
      type: Date,
      default: Date.now(),
      index: true, // Indexing dueDate to optimize queries by deadline
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true, // Useful for filtering tasks by status
    },

    completed: {
      type: Boolean,
      default: false,
      index: true, // Indexing for quick lookup of completed tasks
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
      index: true, // Helps with priority-based filtering
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      index: true, // Indexing to speed up user-based queries
    },
  },
  { timestamps: true }
);

// Creating a compound index for optimized queries
TaskSchema.index({ user: 1, status: 1, dueDate: 1 });

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
