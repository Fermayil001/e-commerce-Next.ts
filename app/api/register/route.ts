import bcrypt from 'bcrypt';
import { prisma } from "../../../libs/prismadb"
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, password } = body;

        if (!email || !password || !name) {
            return NextResponse.json({ error: "Bütün sahələr doldurulmalıdır" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "Bu email artıq istifadə olunur" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        });

        const { hashedPassword: _, ...userData } = user;
        return NextResponse.json(userData, { status: 201 });

    } catch (error: any) {
        console.error(error, 'error');
        return NextResponse.json({ error: "Serverdə xəta baş verdi" }, { status: 500 });
    }
}
