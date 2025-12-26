export default function SliderField({
  label,
  name,
  value,
  min,
  max,
  step = 1,
  onChange,
}) {
  return (
    <div>
      <label className="block text-sm mb-1">
        {label}: <span className="font-semibold">{value}</span>
      </label>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full accent-blue-500"
      />
    </div>
  );
}
