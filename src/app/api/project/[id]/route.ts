import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const updateData = await request.json();

        // Validation
        if (!id) {
            return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
        }

        // Check if at least one field is being updated
        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ error: "At least one field must be updated" }, { status: 400 });
        }

        // Update the project
        const updatedProject = await prisma.projects.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ message: "Project updated successfully!", project: updatedProject });
    } catch (error) {
        console.error("Update project error:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
} 