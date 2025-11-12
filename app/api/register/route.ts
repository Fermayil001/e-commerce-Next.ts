import bcrypt from 'bcrypt';
import { prisma } from "../../../libs/prismadb"
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, surname, password } = body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                // surname,
                hashedPassword,
            },
        });
        return NextResponse.json(user);
    } catch (error: any) {
        return new NextResponse("Xəta baş verdi", { status: 500 });
    }
}