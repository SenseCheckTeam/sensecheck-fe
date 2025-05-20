export class HomePresenter {
  constructor(view, contentAPI) {
    this.view = view;
    this.contentAPI = contentAPI;
  }

  async loadHomeData() {
    this.view.setLoading(true);
    try {
      const [sliders,pancaIndraResponse] = await Promise.all([
        this.contentAPI.getSliders(),
        this.contentAPI.getPancaIndra(),
      ]);

      this.view.setHomeData({
        sliders: sliders.data,
        pancaIndra: pancaIndraResponse.data,
      });

    } catch (error) {
      this.view.setError(error.message);
    } finally {
      this.view.setLoading(false);
    }
  }
}
