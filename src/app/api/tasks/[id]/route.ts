import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDb";
import Task from "@/lib/models/Task";
import mongoose from "mongoose";

interface UpdateTaskData {
  name?: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  status?: "todo" | "in-progress" | "done" | "cancelled";
  userId?: string;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid task ID",
      });
    }

    const updateData: UpdateTaskData = await req.json();

    await connectDB();

    const task = await Task.findById(id);
    if (!task) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Task not found",
      });
    }

    // Update only provided fields
    if (updateData.name) task.name = updateData.name;
    if (updateData.description) task.description = updateData.description;
    if (updateData.priority) task.priority = updateData.priority;
    if (updateData.status) task.status = updateData.status;
    if (updateData.userId) {
      if (!mongoose.Types.ObjectId.isValid(updateData.userId)) {
        return NextResponse.json({
          status: 400,
          success: false,
          message: "Invalid user ID",
        });
      }
      task.userId = new mongoose.Types.ObjectId(updateData.userId);
    }

    const updatedTask = await task.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid task ID",
      });
    }

    await connectDB();

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Task not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
