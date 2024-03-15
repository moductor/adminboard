"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { ChangeEvent, useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import FormLabelRow from "./FormLabelRow";
import FormTextField from "./FormTextField";

const fieldClass = tv({
  base: "pr-8",
});

type Props = Omit<JSX.IntrinsicElements["input"], "type"> & {
  label?: string;
  checkStrength?: boolean;
  onStrengthChange?: (strength: StrengthState) => unknown;
};

export default function FormPasswordFieldRow({
  label,
  checkStrength = false,
  onStrengthChange,
  className,
  onChange,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const [isEdited, setIsEdited] = useState(false);
  const [strength, setStrength] = useState<StrengthState | undefined>();

  useEffect(() => {
    if (!checkStrength) return;
    if (!strength) return;
    if (!onStrengthChange) return;
    onStrengthChange(strength);
  }, [strength]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!isEdited) setIsEdited(true);
    if (checkStrength) setStrength(getStrength(e.target.value));
    if (onChange) return onChange(e);
  }

  function handleShow() {
    setShowPassword((prev) => !prev);
  }

  return (
    <FormLabelRow
      label={label}
      suffix={
        <button
          className="-m-2 block rounded-full p-2 opacity-65 transition-opacity hover:opacity-95"
          onClick={handleShow}
          type="button"
        >
          {!showPassword ? (
            <EyeIcon className="block h-4 w-4" />
          ) : (
            <EyeSlashIcon className="block h-4 w-4" />
          )}
        </button>
      }
    >
      <FormTextField
        type={!showPassword ? "password" : "text"}
        className={fieldClass({ className })}
        onChange={handleChange}
        {...props}
      />
      {checkStrength && (
        <PasswordStrengthIndicator strength={strength} show={isEdited} />
      )}
    </FormLabelRow>
  );
}

const strengthClass = tv({
  base: "absolute inset-x-0 bottom-0 h-[2px] origin-left opacity-70 transition-all",
  variants: {
    strength: {
      weak: "bg-red-500",
      middle: "bg-yellow-500",
      strong: "bg-green-500",
    },
    visibility: {
      visible: "",
      hidden: "opacity-0",
    },
  },
});

function PasswordStrengthIndicator({
  strength: strengthState,
  show = true,
}: {
  strength?: StrengthState;
  show?: boolean;
}) {
  const state = strengthState?.state || 0;

  type Visibility = typeof strengthClass.defaultVariants.visibility;
  const visibility: Visibility = show && state > 0 ? "visible" : "hidden";

  type Strenght = typeof strengthClass.defaultVariants.strength;
  const strength: Strenght =
    state < 35 ? "weak" : state < 70 ? "middle" : "strong";

  return (
    <span
      className={strengthClass({ strength, visibility })}
      style={{ transform: `scaleX(${state}%)` }}
    ></span>
  );
}

function getStrength(password: string) {
  if (!password) return { state: 0, strong: false };

  // ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$
  const containsNumbers = /^(?=.*\d).*$/.test(password);
  const containsLowerCase = /^(?=.*[a-z]).*$/.test(password);
  const containsUppperCase = /^(?=.*[A-Z]).*$/.test(password);
  const containsSpecial = /^(?=.*[^a-zA-Z0-9]).*$/.test(password);
  const noWhiteSpace = /^(?!.*\s).*$/.test(password);
  const longEnough = password.length >= 8;

  const results = [
    containsNumbers,
    containsLowerCase,
    containsUppperCase,
    containsSpecial,
    noWhiteSpace,
    longEnough,
  ];

  const state = results.filter((result) => result).length / results.length;

  return {
    containsNumbers,
    containsLowerCase,
    containsUppperCase,
    containsSpecial,
    noWhiteSpace,
    longEnough,
    state: state * 100,
    strong: state == 1,
  };
}

export type StrengthState = ReturnType<typeof getStrength>;
