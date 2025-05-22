export class HomePresenter {
  constructor(view, contentAPI) {
    this.view = view;
    this.contentAPI = contentAPI;
  }

  async loadHomeData() {
    this.view.setLoading(true);
    try {
      const [sliders,pancaIndraResponse,partnerResponse, heroResponse] = await Promise.all([
        this.contentAPI.getSliders(),
        this.contentAPI.getPancaIndra(),
        this.contentAPI.getPartners(),
        this.contentAPI.getHero()
      ]);

      this.view.setHomeData({
        sliders: sliders.data,
        pancaIndra: pancaIndraResponse.data,
        partner: partnerResponse.data,
        hero: heroResponse.data
      });

    } catch (error) {
      this.view.setError(error.message);
    } finally {
      this.view.setLoading(false);
    }
  }
}
