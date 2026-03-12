import React from "react";
import { motion } from "framer-motion";

const springConfig = { type: "spring" as const, duration: 0.3, bounce: 0 };

interface CraftCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const CraftCard: React.FC<CraftCardProps> = ({ children, onClick, className = "" }) => (
  <motion.div
    whileHover={onClick ? { scale: 1.01, y: -2 } : {}}
    whileTap={onClick ? { scale: 0.99 } : {}}
    transition={springConfig}
    onClick={onClick}
    className={`bg-card shadow-craft rounded-2xl p-2 ${onClick ? "cursor-pointer hover:shadow-craft-hover transition-shadow" : ""} ${className}`}
  >
    <div className="bg-muted/30 rounded-lg p-4 h-full">{children}</div>
  </motion.div>
);

interface CraftButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

export const CraftButton: React.FC<CraftButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
}) => (
  <motion.button
    whileHover={disabled ? {} : { scale: 1.02 }}
    whileTap={disabled ? {} : { scale: 0.97 }}
    transition={springConfig}
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
      variant === "primary"
        ? "bg-primary text-primary-foreground hover:opacity-90"
        : variant === "ghost"
        ? "text-foreground hover:bg-muted"
        : "bg-card shadow-craft text-foreground hover:bg-muted"
    } ${className}`}
  >
    {children}
  </motion.button>
);

interface CraftInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const CraftInput = React.forwardRef<HTMLInputElement, CraftInputProps>(
  ({ label, className = "", ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <input
        ref={ref}
        className={`shadow-craft rounded-lg px-4 py-2.5 outline-none bg-card text-foreground placeholder:text-muted-foreground focus:shadow-craft-active transition-shadow text-sm ${className}`}
        {...props}
      />
    </div>
  )
);
CraftInput.displayName = "CraftInput";

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={springConfig}
  >
    {children}
  </motion.div>
);
