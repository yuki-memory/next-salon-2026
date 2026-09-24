import type { Menu } from "@/types/menu"
import SelectableCard from "@/components/booking/SelectableCard"

type MenuStepProps = {
  menus: Menu[]
  selectedMenuId: string | null
  onSelect: (menuId: string) => void
}

export default function MenuStep({ menus, selectedMenuId, onSelect }: MenuStepProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className={"text-lg font-semibold text-slate-950"}>STEP 1: メニューを選ぶ</h3>
      {menus.map((menu) => {
        const selected = selectedMenuId === menu.id
        return (
          <SelectableCard key={menu.id} selected={selected} onClick={() => onSelect(menu.id)}>
            <p>{menu.name}</p>
            <p className={`${selected ? "text-sm text-white/80" : "text-sm text-slate-500"}`}>
              ¥{menu.price.toLocaleString("ja-JP")} / {menu.durationMinutes}min
            </p>
          </SelectableCard>
        )
      })}
    </div>
  )
}
