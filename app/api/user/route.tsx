import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const users = await prisma.user.findMany();

    const safeUsers = users.map(u => {
        const { hashedPassword, ...rest } = u;
        return rest;
    });

    return NextResponse.json(safeUsers);
}
