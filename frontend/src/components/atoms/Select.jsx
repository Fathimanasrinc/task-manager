export function Select({ name, value, onChange, options }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}