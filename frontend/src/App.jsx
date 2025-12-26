import { useState } from "react";
import { predictRisk } from "./api/predict";

import SliderField from "./components/SliderField";
import SelectField from "./components/SelectField";
import RiskBar from "./components/RiskBar";

import { sliderFields } from "./data/formConfig";
import {
  genderOptions,
  levelOptions,
  yesNoOptions,
} from "./data/selectOptions";

function App() {
  const [form, setForm] = useState({
    age: 25,
    gender: 1,
    height: 170,
    weight: 65,
    systolic_bp: 120,
    diastolic_bp: 80,
    cholesterol: 1,
    glucose: 1,
    smoking: 0,
    alcohol: 0,
    active: 1,
  });

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await predictRisk(form);
      setResult(res);

      setHistory((prev) => [
        {
          time: new Date().toLocaleTimeString(),
          risk: res.risk_probability,
          status: res.prediction,
        },
        ...prev,
      ]);
    } catch {
      setError("Backend not reachable. Is FastAPI running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-4xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          ❤️ Cardio Risk Predictor
        </h1>

        {/* SLIDERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sliderFields.map((field) => (
            <SliderField
              key={field.name}
              {...field}
              value={form[field.name]}
              onChange={handleChange}
            />
          ))}
        </div>

        {/* SELECT FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <SelectField
            label="Gender"
            name="gender"
            value={form.gender}
            options={genderOptions}
            onChange={handleChange}
          />

          <SelectField
            label="Cholesterol Level"
            name="cholesterol"
            value={form.cholesterol}
            options={levelOptions}
            onChange={handleChange}
          />

          <SelectField
            label="Glucose Level"
            name="glucose"
            value={form.glucose}
            options={levelOptions}
            onChange={handleChange}
          />

          <SelectField
            label="Physically Active"
            name="active"
            value={form.active}
            options={yesNoOptions}
            onChange={handleChange}
          />

          <SelectField
            label="Smoking"
            name="smoking"
            value={form.smoking}
            options={yesNoOptions}
            onChange={handleChange}
          />

          <SelectField
            label="Alcohol Consumption"
            name="alcohol"
            value={form.alcohol}
            options={yesNoOptions}
            onChange={handleChange}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
        >
          {loading ? "Predicting..." : "Predict Risk"}
        </button>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 mt-3 text-center">{error}</p>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-6 p-4 bg-gray-900 rounded">
            <RiskBar value={result.risk_probability} />

            <p
              className={`text-center text-xl font-bold mt-3 ${
                result.prediction
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {result.prediction ? "HIGH RISK" : "LOW RISK"}
            </p>
          </div>
        )}

        {/* HISTORY */}
        {history.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              Prediction History
            </h3>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {history.map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-gray-700 px-3 py-2 rounded text-sm"
                >
                  <span>{h.time}</span>
                  <span>{h.risk}%</span>
                  <span
                    className={
                      h.status
                        ? "text-red-400"
                        : "text-green-400"
                    }
                  >
                    {h.status ? "High" : "Low"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
