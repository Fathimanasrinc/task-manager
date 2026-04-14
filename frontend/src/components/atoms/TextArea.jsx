export function TextArea({ name, value, onChange, placeholder }) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      rows={4}
      className="w-full mt-1 p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#5c5470]"
    />
  );
}