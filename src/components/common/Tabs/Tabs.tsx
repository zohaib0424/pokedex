import { useState } from "react";
import { TabsProps } from "./Tabs.type";
import { clsx } from "clsx";
import { Button } from "../Button";

export const Tabs = <T extends string = string>({
  tabs,
  activeTab: controlledActiveTab,
  defaultTab,
  onTabChange,
  backgroundColor = "#7AC74C",
  className,
  "data-testid": testId,
}: TabsProps<T>) => {
  const [internalActiveTab, setInternalActiveTab] = useState<T>(defaultTab ?? tabs[0]);

  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  const handleTabClick = (tab: T) => {
    if (!isControlled) setInternalActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div
      className={clsx("flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-16 mb-4 sm:mb-6 md:mb-8", className)}
      data-testid={testId}
    >
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant="icon"
          className={clsx(
            "w-[90px] sm:w-[120px] md:w-[160px] lg:w-[206px] text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-[400] px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 rounded-full cursor-pointer transition-all duration-200 ease-in-out hover:opacity-90",
            activeTab === tab ? "text-white shadow-md" : "bg-transparent"
          )}
          style={{
            backgroundColor:
              activeTab === tab ? backgroundColor : "transparent",
            color: activeTab === tab ? "white" : backgroundColor,
          }}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};
