import { ButtonProps } from "./Button.type";
import { clsx } from "clsx";

export const Button = ({
  children,
  onClick,
  variant = "primary",
  className,
  disabled = false,
  style,
  "data-testid": testId,
  "aria-label": ariaLabel,
}: ButtonProps) => {
  const baseClasses =
    variant === "icon"
      ? "border-none cursor-pointer transition-all duration-200 ease-in-out flex items-center justify-center p-2 rounded-full"
      : "px-4 py-3 border-none cursor-pointer transition-colors duration-200 ease-in-out flex items-center justify-center min-w-[100px] sm:min-w-[116px] h-11 flex-1 rounded-xl font-bold text-sm sm:text-base";

  const variantClasses = {
    primary:
      "bg-[#fe5858] text-white hover:bg-[#dc2626] disabled:opacity-60 disabled:cursor-not-allowed",
    secondary:
      "bg-[#ffd2d2] text-[#8a3a3a] hover:bg-[#ffc1c1] disabled:opacity-60 disabled:cursor-not-allowed",
    icon: "bg-transparent hover:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed group",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseClasses, variantClasses[variant], className)}
      disabled={disabled}
      style={style}
      data-testid={testId}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
