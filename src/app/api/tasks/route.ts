import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDb";
import Task from "@/lib/models/Task";

export async function GET() {
  try {
    await connectDB();
    const tasks = await Task.find();
    return NextResponse.json({ status: 200, success: true, data: tasks });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, priority, status, userId } = await req.json();
    await connectDB();
    const task = await Task.create({
      name,
      description,
      priority,
      status,
      userId,
    });
    return NextResponse.json({
      status: 201,
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
