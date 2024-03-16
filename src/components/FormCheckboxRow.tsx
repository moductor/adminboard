"use client";

import { usePropState } from "@/utils/usePropState";
import { ChangeEvent } from "react";

type Props = Omit<
  JSX.IntrinsicElements["input"],
  "type" | "className" | "value" | "defaultValue"
> & {
  label?: string;
};

export default function FormCheckboxRow({
  label,
  checked,
  defaultChecked,
  onChange,
  ...props
}: Props) {
  function getChecked() {
    if (checked != undefined) return checked;
    if (defaultChecked != undefined) return defaultChecked;
    return false;
  }

  const [isChecked, setIsChecked] = usePropState(getChecked());

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.checked);
    if (onChange) return onChange(e);
  }

  return (
    <label className="flex items-center gap-2">
      <span>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="sr-only"
          {...props}
        />
        <span className="grid h-4 w-4 place-content-center bg-gray-300 dark:bg-gray-600">
          <span
            className="block h-2 w-3 origin-center -translate-y-1/4 -rotate-45 border-b-2 border-l-2 border-gray-950 border-opacity-70 transition-opacity dark:border-gray-50 dark:border-opacity-90"
            style={{ opacity: isChecked ? 1 : 0 }}
          ></span>
        </span>
      </span>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}
