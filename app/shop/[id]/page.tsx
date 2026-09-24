import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ShopHero from "@/components/shop/ShopHero"
import ShopMenuList from "@/components/shop/ShopMenuList"
import ShopStaffList from "@/components/shop/ShopStaffList"
import { getShop, getMenus, getStaff } from "@/lib/services/shops"

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
  const [menus, staff] = await Promise.all([getMenus(id), getStaff(id)])
  return (
    <div className="space-y-6">
      <ShopHero shop={shop} />
      <section>
        <h2 className="mb-4 text-2xl font-semibold">メニュー</h2>
        <ShopMenuList menus={menus} />
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-semibold">スタッフ</h2>
        <ShopStaffList staff={staff} />
      </section>
    </div>
  )
}
