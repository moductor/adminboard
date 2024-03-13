import FormLabelRow from "./FormLabelRow";
import FormTextField from "./FormTextField";

type Props = JSX.IntrinsicElements["input"] & { label?: string };

export default function FormTextFieldRow({ label, ...props }: Props) {
  return (
    <FormLabelRow label={label}>
      <FormTextField {...props} />
    </FormLabelRow>
  );
}
