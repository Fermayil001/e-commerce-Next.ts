import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismadb";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const deleted = await prisma.category.delete({ where: { id } });
        return NextResponse.json({ message: "Category deleted", category: deleted });
    } catch (error: any) {
        console.error("DELETE /api/categories/[id] error:", error);
        return NextResponse.json({ error: error?.message || "Failed to delete category" }, { status: 500 });
    }
}
