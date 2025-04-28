import prisma from "@/utils/prisma";
import { projectRepo } from "@prisma/client";
import { NextResponse } from "next/server";


// Example server function
export async function POST(request: Request) {
    const { name, description, status, repo, url, liveLink, gitFrontend, gitBackend } = await request.json();
    const project = {
        name,
        description,
        status,
        repo,
        url,
        liveLink,
        gitFrontend,
        gitBackend,
    };

    // Validation
    if (!name || !description || !status || !repo || !url || !liveLink || !gitFrontend || !gitBackend) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create the project
    await prisma.projects.create({
        data: project,
    });


    return NextResponse.json({ message: "Project created successfully!" });
}



export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const repoType = searchParams.get("repo") as projectRepo | null;

    try {
        const whereCondition = repoType
            ? { repo: repoType }
            : {};

        const projects = await prisma.projects.findMany({
            where: whereCondition,
            orderBy: {
                updatedAt: "desc", // newest first
            },
        });

        return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}


export async function PUT(request: Request) {
    try {
        const { id, name, description, status, repo, url, liveLink, gitFrontend, gitBackend } = await request.json();

        // Validation
        if (!id || !name || !description || !status || !repo || !url || !liveLink || !gitFrontend || !gitBackend) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Update the project
        const updatedProject = await prisma.projects.update({
            where: { id },
            data: {
                name,
                description,
                status,
                repo,
                url,
                liveLink,
                gitFrontend,
                gitBackend,
            },
        });

        return NextResponse.json({ message: "Project updated successfully!", project: updatedProject });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}


export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
        }

        await prisma.projects.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Project deleted successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}

