import { getCurrentUser } from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import { prisma } from '@/libs/prismadb'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { productId } = await req.json()

  // varsa sil, yoxdursa əlavə et
  const existing = await prisma.wishlistItem.findFirst({
    where: { productId, wishlist: { userId: user.id } }
  })

  if (existing) {
    await prisma.wishlistItem.delete({ where: { id: existing.id } })
    return NextResponse.json({ message: 'Removed from wishlist' })
  }

  // əgər user-in wishlist-i yoxdursa, yarat
  let wishlist = await prisma.wishlist.findFirst({ where: { userId: user.id } })
  if (!wishlist) {
    wishlist = await prisma.wishlist.create({
      data: { userId: user.id }
    })
  }

  await prisma.wishlistItem.create({
    data: {
      wishlistId: wishlist.id,
      productId
    }
  })

  return NextResponse.json({ message: 'Added to wishlist' })
}
