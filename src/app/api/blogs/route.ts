import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const olddata = await prisma.blogs.findFirst({
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
    const result = await prisma.blogs.create({
      data: {
        name: body.name,
        driscaption: body.driscaption,
        date: body.date,
        img: body.img,
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
    const result = await prisma.blogs.findMany();
    return NextResponse.json(
      { status: "true", message: "blogs Fetched Successfully ! ", result },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Internal Error", { status: 400 });
  }
};
