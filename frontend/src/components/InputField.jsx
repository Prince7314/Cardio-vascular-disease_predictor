export default function InputField({ label, name, value, min, max, onChange }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type="number"
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
