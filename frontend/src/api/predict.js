import axios from "axios";

const API_URL = "http://127.0.0.1:8000/predict";

export const predictRisk = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};
