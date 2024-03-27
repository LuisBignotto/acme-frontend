import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
         default: "bg-blue-900 text-white hover:bg-blue-800 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800",
         destructive:
           "bg-red-500 text-white hover:bg-red-600 dark:bg-red-900 dark:text-white dark:hover:bg-red-800",
         outline:
           "border border-blue-800 bg-white hover:bg-blue-100 hover:text-white dark:border-blue-800 dark:bg-blue-950 dark:hover:bg-blue-800 dark:hover:text-white",
         secondary:
           "bg-blue-800 text-white hover:bg-blue-700 dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700",
         ghost: "text-white border-none",
         link: "text-white underline-offset-4 hover:underline dark:text-white",
      },
      size: {
         default: "h-10 px-4 py-2",
         sm: "h-9 rounded-md px-3",
         lg: "h-11 rounded-md px-8",
         icon: "h-10 w-10",
      },
     },
     defaultVariants: {
      variant: "default",
      size: "default",
     },        
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
