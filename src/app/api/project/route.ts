import { db } from "@/utils/prisma";
import { NextResponse } from "next/server";
import { projectRepo } from "@prisma/client";
import { EditProjectSchema, CreateProjectSchema, SearchParam } from "@/Types";

// Example server function
export async function POST(request: Request) {
  let body = await request.json();
  try {
    const payload = CreateProjectSchema.parse(body);

    if (payload.password !== process.env.CREATE_PASSWORD!) {
      return NextResponse.json({ message: "Password dose not Match!" });
    }

    // Create the project
    await db.projects.create({
      data: {
        name: payload.name,
        description: payload.description,
        gitBackend: payload.gitBackend,
        gitFrontend: payload.gitFrontend,
        liveLink: payload.liveLink,
        repo: payload.repo,
        imageUrl: payload.imageUrl,
        status: payload.status,
      },
    });

    return NextResponse.json({ message: "Project created successfully!" });
  } catch (error) {
    throw new Error("Failed to create project");
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repoRaw = searchParams.get("repo")?.toUpperCase();

  const repoParam: SearchParam | null =
    repoRaw && ["ALL", "TRENDING", "FRONTEND", "BACKEND"].includes(repoRaw)
      ? (repoRaw as SearchParam)
      : null;

  try {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    let whereCondition = {};

    switch (repoParam) {
      case "FRONTEND":
        whereCondition = { repo: projectRepo.FRONTEND };
        break;

      case "BACKEND":
        whereCondition = { repo: projectRepo.BACKEND };
        break;

      case "TRENDING":
        whereCondition = {
          OR: [
            { createdAt: { gte: tenDaysAgo } },
            { updatedAt: { gte: tenDaysAgo } },
          ],
        };
        break;

      case "ALL":
      case null:
      case undefined:
        whereCondition = {};
        break;

      default:
        return NextResponse.json(
          { error: "Invalid repo type" },
          { status: 400 },
        );
    }

    const projects = await db.projects.findMany({
      where: whereCondition,
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, updateData } = await request.json();

    const exProject = await db.projects.findUnique({
      where: {
        id,
      },
    });

    if (!exProject) {
      return NextResponse.json(
        { error: "Project not found!" },
        { status: 404 },
      );
    }

    const payload = EditProjectSchema.parse(updateData);

    // Update the project
    const updatedProject = await db.projects.update({
      where: { id },
      data: payload,
    });

    return NextResponse.json({
      message: "Project updated successfully!",
      project: updatedProject,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
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
        { error: "Project ID is required" },
        { status: 400 },
      );
    }

    await db.projects.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Project deleted successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
