import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prismadb'
import { getCurrentUser } from '@/app/actions/getCurrentUser'

export async function GET() {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const wishlist = await prisma.wishlistItem.findMany({
        where: { wishlist: { userId: user.id } },
        include: { wishlist: true } // məhsul məlumatını da gətir
    })

    return NextResponse.json(wishlist)
}
