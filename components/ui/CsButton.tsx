'use client'
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface CsButtonProps {
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
    size?: "small" | "medium" | "large";
    children?: ReactNode;
    href?: string;
}

const CsButton = ({
    text,
    onClick,
    disabled,
    className,
    type,
    variant,
    size,
    children,
    href
}: CsButtonProps) => {

    const router = useRouter();

    return (
        <button
            className={`${className} cstransition font-medium rounded-md cursor-pointer flex items-center justify-center
            ${variant === "primary" ? "bg-csblack hover:bg-csblack/90 text-cswhite font-bold" : "bg-cswhite hover:bg-accent text-csblack font-bold border border-csborder"} 
            ${size === "small" ? "h-8 px-3 text-sm" : size === "medium" ? "h-9 px-4 py-3" : "h-10 px-6"}`}
            // onClick={onClick}
            disabled={disabled}
            type={type}
            onClick={() => href ? router.push(href) : onClick && onClick()}
        >
            {children}
            {text}
        </button>
    )
}

export default CsButton