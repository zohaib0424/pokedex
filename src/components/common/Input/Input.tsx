import { InputProps } from './Input.type';
import { clsx } from "clsx";

export const Input = ({ 
  value, 
  onChange, 
  placeholder, 
  onKeyDown, 
  className,
  'data-testid': testId,
  label,
  height
}: InputProps) => {
  return (
    <div className="flex flex-col relative w-full gap-2">
      {label && (
        <span className="text-[#767676] text-base font-bold pointer-events-none whitespace-nowrap">
          {label}
        </span>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        className={clsx(
          "w-full rounded-lg border border-gray-300 px-4 outline-none text-base transition-all duration-200 ease-in-out bg-white box-border text-black focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)] placeholder:text-gray-400",
          className
        )}
        style={{ height: height ? `${height}px` : "48px" }}
        data-testid={testId}
      />
    </div>
  );
};
