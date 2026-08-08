import * as React from "react"
import { cn } from "./Card"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: "bg-gradient-to-r from-signal to-ledger text-white hover:opacity-90 font-bold shadow-[0_0_15px_var(--shadow-glow)] hover:shadow-[0_0_25px_var(--shadow-glow)] border-none",
      secondary: "glass-panel hover:bg-white/10 hover:border-signal/50 text-primary font-medium hover:shadow-[0_0_15px_var(--shadow-glow)]",
      outline: "border border-hairline hover:border-signal text-primary hover:bg-signal/10 font-medium",
      ghost: "hover:bg-hairline hover:text-signal text-primary font-medium"
    };
    
    const sizes = {
      sm: "h-9 px-4 text-xs tracking-wide uppercase",
      md: "h-11 px-6 py-2 text-sm",
      lg: "h-14 px-10 text-base"
    };

    return (
      <button
        ref={ref}
        suppressHydrationWarning
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-300 ease-out hover:-translate-y-0.5",
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
