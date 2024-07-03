import { Tprops } from "@/Types";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, params: { params: { id: string } }) => {
  const { id } = params.params;

  if (!id) {
    return NextResponse.json(
      { status: "false", message: "No id provided" },
      { status: 400 }
    );
  }

  try {
    const result = await prisma.projects.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { status: "true", message: "projects Fetched Successfully ! ", result },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Internal Error", { status: 400 });
  }
};
