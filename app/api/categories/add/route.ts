import { NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const name = body?.name;

        if (!name || typeof name !== "string") {
            return NextResponse.json({ error: "'name' is required" }, { status: 400 });
        }

        const existing = await prisma.category.findUnique({ where: { name } });
        if (existing) {
            return NextResponse.json({ error: "Category already exists" }, { status: 409 });
        }

        const category = await prisma.category.create({ data: { name } });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error("POST /api/categories error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}