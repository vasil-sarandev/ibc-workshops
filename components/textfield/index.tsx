import {
  Box,
  FormControl,
  TextField as MaterialTextField,
} from "@mui/material";
import { ChangeEvent, FC } from "react";

interface Props {
  label: string;
  value: string | number | undefined;
  onChange: (v: string | number) => void;
  placeholder?: string;
  type?: "text" | "number" | "tel";
  required?: boolean;
}

export const Textfield: FC<Props> = ({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onChange(e.target.value);
  };

  const getValue = () => {
    if (value) return value;
    else return "";
  };

  return (
    <Box mb={2}>
      <FormControl fullWidth>
        <MaterialTextField
          value={getValue()}
          onChange={handleChange}
          label={label}
          type={type}
          required={required}
          placeholder={placeholder}
        />
      </FormControl>
    </Box>
  );
};
