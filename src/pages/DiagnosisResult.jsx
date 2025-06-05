import React, { useEffect, useState } from "react";
import * as DiagnosisPresenter from "./DiagnosisPresenter";

const DiagnosisResult = () => {
  const [indras, setIndras] = useState([]);
  const [selectedIndras, setSelectedIndras] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    DiagnosisPresenter.loadIndras(setIndras);
  }, []);

  const handleSelect = (e) => {
    const value = e.target.value;
    setSelectedIndras((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await DiagnosisPresenter.getDiagnosisResult(
      selectedIndras,
      setLoading,
      setResult,
      setMessage
    );
  };

  return (
    <div>
      <h1>Diagnosis</h1>
      <form onSubmit={handleSubmit}>
        {indras.map((indra) => (
          <label key={indra.id}>
            <input
              type="checkbox"
              value={indra.id}
              checked={selectedIndras.includes(indra.id)}
              onChange={handleSelect}
            />
            {indra.nama}
          </label>
        ))}
        <button type="submit" disabled={loading}>
          {loading ? "Memproses..." : "Diagnosa"}
        </button>
      </form>
      {message && <p>{message}</p>}
      {result && (
        <div>
          <h2>Hasil Diagnosis:</h2>
          <p>Penyakit: {result.penyakit.nama}</p>
          <p>Deskripsi: {result.penyakit.deskripsi}</p>
        </div>
      )}
    </div>
  );
};

export default DiagnosisResult;
