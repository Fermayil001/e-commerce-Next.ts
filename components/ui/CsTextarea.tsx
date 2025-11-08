import * as React from 'react'

function CsTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
    return (
        <textarea
            data-slot="textarea"
            className={`placeholder:text-csgray
        selection:bg-csgray
        text-csblack
        border-csborder
        min-h-16 w-full
        rounded-md
        border bg-transparent
        px-3 py-1
        text-base md:text-sm
        shadow-xs
        transition-all
        outline-none
        focus:border-ring
        focus-visible:ring-ring/50
        focus-visible:ring-2 ${className || ''}`}
            {...props}
        />
    )
}

export { CsTextarea }
