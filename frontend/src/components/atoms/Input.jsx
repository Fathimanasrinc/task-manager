export function Input({ type, name, value, onChange, placeholder }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="w-full mt-1 p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#5c5470]"
    />
  );
}