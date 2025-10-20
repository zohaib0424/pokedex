import React from "react";
import { HeaderProps } from "./Header.type";
import { BackIcon } from "@/assets/SvgComponents";
import { Button } from "@/components/common/Button";

export const Header: React.FC<HeaderProps> = ({
  backgroundColor = "#7AC74C",
  onBackClick,
  children,
  className = "",
}) => {
  return (
    <div
      className={`min-h-screen relative flex flex-col overflow-hidden ${className}`}
      style={{ background: backgroundColor }}
    >
      {onBackClick && (
        <Button
          variant="icon"
          onClick={onBackClick}
          aria-label="Go back"
          className="absolute top-4 left-4 sm:top-8 sm:left-8 md:top-12 md:left-16 lg:top-15 lg:left-30 z-10"
        >
          <BackIcon className="transition-opacity duration-200" />
        </Button>
      )}
      {children}
    </div>
  );
};

