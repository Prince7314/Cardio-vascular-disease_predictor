export default function RiskBar({ value }) {
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm mb-1">
        <span>Low Risk</span>
        <span>High Risk</span>
      </div>

      <div className="w-full bg-gray-700 rounded h-4">
        <div
          className={`h-4 rounded ${
            value < 50 ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ width: `${value}%` }}
        />
      </div>

      <p className="text-center mt-2 text-sm">
        Risk Probability: <b>{value}%</b>
      </p>
    </div>
  );
}
