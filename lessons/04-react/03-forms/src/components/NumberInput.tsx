type NumberInputProps = {
  label: string;
  value: number;
  setValue: (val: number) => void;
};

export const NumberInput = ({ label, value, setValue }: NumberInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="text-sm text-gray-300">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        required
        className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2"
      />
    </div>
  );
};
