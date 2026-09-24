
type SelectableCardProps = {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export default function SelectableCard({ selected, onClick, children, className = "" }: SelectableCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${selected ? "rounded-xl border border-rose-500 bg-rose-500 p-4 text-left text-white" : "rounded-xl border border-slate-300 p-4 text-left"} ${className}`}
    >
      {children}
    </button>
  )
}
