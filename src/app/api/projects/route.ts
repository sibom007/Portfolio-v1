import { z } from "zod";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { EditProjectSchema, CreateProjectSchema } from "@/Types";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = CreateProjectSchema.parse(body);
    
    // Guard Clause: Secure Password Check
    if (payload.password !== process.env.CREATE_PASSWORD) {
      return NextResponse.json(
        {
          error: "Unauthorized: The project creation password does not match.",
        },
        { status: 401 },
      );
    }
    
    // Persist to Database (Excluding the password field since it isn't in the DB schema)
    const newProject = await db.projects.create({
      data: {
        name: payload.name,
        description: payload.description,
        status: payload.status,
        repo: payload.repo,
        liveLink: payload.liveLink ?? "",
        imageUrl: payload.imageUrl ?? "",
        gitFrontendLink: payload.gitFrontendLink ?? "",
        gitBackendLink: payload.gitBackendLink ?? null,
      },
    });
    
    return NextResponse.json(
      { message: "Project created successfully!", project: newProject },
      { status: 201 },
    );
  } catch (error) {
    // Catch-all structural verification block for Zod validation errors
    console.log("🚀 ~ POST ~ error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred while saving your project." },
      { status: 500 },
    );
  }
}


export async function GET() {
  try {
    // Fetch all records cleanly without filters, sorted newest first
    const projects = await db.projects.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(
      { count: projects.length, projects },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ [PROJECTS_GET_ERROR]:", error);
    return NextResponse.json(
      { error: "An internal server error occurred while retrieving projects." },
      { status: 500 },
    );
  }
}


export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Bad Request: Missing project ID parameter." },
        { status: 400 },
      );
    }

    // Verify record existence beforehand
    const structuralCheck = await db.projects.findUnique({
      where: { id },
    });

    if (!structuralCheck) {
      return NextResponse.json(
        { error: "Not Found: The target project could not be found." },
        { status: 404 },
      );
    }

    // Validate request payload mapping to Zod
    const validatedPayload = EditProjectSchema.parse(updateData);

    const updatedProject = await db.projects.update({
      where: { id },
      data: validatedPayload,
    });

    return NextResponse.json(
      {
        message: "Project configuration updated successfully!",
        project: updatedProject,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "An explicit internal error blocked updating this record." },
      { status: 500 },
    );
  }
}


export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Bad Request: A valid project ID is required." },
        { status: 400 },
      );
    }

    // Check if item exists to avoid Prisma throwing unhandled 500 errors on missing records
    const checkTarget = await db.projects.findUnique({ where: { id } });
    if (!checkTarget) {
      return NextResponse.json(
        {
          error: "Not Found: The project targeted for deletion does not exist.",
        },
        { status: 404 },
      );
    }

    await db.projects.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "The project was successfully erased from records." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Could not execute data removal pipeline safely." },
      { status: 500 },
    );
  }
}
