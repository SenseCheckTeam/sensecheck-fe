import { contentAPI, diagnosisAPI } from "../../api/api";

export const loadIndras = async (setIndras) => {
  try {
    const response = await contentAPI.getIndras();
    setIndras(response.data.data);
  } catch (error) {
    console.error("Gagal memuat indra:", error);
  }
};

export const getDiagnosisResult = async (
  selectedIndras,
  setLoading,
  setResult,
  setMessage
) => {
  setLoading(true);
  setResult(null);
  setMessage("");

  try {
    const userId = localStorage.getItem("userId");
    const payload = {
      user_id: userId,
      indra_ids: selectedIndras,
    };

    const response = await diagnosisAPI.getResult(payload);
    const data = response.data.data;

    if (!data || !data.hasil) {
      setMessage("Hasil diagnosis tidak ditemukan.");
    } else {
      const penyakitId = data.hasil.penyakit_id;
      const penyakitResponse = await diagnosisAPI.getPenyakitDetail(penyakitId);

      setResult({ ...data.hasil, penyakit: penyakitResponse.data.data });
      await diagnosisAPI.saveDiagnosis({
        user_id: userId,
        penyakit_id: penyakitId,
      });
    }
  } catch (error) {
    console.error("Error saat diagnosis:", error);
    setMessage("Terjadi kesalahan saat proses diagnosis.");
  } finally {
    setLoading(false);
  }
};
