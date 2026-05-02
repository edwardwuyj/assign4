type DetailItemProps = {
  label: string;
  value: string | number;
};

export const DetailItem = ({ label, value }: DetailItemProps) => {
  return (
    <div className="rounded-lg bg-gray-800/60 p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
};
