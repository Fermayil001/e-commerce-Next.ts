import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || id.trim() === "") {
        return NextResponse.json(
            { error: "ID is required" },
            { status: 400 }
        );
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}


export async function PUT(req: Request, context: { params: { id: string } }) {
    const params = await context.params;
    const id = params.id;

    if (!id) {
        return NextResponse.json(
            { error: "ID is required" },
            { status: 400 }
        );
    }

    const body = await req.json();
    const { name, phone } = body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const updateData: any = {};

        if (name !== undefined) updateData.name = name;
        if (phone !== undefined && phone !== null) updateData.phone = phone;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json(
                { error: "Phone number already exists" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}