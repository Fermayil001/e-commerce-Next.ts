import { prisma } from "@/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    const body = await req.json();
    const { userId, oldPassword, newPassword } = body;

    if (!userId || !oldPassword || !newPassword) {
        return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 }
        );
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
        );
    }

    const isCorrect = await bcrypt.compare(oldPassword, user.hashedPassword ?? "");

    if (!isCorrect) {
        return NextResponse.json(
            { error: "Old password is incorrect" },
            { status: 401 }
        );
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: userId },
        data: { hashedPassword: hashed },
    });

    return NextResponse.json({
        message: "Password updated successfully",
    });
}
