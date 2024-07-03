import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const olddata = await prisma.skills.findFirst({
      where: {
        name: body.name,
      },
    });

    if (olddata) {
      return NextResponse.json(
        { status: "false", message: "Skill already exists! " },
        { status: 400 }
      );
    }
    const result = await prisma.skills.create({
      data: {
        name: body.name,
        percentage: body.percentage,
        icon: body.icon,
      },
    });
    return NextResponse.json(
      { status: "true", message: "Skill created Successfully ! ", result },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 400 });
  }
};
export const GET = async () => {
  try {
    const result = await prisma.skills.findMany();
    return NextResponse.json(
      { status: "true", message: "Skills Fetched Successfully ! ", result },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 400 });
  }
};
