import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ShopHero from "@/components/shop/ShopHero"
import { getShop } from "@/lib/services/shops"

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const shop = await getShop(id)
  return shop ? { title: `${shop.name} | Next Salon`, description: shop.description } : { title: "店舗が見つかりません | Next Salon" }
}

export default async function ShopDetailPage({ params }: Props) {
  const { id } = await params
  const shop = await getShop(id)
  if (!shop) notFound()
  return <ShopHero shop={shop} />
}
