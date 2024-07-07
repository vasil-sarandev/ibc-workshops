import {
  Box,
  InputLabel,
  MenuItem,
  Select as MaterialSelect,
  SelectChangeEvent,
  FormControl,
  Chip
} from '@mui/material'
import { FC } from 'react'

interface Props {
  options: { label: string; value: string | number }[]
  label: string
  value: string | undefined | string[]
  onChange: (v: string | number) => void
  name: string
  required?: boolean
  multiple?: boolean
}

export const Select: FC<Props> = ({
  options,
  label,
  value,
  onChange,
  name,
  required = false,
  multiple = false
}) => {
  const handleChange = (e: SelectChangeEvent) => {
    onChange(e.target.value)
  }
  const selectOptions = options.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))

  const getValue = () => {
    if (value) return value
    else return ''
  }

  const renderValue = multiple
    ? (selected: string) => {
        //  T_T MUI doesn't provide correct typings for select with multiple value. the value is an array.
        const arr = selected as unknown as string[]
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {arr.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )
      }
    : undefined

  return (
    <Box mb={2}>
      <FormControl fullWidth>
        <InputLabel id={name}>{label}</InputLabel>
        <MaterialSelect
          value={getValue() as string}
          label={label}
          onChange={handleChange}
          labelId={name}
          required={required}
          multiple={multiple}
          renderValue={renderValue}
        >
          {selectOptions}
        </MaterialSelect>
      </FormControl>
    </Box>
  )
}
