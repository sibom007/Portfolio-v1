import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const olddata = await prisma.projects.findFirst({
      where: {
        name: body.name,
      },
    });

    if (olddata) {
      return NextResponse.json(
        { status: "false", message: "project already exists! " },
        { status: 400 }
      );
    }
    const result = await prisma.projects.create({
      data: {
        name: body.name,
        driscaption: body.driscaption,
        technologies: body.technologies,
        img: body.img,
        githubClient: body.githubClient,
        githubServer: body.githubServer,
        Live: body.Live,
        type: body.type,
      },
    });

    return NextResponse.json(
      { status: "true", message: "project created Successfully ! ", result },
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse("Internal Error", { status: 400 });
  }
};
export const GET = async () => {
  try {
    const result = await prisma.projects.findMany();
    return NextResponse.json(
      { status: "true", message: "projects Fetched Successfully ! ", result },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Internal Error", { status: 400 });
  }
};
