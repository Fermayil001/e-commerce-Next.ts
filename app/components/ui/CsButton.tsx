
interface CsButtonProps {
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
    size?: "small" | "medium" | "large";
}

const CsButton = ({
    text,
    onClick,
    disabled,
    className,
    type,
    variant,
    size,
}: CsButtonProps) => {
    return (
        <button
            className={`${className} cstransition font-medium rounded-md cursor-pointer ${variant === "primary" ? "bg-csblack hover:bg-csblack/90 text-cswhite font-bold" : "hover:bg-accent text-csblack font-bold border border-csborder"} ${size === "small" ? "h-8 px-3 text-sm" : size === "medium" ? "py-2 px-4" : "py-3 px-6"}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {text}
        </button>
    )
}

export default CsButton