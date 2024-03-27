import * as React from "react"

import { cn } from "@/lib/utils"
import { type VariantProps, cva } from 'class-variance-authority';

const inputVariants = cva(
  'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300',
  {
    variants: {
      state: {
        default: 'border-zinc-200',
        error: 'border-red-600',
      },
    },
  },
);

export type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputVariants>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, state, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({ state }),
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
