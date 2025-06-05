import { diagnosisAPI } from '../services/api/api';

export async function loadDiagnosisResult() {

    const diagnosisData = await diagnosisAPI.getDiagnosisHistory();
    if (!diagnosisData.data || diagnosisData.data.length === 0) {
      throw new Error('Data diagnosis tidak ditemukan');
    }
    const latestDiagnosis = diagnosisData.data[0];
  
    const penyakitList = await diagnosisAPI.getAllPenyakit();
  
    const matchedPenyakit = penyakitList.data.find(
      (p) => p.name.toLowerCase() === latestDiagnosis.diagnosis.toLowerCase()
    );
  
    if (!matchedPenyakit) {
      throw new Error(`Penyakit dengan nama "${latestDiagnosis.diagnosis}" tidak ditemukan`);
    }
  
    const penyakitDetail = await diagnosisAPI.getPenyakitDetail(matchedPenyakit.id);
  
    const result = {
      title: latestDiagnosis.diagnosis,
      probability: latestDiagnosis.confidence,
      image: penyakitDetail.data.imageUrl,
      description: penyakitDetail.data.description,
      recommendations: latestDiagnosis.saran,
    };
  
    return result;
  }
  