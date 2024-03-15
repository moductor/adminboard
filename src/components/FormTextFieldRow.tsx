import { ReactNode } from "react";
import FormLabelRow from "./FormLabelRow";
import FormTextField from "./FormTextField";

type Props = JSX.IntrinsicElements["input"] & {
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export default function FormTextFieldRow({
  label,
  prefix,
  suffix,
  ...props
}: Props) {
  return (
    <FormLabelRow label={label} prefix={prefix} suffix={suffix}>
      <FormTextField {...props} />
    </FormLabelRow>
  );
}
