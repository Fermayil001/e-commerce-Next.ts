import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json(null);
    }

    const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    return NextResponse.json(currentUser);
}
