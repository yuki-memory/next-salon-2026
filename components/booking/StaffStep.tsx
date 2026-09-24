import type { Staff } from "@/types/staff"
import SelectableCard from "@/components/booking/SelectableCard"

type StaffStepProps = {
  staffs: Staff[]
  selectedStaffId: string | null
  onSelect: (staffId: string | null) => void
}

export default function StaffStep({ staffs, selectedStaffId, onSelect }: StaffStepProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className={"text-lg font-semibold text-slate-950"}>STEP 3: スタッフを選ぶ（任意）</h3>
      <SelectableCard selected={selectedStaffId === null} onClick={() => onSelect(null)}>
        指名なし
      </SelectableCard>
      {staffs.map((staff) => {
        const selected = selectedStaffId === staff.id
        return (
          <SelectableCard key={staff.id} selected={selected} onClick={() => onSelect(staff.id)}>
            <p className="font-medium">{staff.name}</p>
            <p className="py-2 text-xs">{staff.specialty}</p>
          </SelectableCard>
        )
      })}
    </div>
  )
}