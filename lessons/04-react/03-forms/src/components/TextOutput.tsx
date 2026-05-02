type TextInputProps = {
  label: string;
  value: string;
  color: string;
};

export const TextInput = ({ label, value, color }: TextInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="text-sm text-gray-300">
        {label}
      </label>
      <output className={`w-full rounded-lg py-2 font-mono ${color}`}>{value}</output>
    </div>
  );
};
