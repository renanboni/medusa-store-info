import { Button } from "@medusajs/ui"

type EditorButtonProps = {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    children: React.ReactNode
    [key: string]: any
}

const EditorButton = ({ onClick, children, ...props }: EditorButtonProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        onClick(e)
    }

    return (
        <Button
            variant="transparent"
            size="small"
            onClick={handleClick}
            {...props}
        >
            {children}
        </Button>
    )
}

export default EditorButton