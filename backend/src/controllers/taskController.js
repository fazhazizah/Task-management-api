const Task = require('../models/Task');
const ResponseAPI = require('../utils/response');

const taskController = {
    async createTask(req, res) {
        try {
            const task = await Task.create({
                ...req.body,
                userId: req.user._id
            });

            ResponseAPI.success(res, task, 'Task created successfully', 201);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async getUserTasks(req, res) {
        try {
            const tasks = await Task.find({ userId: req.user._id });
            ResponseAPI.success(res, tasks);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async updateTaskStatus(req, res) {
        try {
            const task = await Task.findOne({
                _id: req.params.id,
                userId: req.user._id
            });

            if (!task) {
                return ResponseAPI.notFound(res, 'Task not found');
            }

            task.isDone = true;
            await task.save();

            ResponseAPI.success(res, task);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async deleteTask(req, res) {
        try {
            const task = await Task.findOneAndDelete({
                _id: req.params.id,
                userId: req.user._id
            });

            if (!task) {
                return ResponseAPI.notFound(res, 'Task not found');
            }

            ResponseAPI.success(res, null, 'Task deleted successfully');
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    }
};

module.exports = taskController;