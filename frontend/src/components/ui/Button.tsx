import * as React from "react"
import { cn } from "./Card"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: "bg-ledger text-ink hover:bg-ledger/90 font-medium",
      secondary: "bg-panel border border-hairline hover:border-signal text-primary",
      outline: "border border-hairline hover:bg-hairline text-primary",
      ghost: "hover:bg-hairline text-primary"
    };
    
    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-8 text-base"
    };

    return (
      <button
        ref={ref}
        suppressHydrationWarning
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-200",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
