type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div>
      <input
        type="search"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        placeholder="Search..."
        className="rounded-xl border border-gray-700 bg-gray-800 p-2 transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};
