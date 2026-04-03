import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prismadb";

export async function GET(req: Request) {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories);
    } catch (error: any) {
        console.error("GET /api/categories error:", error);

        const isDbConnectionError =
            error instanceof Prisma.PrismaClientInitializationError ||
            (error instanceof Error && error.message.includes("Error creating a database connection"));

        if (isDbConnectionError) {
            return NextResponse.json([]);
        }

        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
