import { clx } from "@medusajs/ui"

export type SeparatorProps = {
    orientation: "vertical" | "horizontal"
    className?: string
}

export const Separator = ({ orientation, className }: SeparatorProps) => {
    return <div className={clx("h-6 w-px bg-border", orientation === "vertical" ? "w-px" : "h-px", className)} />
}
