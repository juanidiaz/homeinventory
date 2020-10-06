import { FormControlLabel, Checkbox } from "@material-ui/core";
import { useField } from "formik";

export default function FormikCheckbox(props) {
  const [field, meta] = useField({
    name: props.name,
    type: "checkbox",
    value: props.value
  });

  return (
    <FormControlLabel
      control={
        <Checkbox {...props} {...field} />
      }
      label={props.label}
    />)
}


