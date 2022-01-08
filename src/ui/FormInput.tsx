import React from "react";

type FormInputProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (state: string) => any;
};

export const FormInput = ({
  label,
  name,
  type,
  value,
  onChange,
}: FormInputProps) => {
  return (
    <div>
      <label htmlFor={name} className="text-sm block w-full uppercase">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={(data) => onChange(data.target.value)}
        className="rounded border-black border-2 w-full block h-10"
      />
    </div>
  );
};
