import cron from "node-cron";
import User from "../models/User.js";
import Task from "../models/Task.js";
import { sendEmail } from "../utils/emailService.js";

/**
 * Schedule email sending at 9 AM daily
 */
cron.schedule("0 11 * * *", async() => {
    console.log(" Running daily task email scheduler...");

    try {
        // Get all users
        const users = await User.find();

        for (const user of users) {
            // Get pending tasks for each user
            const pendingTasks = await Task.find({ user: user._id, completed: false });

            if (pendingTasks.length > 0) {
                // Format task list
                const taskList = pendingTasks.map(task => `• ${task.title}`).join("\n");

                // Email content
                const emailText = `Hello ${user.name},\n\nYou have pending tasks:\n${taskList}\n\nComplete them soon!`;

                // Send email
                await sendEmail(user.email, "Your Pending Tasks Reminder", emailText);
            }
        }

        console.log("Email notifications sent successfully.");
    } catch (error) {
        console.error(" Error sending task emails:", error);
    }
});