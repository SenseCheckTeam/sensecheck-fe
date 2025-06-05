import api from '../services/api/api';

export default class DiagnosisPresenter {
  constructor(senseType, navigate) {
    this.senseType = senseType;
    this.navigate = navigate;
    this.view = null;

    this.state = {
      diagnosisText: '',
      severity: '',
      history: '',
      loading: false,
      error: null,
      senseData: null,
    };
  }

  get initialState() {
    return this.state;
  }

  setView(setStateFn) {
    this.setState = (newState) => {
      this.state = { ...this.state, ...newState };
      setStateFn(this.state);
    };
  }

  updateField(field, value) {
    this.setState({ [field]: value });
  }

  getPlaceholderText() {
    const map = {
      peraba: 'Jelaskan apa yang Anda rasakan...',
      penciuman: 'Jelaskan aroma atau bau...',
      pendengaran: 'Jelaskan suara yang Anda dengar...',
      penglihatan: 'Jelaskan apa yang Anda lihat...',
      pengecapan: 'Jelaskan rasa yang Anda alami...',
    };
    return map[this.senseType] || 'Jelaskan gejala Anda...';
  }

  async loadSenseData() {
    this.setState({ loading: true });
    try {
      const data = await api.diagnosis.getSenseData();

      const selectedSense = data.data;
  
      if (!selectedSense) {
        this.setState({ error: 'Indra tidak ditemukan', loading: false });
      } else {
        this.setState({ senseData: selectedSense, loading: false });
      }
      this.setState({ senseData: selectedSense });
      
    } catch (error) {
      console.error('loadSenseData error:', error);
      this.setState({ error: 'Gagal memuat data indra' });
    }
  }
  

  async handleSubmit(e) {
    e.preventDefault();
    const { diagnosisText, severity, history } = this.state;

    if (!diagnosisText.trim()) return this.setState({ error: 'Masukkan gejala' });
    if (!severity) return this.setState({ error: 'Pilih tingkat keparahan' });
    if (!history) return this.setState({ error: 'Pilih riwayat gejala' });

    try {
      this.setState({ loading: true, error: null });

      const kategori = this.getSenseCategory(this.senseType);
      const modelPayload = { kategori, gejala: diagnosisText, keparahan: severity, riwayat: history };

      const modelResult = await api.diagnosis.getDiagnosisResult(modelPayload);

      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('User ID tidak ditemukan');

      const backendPayload = {
        userId,
        diagnosis: modelResult.diagnosis,
        saran: modelResult.saran,
        confidence: modelResult.confidence,
      };

      const backendResult = await api.diagnosis.saveDiagnosisToBackend(backendPayload);

      this.navigate('/diagnosis-result', {
        state: {
          senseType: this.senseType,
          diagnosisText,
          severity,
          history,
          kategori,
          modelResult,
          backendResult,
        },
      });

    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  getSenseCategory(type) {
    const map = {
      peraba: 'kulit',
      penciuman: 'hidung',
      pengecapan: 'lidah',
      penglihatan: 'mata',
      pendengaran: 'telinga',
    };
    return map[type] || type;
  }
}
