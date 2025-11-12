import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";

export async function GET(req: Request) {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories);
    } catch (error: any) {
        console.error("GET /api/categories error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
