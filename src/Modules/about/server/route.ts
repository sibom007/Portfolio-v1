import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const { description, image, gitLink, discordUsername, WhatsAppNumber } = await request.json();

        // Validation
        if (!description || !image || !gitLink || !discordUsername || !WhatsAppNumber) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Create the about
        const about = await prisma.about.create({
            data: {
                description,
                image,
                gitLink,
                discordUsername,
                WhatsAppNumber,
            },
        });

        return NextResponse.json({ message: "About created successfully", about }, { status: 201 });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json({ error: "Failed to create about" }, { status: 500 });
    }
}


export async function GET() {
    try {
        const abouts = await prisma.about.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(abouts, { status: 200 });
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ error: "Failed to fetch abouts" }, { status: 500 });
    }
}




export async function PUT(request: Request) {
    try {
        const { id, description, image, gitLink, discordUsername, WhatsAppNumber } = await request.json();

        // Validate ID
        if (!id) {
            return NextResponse.json({ error: "About ID is required" }, { status: 400 });
        }

        // Validate all fields
        if (!description || !image || !gitLink || !discordUsername || !WhatsAppNumber) {
            return NextResponse.json({ error: "All fields are required for PUT request" }, { status: 400 });
        }

        // Update the about
        const about = await prisma.about.update({
            where: { id },
            data: {
                description,
                image,
                gitLink,
                discordUsername,
                WhatsAppNumber,
            },
        });

        return NextResponse.json({ message: "About updated successfully", about }, { status: 200 });
    } catch (error) {
        console.error("PUT Error:", error);
        return NextResponse.json({ error: "Failed to update about" }, { status: 500 });
    }
}


export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "About ID is required" }, { status: 400 });
        }

        await prisma.about.delete({
            where: { id },
        });

        return NextResponse.json({ message: "About deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ error: "Failed to delete about" }, { status: 500 });
    }
}

